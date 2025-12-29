const ComfyUINode = ({ node, theme, updateNodeSettings, onUpdateNode }) => {
    // 状态管理
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [status, setStatus] = React.useState('idle'); 
    const [progress, setProgress] = React.useState(0);
    const [errorMsg, setErrorMsg] = React.useState(null);

    // 默认设置
    const serverUrl = node.settings.serverUrl || 'http://127.0.0.1:8188';
    const workflowJson = node.settings.workflowJson || '';

    // --- ComfyUI API 交互函数 ---

    // 1. 上传图片到 ComfyUI
    const uploadImage = async (blob, filename) => {
        const formData = new FormData();
        formData.append('image', blob, filename);
        formData.append('type', 'input');
        formData.append('overwrite', 'true');

        const res = await fetch(`${serverUrl}/upload/image`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) throw new Error('上传图片失败，请检查 ComfyUI 是否启动并开启 --enable-cors-header *');
        const data = await res.json();
        return data.name; 
    };

    // 2. 轮询历史记录获取结果
    const getHistory = async (promptId) => {
        let attempts = 0;
        while (attempts < 60) { 
            try {
                const res = await fetch(`${serverUrl}/history/${promptId}`);
                const data = await res.json();
                if (data[promptId]) return data[promptId];
            } catch (e) {
                console.warn('轮询出错', e);
            }
            await new Promise(r => setTimeout(r, 1000));
            attempts++;
            setProgress(Math.min(95, attempts * 2));
        }
        throw new Error('生成超时');
    };

    const handleRun = async () => {
        if (!workflowJson.trim()) {
            alert('请先粘贴 ComfyUI 的 API 格式 JSON');
            return;
        }

        setIsProcessing(true);
        setStatus('preparing');
        setErrorMsg(null);
        setProgress(0);

        try {
            // 1. 获取输入数据
            const inputs = node.inputs || { texts: [], images: [] };
            
            let processedJsonStr = workflowJson;

            // 2. 自动替换文本占位符
            if (inputs.texts && inputs.texts.length > 0) {
                const joinedText = inputs.texts.join(' '); 
                const safeText = joinedText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
                processedJsonStr = processedJsonStr.replace(/\{\{\s*(text|提示词)\s*\}\}/g, safeText);
            }

            // 3. 自动替换图片占位符
            if (inputs.images && inputs.images.length > 0) {
                setStatus('uploading');
                const imgUrl = inputs.images[0];
                let blob;
                
                if (imgUrl.startsWith('data:')) {
                    const res = await fetch(imgUrl);
                    blob = await res.blob();
                } else if (imgUrl.startsWith('http')) {
                    const res = await fetch(imgUrl);
                    blob = await res.blob();
                }

                if (blob) {
                    const filename = `tapnow_upload_${Date.now()}.png`;
                    const uploadedName = await uploadImage(blob, filename);
                    processedJsonStr = processedJsonStr.replace(/\{\{\s*(image|图像)\s*\}\}/g, uploadedName);
                }
            }

            // 4. 解析与发送
            let workflow;
            try {
                workflow = JSON.parse(processedJsonStr);
            } catch (e) {
                throw new Error('JSON 格式错误');
            }

            setStatus('queuing');
            const queueRes = await fetch(`${serverUrl}/prompt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: workflow })
            });

            if (!queueRes.ok) throw new Error(`连接失败 (${queueRes.status})`);
            const queueData = await queueRes.json();
            const promptId = queueData.prompt_id;

            setStatus('generating');
            
            // 5. 轮询结果
            const historyData = await getHistory(promptId);
            
            // 6. 提取输出图片 URL
            const outputs = historyData.outputs;
            let outputImageUrl = null;

            for (const nodeId in outputs) {
                if (outputs[nodeId].images && outputs[nodeId].images.length > 0) {
                    const imgData = outputs[nodeId].images[0];
                    outputImageUrl = `${serverUrl}/view?filename=${imgData.filename}&subfolder=${imgData.subfolder}&type=${imgData.type}`;
                    break;
                }
            }

            if (outputImageUrl) {
                // 关键修改：只更新数据，不更新本地 State 用于显示图片
                // 必须更新 node.content，这样连线的预览窗口才能读取到
                if (onUpdateNode) {
                    onUpdateNode(node.id, { content: outputImageUrl });
                } else {
                    updateNodeSettings(node.id, { lastResult: outputImageUrl });
                }
                setStatus('complete');
                setProgress(100);
            } else {
                throw new Error('未找到输出图片');
            }

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setStatus('error');
        } finally {
            setIsProcessing(false);
        }
    };

    const statusColors = {
        idle: 'text-zinc-500',
        uploading: 'text-blue-500',
        preparing: 'text-blue-500',
        queuing: 'text-purple-500',
        generating: 'text-green-500',
        complete: 'text-green-600',
        error: 'text-red-500'
    };

    const statusText = {
        idle: '就绪',
        preparing: '准备数据...',
        uploading: '上传素材...',
        queuing: '排队中...',
        generating: '生成中...',
        complete: '完成',
        error: '错误'
    };

    return (
        <div className="flex flex-col h-full text-xs">
            {/* 顶部标题 */}
            <div className={`p-2 border-b font-bold flex justify-between items-center ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-50'}`}>
                <span className="flex items-center gap-1">
                    🎨 本地 ComfyUI
                </span>
                <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`}></div>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                
                {/* 连线状态 */}
                <div className="flex gap-2">
                    <div className={`px-2 py-1 rounded border text-[10px] ${
                        (node.inputs?.texts?.length > 0) 
                        ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' 
                        : 'bg-zinc-800 text-zinc-600 border-zinc-700'
                    }`}>
                        文字: {(node.inputs?.texts?.length > 0) ? '已连接' : '未连接'}
                    </div>
                    <div className={`px-2 py-1 rounded border text-[10px] ${
                        (node.inputs?.images?.length > 0) 
                        ? 'bg-purple-500/20 text-purple-500 border-purple-500/30' 
                        : 'bg-zinc-800 text-zinc-600 border-zinc-700'
                    }`}>
                        图片: {(node.inputs?.images?.length > 0) ? '已连接' : '未连接'}
                    </div>
                </div>

                {/* 地址输入 */}
                <div>
                    <label className="block text-[10px] text-zinc-500 mb-1">ComfyUI 地址</label>
                    <input 
                        type="text" 
                        value={serverUrl}
                        onChange={(e) => updateNodeSettings(node.id, { serverUrl: e.target.value })}
                        className={`w-full px-2 py-1 rounded border outline-none ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-white border-zinc-300'
                        }`}
                        placeholder="http://127.0.0.1:8188"
                    />
                </div>

                {/* JSON 编辑 */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-zinc-500">Workflow JSON</label>
                        <span className="text-[9px] text-zinc-600">支持 {"{{提示词}}"} 和 {"{{图像}}"}</span>
                    </div>
                    <textarea 
                        value={workflowJson}
                        onChange={(e) => updateNodeSettings(node.id, { workflowJson: e.target.value })}
                        className={`w-full h-[120px] p-2 rounded border outline-none font-mono text-[10px] resize-y whitespace-pre ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-700 text-zinc-400' : 'bg-white border-zinc-300'
                        }`}
                        placeholder='粘贴 API 格式 JSON...'
                        onMouseDown={(e) => e.stopPropagation()} 
                    />
                </div>

                {/* --- 仅仅显示状态，绝对不显示图片 --- */}
                {status === 'complete' && (
                    <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-500 rounded text-[10px] text-center">
                        ✅ 已发送至预览窗口
                    </div>
                )}

                {/* 错误信息 */}
                {errorMsg && (
                    <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-[10px] break-words">
                        {errorMsg}
                    </div>
                )}
            </div>

            {/* 底部按钮 */}
            <div className={`p-3 border-t flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <span className={`text-[10px] ${statusColors[status]}`}>
                    {statusText[status]} {isProcessing && `(${progress}%)`}
                </span>
                <button
                    onClick={handleRun}
                    disabled={isProcessing}
                    className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${
                        isProcessing
                            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                >
                    {isProcessing ? '运行中...' : '运行工作流'}
                </button>
            </div>
        </div>
    );
};

window.registerCustomNode('comfyui-node', {
    label: '本地 ComfyUI',
    defaultWidth: 320,
    defaultHeight: 240,
    defaultSettings: {
        serverUrl: 'http://127.0.0.1:8188',
        workflowJson: ''
    },
    render: ComfyUINode
});
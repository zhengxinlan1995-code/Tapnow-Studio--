// 你可以在这里直接写 React 组件
const ClockComponent = ({ node, theme, updateNodeSettings }) => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className={`text-sm font-bold mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                自定义时钟
            </div>
            <div className={`text-2xl font-mono ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {time}
            </div>
            <input 
                type="text" 
                value={node.settings.myMemo || ''}
                onChange={(e) => updateNodeSettings(node.id, { myMemo: e.target.value })}
                className="mt-2 text-xs bg-transparent border-b border-zinc-500 w-full outline-none"
                placeholder="备注..."
            />
        </div>
    );
};

// 注册节点
window.registerCustomNode('custom-clock', {
    label: '动态时钟 (插件)',
    defaultWidth: 200,
    defaultHeight: 150,
    defaultSettings: { myMemo: '' },
    render: ClockComponent
});
# 🎨 Tapnow Studio

[![AI-Native](https://img.shields.io/badge/Code-AI_Generated-f9a8d4.svg)](https://deepmind.google/technologies/gemini/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Single File](https://img.shields.io/badge/Build-Single__HTML-orange.svg)]()

> 🤖 **AI-Native Project 声明**
>
> 本项目是一个**AI 原生 (AI-Native)** 的实验性开源作品。
>
> **绝大部分核心代码、架构设计、UI 布局以及逻辑实现均在 AI (Google Gemini) 的深度辅助下完成。** > 这是一个探索 **"AI 结对编程"** 极限的产物——展示了如何仅通过自然语言交互，在一个**单文件 (Single HTML)** 中构建出包含节点编辑器、多模态 API 调用、视频分析算法等复杂功能的现代化应用。
>

<br>

## 📖 简介 (Introduction)


**Tapnow Studio** 是一个运行在浏览器中的可视化 AI 工作流工具。它采用“节点编辑”的交互方式（类似 ComfyUI），将当前最强大的 AI 模型能力聚合在一个无限缩放的画布上。

它的核心理念是 **"轻量化"** 与 **"多模态协同"**。整个应用被打包在一个独立的 HTML 文件中，利用浏览器原生的能力和 CDN 资源，实现了复杂的 AI 交互逻辑。

<img width="1920" height="960" alt="2e8568e463c6473d89bc5be6ea5e57e8" src="https://github.com/user-attachments/assets/2020616f-204b-4aa7-854d-10e970cf5519" />

<br>
<br>

## ✨ 核心功能 (Key Features)

<br>

### 1. ♾️ 无限画布与节点系统
* **拖拽式连线**：直观地将输入（图片/视频）流转到处理节点。
* **无限缩放**：支持超大画布，利用鼠标滚轮自由缩放和平移。
* **多选与批量操作**：支持框选节点，批量移动或删除。
* **实时预览**：每个节点都具备独立的状态显示、进度条和结果预览。

<br>

### 2. 🎞️ 深度视频分析与反推 (Video Intelligence)
这是 Tapnow Studio 的杀手级功能，内置了复杂的视觉处理逻辑：
* **智能抽帧 (Smart Scene Detection)**：内置基于像素差值的场景检测算法 (`detectScenesAndCapture`)，自动识别视频镜头切换并提取关键帧。
* **导演级分镜拆解**：结合 Gemini 3 Pro 等多模态大模型，能够分析视频的**运镜手法**（推拉摇移）、**主体动态**、**光影氛围**。
* **提示词反推 (Reverse Prompting)**：自动将视频关键帧反推为 **Midjourney (英文)** 和 **即梦 (中文)** 的高精度提示词。
* **口播提取**：自动提取视频中的语音内容并生成时间轴脚本。

<br>

### 3. 🎨 全面的 AI 绘图支持
* **Midjourney 深度集成**：
    * 支持 Text-to-Image (文生图)。
    * 支持  **Image Prompting** (垫图)。
    * 支持 `--oref` (角色一致性) 和 `--sref` (风格一致性) 的可视化连线配置。
* **即梦 (Jimeng) AI**：
    * 支持即梦 4.5 / 4.1 / 3.1 模型。
    * 支持 **图生图**（自动处理 Base64/JSON 转换）。
    * 智能分辨率适配（Auto/1K/2K/4K）。
* **其他模型**：Flux, DALL-E 3 (GPT-4o Image), Nano Banana，（部分模型还没接-因为价格感觉不是很划算） 等。

<br>

### 4. 🎥 AI 视频生成
支持主流视频生成模型的参数配置与任务轮询：
* **Sora**
* **Grok-3 Video**
* **Google Veo**
* **内置其他模型可供自行对接**

<br>

### 5. 🛠️ 实用辅助工具
* **图像对比 (Image Compare)**：带有滑动条的 AB 对比节点，方便查看原图与重绘图的差异。
* **批量素材管理**：内置历史记录管理器，支持批量删除、批量重新发送到画布。
* **暗黑/明亮模式**：自适应 UI 主题切换。

<br>

---


## 🚀 Tapnow Studio V2.5-2 更新日志-（2025-12-11）

> **❤️ 特别致谢 / Special Thanks**
> 感谢社区成员 **[@MrWhte-s](https://github.com/MrWhte-s)** 提供的深度优化方案。我们基于此重构了代码，去除了冗余 UI，带来了更纯粹的创作体验。

<br>

## ✨ 核心更新 (Core Updates)

<br>

### 1. 🍌 Banana 2 专属：九宫格分镜工作流 (Grid Storyboard)
我们针对 **Nano Banana 2 (及同类绘图模型)** 设置了一套完整的“分镜-拆解”闭环工作流：

* **Step 1: 智能分镜生成**
    * 选中 **AI 绘图 (Banana 2)** 节点，点击侧边栏 **LayoutGrid 图标**。
    * 系统会自动注入“九宫格分镜脚本”、“高清放大提示词”专属提示词。算法会自动判断：
        * *无参考图时*：生成通用的角色动态表 (Character Sheet)。
        * *有参考图时*：基于垫图生成保持角色一致性的 3x3 分镜。
* **Step 2: 一键智能拆解**
    * 当 Banana 2 生成九宫格图片后，点击侧边栏 **Scissors (剪刀) 图标**。
    * **自动切片**：代码内置了针对 3x3 网格的像素级切割算法 (`splitGridImage`)，能自动将单张大图精准拆解为 9 张独立素材。
    * **自动排列**：拆解后的 9 个节点会自动生成并整齐排列在原图右侧，无需人工干预。

<br>

### 2. 🎞️ 视频生成内核升级 (VEO3 Native Support)
代码底层全面重构了视频生成模块，以适配 Google 最新模型：
* **模型升级**：全面接入 `veo3.1-fast` 模型，弃用旧版接口。
* **协议标准化**：迁移至 `/v1/videos/generations` 标准路径。
* **参数自适应**：
    * 内置分辨率智能适配逻辑：针对 VEO 模型自动调整输入图片尺寸（如自动缩放至 1920x1080 范围内），彻底解决因图片过大导致的生成失败问题。
    * 自动处理 `image_urls` 数组格式，完美支持图生视频功能。

<br>

### 3. 🧹 视觉降噪与“聚焦模式” (Focus Mode)
为了让您专注于当前的节点逻辑，我们大幅净化了画布的视觉元素：
* **智能透明度 (Smart Transparency)**：当您选中某个节点时，系统中所有**与该节点无关的连接线**透明度会自动降至 35%。
* **链路高亮**：相关联的输入/输出链路保持 100% 高亮，逻辑流向一目了然，不再被复杂的“面条线”干扰。
* **相邻节点光晕**：选中节点时，其直接上游（输入源）和下游（输出目标）节点会显示**浅蓝色晕光**，帮助快速定位逻辑关系。

<br>

### 4. 🧩 智能节点编排 (Auto Layout)
引入了基于 DAG（有向无环图）的自动整理算法：
* **功能入口**：左侧边栏顶部 `Layout` 图标。
* **智能分组**：算法会自动识别节点类型，将“输入类节点”置左，“生成类节点”置右。
* **层级排列**：根据连接关系计算拓扑层级，自动计算 (200px / 80px) 的舒适间距，一键拯救杂乱的画布。

<br>

### 5. ⚡️ 交互体验微调 (UX Polish)
* **📋 智能粘贴 (Smart Paste)**：重写了全局粘贴逻辑。只有在**选中图片节点**且**剪贴板包含图片**时，才会触发图片替换。彻底解决了在输入 Prompt 时误触 Ctrl+V 导致节点被覆盖的烦恼。

<br>

## 🚀 Tapnow Studio V2.5-3 更新日志-（2025-12-12）

> **❤️ 特别致谢 / Special Thanks**
> 感谢社区成员 **[@MrWhte-s](https://github.com/MrWhte-s)** 提供的方案。我们在此基础上优化了智能节点的链接问题

<br>

### ✨ New Features (新增功能)

<br>

- **📝 文字节点系统 (Text Node Integration)**
  - 新增“文字节点”类型，支持与其他节点进行逻辑连线。
  - **功能联动**：图片及视频生成节点现可读取上游文字节点的信息作为输入。

<br>

- **💾 本地化存档系统 (Local State Management)**
  - **全量保存**：支持将画布内容、节点连线、生成历史界面及 AI 对话记录打包保存为本地 JSON 文件。
  - **UI 更新**：在侧边栏底部新增“保存”与“读取”图标按钮，保持界面极简设计。

<br>

- **📥 批量下载 (Batch Download)**
  - UI 右上角新增统一风格的“下载”按钮。
  - 支持一键批量下载当前选定的所有图片及视频资源。

<br>

- **🏷️ 项目重命名 (Project Renaming)**
  - 顶部栏新增“未命名项目”可编辑标题。
  - **自动命名**：文件保存时，系统将自动以“当前标题 + 时间戳”作为文件名，便于版本管理。

<br>

### 🎨 UI/UX Improvements (界面与交互)

<br>

- **💡 邻近节点智能高亮 (Neighbor Highlighting)**
  - 选中节点时，其上游和下游相邻节点将显示浅蓝色晕光。
  - **样式细节**：使用 `ring-2 ring-blue-300/60 shadow-blue-300/30` 样式，与选中节点的深蓝边框形成清晰的视觉层级。

<br>

- **👁️ 媒体预览 (Media Preview)**
  - 优化交互体验，支持双击图片或视频节点时弹出预览窗口。

<br>

### ⚡ Core Logic & Optimization (核心优化)

<br>

- **🧩 智能自动整理 (Smart Auto-Layout)**
  - **双向对齐算法**：
    - **从左往右**：根据父节点位置，自动调整子节点顺序（子向父中心靠拢）。
    - **从右往左**：根据子节点位置，反向调整父节点顺序（父向子中心靠拢）。

<br>

- **✂️ 剪贴板逻辑重构 (Clipboard Optimization)**
  - 统一了节点、文本、截图的复制/粘贴底层逻辑。
  - **冲突修复**：彻底修复了选中图片节点时进行复制操作，导致误触截图复制的冲突问题。

<br>


## 🚀 Tapnow Studio V2.5-4 更新日志-（2025-12-14）

> **❤️ 特别致谢 / Special Thanks**
> 感谢社区成员 **[@MrWhte-s](https://github.com/MrWhte-s)** 提供的方案。本次重点增加了蒙版重绘以及Sora2角色客串以及智能分镜表

<br>

本次更新主要集中在功能增强、性能优化及用户体验提升。核心亮点包括：新增图片局部重绘（Inpainting）功能、智能分镜表深度优化、整体性能大幅提升（O(1) 查找）、以及项目保存/加载机制的完善。

<br>

## ✨ 新增功能

<br>

### 1. 图片标注/局部重绘 (Inpainting)
**功能描述**：
新增图片局部重绘功能，支持在 `input-image` 和 `gen-image` 节点上使用画笔工具标注区域。支持 `nano-banana`、`nano-banana-2` 和 `flux-kontext` 等模型的 Inpainting 模式。

* **画笔工具**：支持调节笔刷粗细、撤销（Ctrl+Z）、清空操作。
* **智能数据流**：自动检测上游节点的蒙版数据。如果当前节点未绘制蒙版，会自动使用连接线输入的源节点蒙版。
* **视觉反馈**：
    * 编辑时隐藏遮挡UI。
    * 非编辑状态下，使用 `mix-blend-mode: multiply` 显示半透明红色蒙版预览。
    * 生成节点检测到蒙版连接时，显示“已链接蒙版区域”紫色标签。

<br>

### 2. HD 功能迁移与调整
**功能描述**：
调整了高清（HD）功能的模型支持策略。
* **Sora 2**：新增 HD 模式支持，勾选后生成请求将包含 `quality: 'hd'` 参数。
* **Sora 2 Pro**：移除了 HD 选项（UI 不再显示）。

<br>

### 3. 核心查找性能提升 (O(n) → O(1))
**功能描述**：
对应用全域数据结构进行了重构，显著提升了节点多、历史记录多时的响应速度。

* **Map 缓存机制**：使用 `useMemo` 为 `apiConfigs`、`history` 和 `nodes` 创建 Map 索引。
* **查找优化**：将代码中所有的 `.find()` 线性查找替换为 `.get()` 哈希查找。
* **防抖处理**：对 `localStorage` 的写入操作（如角色库保存）增加了 500ms 防抖，减少 I/O 压力。

<br>

### 4. 智能分镜表 (Storyboard) 深度优化
**功能描述**：
重构了 `storyboard-node` 的交互体验，使其更像一个专业的导演工具。

* **悬停展开编辑**：鼠标悬停在镜头卡片时，底部自动展开详细参数面板（长条卡片）。
* **独立镜头参数**：每个镜头（Shot）现在拥有独立的 `settings` 对象，可单独设置 **模型**、**比例** 和 **时长**，不再强制跟随节点默认值。
* **滚轮锁定**：在分镜表区域滚动时，自动阻止事件冒泡，防止意外触发画布缩放。
* **生成逻辑更新**：生成单镜时优先读取镜头级参数，而非节点级参数。

<br>

### 5. 启动画面重设计 (Artistic Minimalist)
**功能描述**：
将 Loading 画面替换为“艺术极简”风格，提升应用质感。
* **视觉设计**：极细呼吸圆环 + 超大字间距排版。
* **致谢区域**：底部新增作者（Credits）与特别致谢（Special Thanks）展示区。

<br>

### 6. 历史视频自动获取 URL
**功能描述**：
优化“新建角色”弹窗体验。
* **自动填充**：在下拉菜单选择历史视频任务时，系统自动提取该任务的 URL 并切换至 URL 输入模式。
* **逻辑优化**：无需用户手动复制视频链接，选择即用。

<br>

### 7. 角色引用栏展开/收起
**功能描述**：
优化了 `gen-video` 和 `storyboard-node` 的界面空间利用。
* **折叠逻辑**：当引用角色超过 5 个时，自动折叠并显示 `+N` 按钮。
* **交互**：点击展开可查看完整列表或打开侧边栏，保持界面整洁。

<br>

### 8. 项目保存与加载机制修复
**功能描述**：
全面修复了数据持久化过程中的丢失问题。
* **数据完整性**：
    * 修复了 **Sora 2 角色信息** (`characterLibrary`) 无法保存的问题。
    * 修复了 **Nano Banana 2** 等模型的提示词设置丢失问题。
    * 确保所有节点的 `settings` 对象被深度完整复制。
* **时间戳修正**：文件名和内部数据的时间戳现在正确使用 **东八区 (UTC+8)** 时间，与本地时间一致。
* **兼容性**：加载旧版本项目文件时自动补全缺失字段，防止报错。
  
<br>

### 9. 文本框高度自适应修复
**功能描述**：
修复了 `gen-image` 和 `gen-video` 节点中 Prompt 输入框高度塌陷的问题。
* **CSS 修复**：为 Textarea 父容器添加 `flex-1 h-full min-h-0` 类，确保输入框能填满节点剩余空间，彻底解决底部留白无法输入的问题。

<br>

## 🚀 Tapnow Studio V2.5-4 更新日志-（2025-12-15）

<br>

### 1. 内存优化：Base64 转 Blob URL
**功能描述**：
将应用内所有图片/视频的存储方式从 Base64 字符串切换为 Blob URL。
* **优化效果**：解决了处理 4K 高清图片时的严重卡顿和掉帧问题。
* **技术细节**：DOM 节点上的数据量从 10MB 级降低到 50 字节级（URL字符串）。
* **兼容性**：在项目保存/上传 API 时自动转换回标准格式，确保数据兼容。

<br>

### 2. 连接线虚拟化 (Connection Culling)
**功能描述**：
实施连接线虚拟化渲染技术，大幅降低 SVG 渲染压力。
* **实现逻辑**：系统实时计算当前视口可见的节点，仅渲染这些节点相关的连接线。
* **效果**：在拥有数百个节点的复杂项目中，主线程阻塞显著减少，画布操作更跟手。

<br>

### 3. LOD (Level of Detail) 细节等级渲染
**功能描述**：
引入 LOD 渲染策略，根据画布缩放比例动态调整渲染复杂度。
* **阈值**：当缩放比例 `< 0.4` 时自动切换至低细节模式。
* **表现**：缩小视图时，隐藏按钮、输入框、阴影等昂贵的 CSS 渲染属性，仅保留核心内容轮廓，极大提升缩放平滑度。

<br>

### 4. 高性能模式与交互降级
**功能描述**：
智能监测系统负载与用户行为，动态调整渲染质量。
* **高性能模式**：节点数量 > 50 时自动开启，移除全局毛玻璃、圆角和复杂阴影。
* **交互降级**：用户拖拽或平移画布时，强制图片使用 `pixelated` 渲染并隐藏连接线，操作结束后立即恢复，确保交互 60fps。

<br>

### 5. 流式项目保存 (Stream Saving)
**功能描述**：
重构保存机制，利用 **File System Access API** 配合 **WritableStream**。
* **解决痛点**：解决了因项目包含过多视频/图片（>1GB）导致的浏览器内存溢出（OOM）和导出失败。
* **机制**：手动分块构建 JSON 字符串并直接写入硬盘，无需一次性将整个项目加载到内存中。

<br>

### 6. 流式项目加载 (Stream Loading)
**功能描述**：
基于 **Web Streams API** 重构导入逻辑。
* **大文件支持**：支持读取 1GB+ 的超大项目文件，彻底解决 `JSON.parse` 崩溃问题。
* **流式解析**：自定义流式 JSON 解析器，配合括号计数算法，边读取边转换数据（Base64 -> Blob），大幅降低峰值内存占用。

<br>

### 7. 历史记录列表性能优化
**功能描述**：
针对右侧"生成历史"长列表进行深度优化。
* **组件重构**：提取 `HistoryItem` 并通过 `React.memo` 减少不必要的重渲染。
* **CSS 优化**：应用 `content-visibility: auto` 和 `contain-intrinsic-size`，让浏览器跳过视口外元素的渲染计算。
* **懒加载**：实现 `LazyBase64Image`，仅在图片进入视口时进行解码和渲染。

<br>

## 🚀 如何运行 (How to Run)

<br>

本项目保持了标志性的 **Single-file（单文件）** 架构，无需安装 Node.js 或 Python 环境。

<br>

1.  下载本仓库中的 `Tapnow Studio-V2.5-1.html` 文件。
2.  **双击**直接使用 Chrome / Edge 浏览器打开。
3.  点击右上角 **API 设置** 配置您的模型 Key 即可开始创作。

<br>

## 🚀 快速开始 (Quick Start)

<br>

### 方式 1：直接运行
1.  下载本仓库中的 `Tapnow Studio-V2.5.html` 文件。
2.  双击使用 Chrome, Edge 或 Safari 浏览器打开。
3.  点击右上角 **API 设置**，配置你的模型 Key 即可开始使用。

<br>

### 方式 2：本地开发
如果你想修改代码：
1.  该项目是一个单文件 React 应用，源码直接嵌入在 HTML 的 `<script type="text/babel">` 标签中。
2.  你可以直接使用 VS Code 编辑该 HTML 文件。
3.  依赖库（React, Tailwind, Lucide, Babel）均通过 CDN 加载，无需 `npm install`。

<br>

## 🔌 即梦 (Jimeng) API 配置指南

<br>

由于浏览器安全策略（CORS）及即梦 API 的特殊签名验证，**Tapnow Studio 需要配合后端代理服务使用即梦功能**。

本项目完美适配开源项目 **[jimeng-api](https://github.com/iptag/jimeng-api)**。

<br>

### 1. 部署后端服务
你可以选择以下任意一种方式在本地运行服务：

**选项 A：下载可执行文件 (.exe)** 前往 [jimeng-api Releases](https://github.com/iptag/jimeng-api/releases) 下载 Windows/Mac/Linux 版本并运行。

**选项 B：下载已配置好的.压缩包 (.7z)** JimengAPI_Release_V9_Green.7z（win版） JimengAPI_For_Mac_Users（mac版）

服务启动后，默认地址为 `http://localhost:5100`

<br>

### 2. 获取 Session ID

1.  在浏览器访问 [即梦官网 (jimeng.jianying.com)](https://jimeng.jianying.com/) 并登录。
2.  按 `F12` 打开开发者工具，点击 `Application` (应用) 标签页。
3.  在左侧栏找到 `Cookies` ，点击即梦的域名。
4.  复制 `sessionid` 的值。

<br>

### 3. 在 Tapnow Studio 中连接

1.  打开 Tapnow Studio 右上角的 **API 设置**。
2.  找到 **Jimeng** 相关的模型配置（或添加新模型）。
3.  **Base URL** 填入： `http://localhost:5100` 。
4.  **API Key** 填入：刚才复制的 `sessionid` 。
5.  *(可选)* 勾选设置底部的“即梦图生图使用本地文件”以获得更好的上传稳定性。

<br>

## ⚙️ 技术架构 (Technical Details)

<br>

Tapnow Studio 展示了现代前端技术在无构建工具（No-Build）环境下的极限能力：

* **Runtime**: 浏览器原生 ES Modules + Babel Standalone 实时编译 JSX。
* **UI Framework**: React 18 (UMD)。
* **Styling**: Tailwind CSS (Script Tag 注入)。
* **State Management**: React Hooks ( `useMemo` , `useCallback` , `useRef` ) 实现高性能画布渲染。
* **Storage**: `localStorage` 实现数据持久化（API Key、历史记录、画布状态）。
* **Network**: 原生 `fetch` API 处理 Server-Sent Events (SSE) 和长轮询。

<br>

## 🤝 致谢与声明 (Credits)

* **AI Architecture**: 本项目的核心逻辑、UI 组件及架构设计由 **Gemini** 辅助完成。
* **Jimeng Support**: 即梦接口支持由 **[iptag/jimeng-api](https://github.com/iptag/jimeng-api)** 提供，这是一个非常棒的逆向工程项目。
* **Icons**: 使用 [Lucide](https://lucide.dev/) 图标库。

<br>

## ⚠️ 免责声明 (Disclaimer)

<br>

本项目仅供学习与技术研究使用。

* 请勿将本项目用于任何非法用途。
* 使用即梦、Midjourney 等服务时，请遵守相应服务商的使用条款。
* 用户需自行管理 API Key，本项目不会上传任何 Key 到云端。

## 📄 许可证 (License)

<br>

本项目采用 **GNU General Public License v3.0 (GPLv3)** 开源协议。

这意味着：
* ✅ 你可以免费使用、复制、修改和分发本项目。
* ✅ 你可以将本项目用于商业用途。
* ⚠️ **但是**，如果你修改了本项目并发布（分发），你**必须**开源你的修改代码，并同样使用 GPLv3 协议。
* 🚫 你**不能**将本项目闭源后作为商业软件出售。




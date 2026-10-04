# 招聘工作台 · 从简历到入职

用Remotion制作的30秒手绘招聘宣传片。保留参考片的机器人、纸张质感、手写字体和镜头节奏，把内容改成**AI简历解析 → 面试评价 → Offer → 入职**。

![成片封面](showcase/cover.png)

[观看或下载完整30秒成片](showcase/preview.mp4)

## 安装、运行、渲染

需要Node.js 22.18或以上和npm。首次渲染时Remotion会下载Chrome Headless Shell。

```sh
git clone https://github.com/ColdDistill/recruitment-handdrawn-remotion.git
cd recruitment-handdrawn-remotion
npm ci
npm run start
```

导出1080p成片与封面：

```sh
npm run check
npm run render
npm run still
npm run verify
```

输出为`delivery/招聘工作台-手绘宣传片.mp4`与`delivery/封面.png`。1920×1080、30fps、900帧、视频30秒；AAC立体声配乐，编码尾部有约59毫秒填充。

离线预览：`npm run build`，双击`dist/index.html`，点击“声音关”打开配乐。也可运行`npm run preview`后打开 http://127.0.0.1:3029/dist/ 。预览服务仅绑定本机，支持音视频拖动所需的Range请求。

仓库已包含原创音轨，可用`npm run music`确定性重新生成。无需API密钥、业务账号或招聘数据库。

## 改哪里

| 文件 | 内容 |
| --- | --- |
| src/Film.tsx | 场景组合、手机画面与结尾文案 |
| src/components/Artwork.tsx | 简历、面试、Offer、员工档案的手绘画面 |
| src/components/Editor.tsx | 招聘流程推进、机器人动作与面板 |
| src/timeline.ts | 分镜时间与镜头运动 |
| scripts/music.mjs | 原创120 BPM配乐与音效生成 |

全部候选人资料均为虚构演示。本仓库是独立视频工程，没有招聘业务系统代码或生产数据。

## 来源与许可

这是招聘主题改编版，不是参考视频的逐像素或原文案复刻。

- Motionface参考片段：[claude_剪视频过程motion](https://motionface.cc/?recording=e3ee409a-50f7-4b4a-af27-288226e47a57)，ID：`e3ee409a-50f7-4b4a-af27-288226e47a57`。
- 手绘基础代码：[wisewong6/claude-video-editing-remotion](https://github.com/wisewong6/claude-video-editing-remotion)，上游版本`d5c6dcbb99ab665eac22838daf29020656c18d83`。保留原MIT许可；本仓库新增改编代码同样采用MIT。
- 中文字体为Google Fonts提供的霞鹜文楷TC子集，保留OFL许可。子集已覆盖本版中文，新增文案需确认字形覆盖。
- 配乐为程序合成原创作品，没有使用参考片音轨或商业歌曲。

详细素材信息见[public/ASSETS.md](public/ASSETS.md)、[LICENSE](LICENSE)与[public/OFL.txt](public/OFL.txt)。仓库不包含签名视频地址、Motionface绑定凭证或任何登录令牌。

原片关键帧与改编对应关系见[参考片核对记录](docs/reference-analysis.md)。

## 验证

类型检查与三项时间轴测试、离线构建、1080p完整渲染通过。已检查900帧完整解码、逐秒画面、中文排版、音轨及实际完整播放；没有黑帧或音频削波。

公开仓库与Motionface绑定均已完成，实际读回证据见[发布与绑定记录](docs/publication.md)。

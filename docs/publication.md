# 公开仓库与Motionface绑定

用户授权将现有手绘招聘宣传片单独公开并绑定参考片段。

- 目标仓库：ColdDistill/recruitment-handdrawn-remotion，public，main。
- 片段ID：e3ee409a-50f7-4b4a-af27-288226e47a57。
- 只上传完整独立视频工程；原业务项目、数据库及生产版本不变。
- 许可：保留上游MIT及字体OFL，配乐为原创程序合成。
- 绑定必须验证API返回的recording_id与github_url，遇到409保留已有绑定，遇到401重新获取本片段凭证。
- 不把凭证、签名参考地址、登录令牌提交或记录到公开日志。
- 当前状态：完整工程已经推送到公开仓库，并完成Motionface绑定；更新后的参考视频已下载并核对，详见reference-analysis.md。
- 恢复点：首次提交之前没有远程状态；不会删除原项目或对方仓库。后续代码修改用普通新增提交回退，不重写共享历史。

## 实际发布与读回证据

- 日期：2026-10-04（Asia/Shanghai）。
- 可共享仓库：[ColdDistill/recruitment-handdrawn-remotion](https://github.com/ColdDistill/recruitment-handdrawn-remotion)。
- 首次成功推送版本：`417bd634fd7a707861cd62e84aaa42a09b74cbe7`，分支`main`；远端引用与本地一致。
- 匿名GitHub API读回`private=false`，无需登录匿名克隆成功；32个已跟踪文件逐字节与本地一致，源码、锁文件、字体、原创配乐及成片齐全。
- 成片SHA-256：`932dbbe03a7324f5ead4ab2d3f500f50a2ea69b63d6ecce1e335581868bffd55`；14,088,652字节。
- Motionface接口返回HTTP 200，`recording_id=e3ee409a-50f7-4b4a-af27-288226e47a57`，`github_url=https://github.com/colddistill/recruitment-handdrawn-remotion`，核对通过。接口把GitHub用户名转为小写，仍对应同一仓库。
- 绑定创建时间：2026-10-04 08:27:16（Asia/Shanghai）；幂等读回时间：2026-10-04 08:27:51。重复提交相同仓库返回既有绑定，不删除或替换其他用户的绑定。
- 本记录属于实际接口响应与匿名远端读回证据；没有发布招聘业务应用、修改生产数据或权限。
- 传输处理：设备授权仅`public_repo`。网络代理的大文件分块上传曾返回HTTP 400，在此独立工程使用HTTP/1.1及50MB发送缓冲后成功；没有修改全局Git配置。
- 当前记录通过新增文档提交保存，最终远端版本可在仓库`main`提交历史查看。

#jchat

## 开发
* `npm install`
* `npm run dll` 或者 `npm run dll:prod`
* `npm run dev`（默认读取`task/config.json`中dev的api配置）
* 修改`package.json`中的env为 `env:A` （读取`task/config.json`中A的api配置）
* `http://localhost:3000`

## 发布
* 在`task/config.json`中配置环境A
* `gulp A`
* 如果没有配置环境A，默认使用dev环境
* CDN资源地址为: `config.A.url+config.v`
* CDN暂时只支持七牛云
* 将打包好的index.html上传到发布仓库和对应分支，触发部署脚本自动部署发布

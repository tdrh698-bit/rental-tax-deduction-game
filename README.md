# 🏠 住房租金扣除通关游戏

一个教育性的HTML游戏，帮助用户学习住房租金扣除政策，掌握申报技巧。

## 🎮 游戏特点

### 四个学习任务
1. **城市等级认知** - 8个城市拖拽分类
2. **合同审查实践** - 5个问题点找茬游戏
3. **扣除计算实战** - 4个场景交互式计算
4. **申报材料准备** - 8种材料时间挑战

### 技术特性
- 纯前端实现，无需后端
- 响应式设计，支持移动端
- 自动跳转优化体验
- 进度跟踪和得分系统

## 🌐 在线访问

### Cloudflare Pages 部署
- **主域名**: https://rental-tax-deduction-game.pages.dev
- **自定义域名**: (配置中)

### 本地服务器
- **IP访问**: http://43.153.117.19:3000
- **一键启动**: http://43.153.117.19:3000/start-game.html

## 📁 文件结构

```
├── auto-advance-game.html    # 自动跳转优化版（推荐）
├── start-game.html           # 一键启动页面
├── game-homepage.html        # 游戏首页导航
├── working-game.html         # 稳定可操作版
├── test-game.html            # 功能测试页面
├── _config.yml              # Cloudflare Pages 配置
├── package.json             # 项目配置
├── fix-game.js              # 自动修复脚本
├── check-report.md          # 检查报告
└── 其他30+个版本文件...
```

## 🚀 快速开始

### 本地运行
```bash
# 使用Python HTTP服务器
python3 -m http.server 3000

# 访问游戏
open http://localhost:3000/start-game.html
```

### Cloudflare Pages 部署
项目已配置 Cloudflare Pages 自动部署：
1. 推送到 `main` 分支
2. 自动构建和部署
3. 全球CDN分发

## 🔧 开发

### 环境要求
- 现代浏览器（Chrome 90+, Firefox 88+, Edge 90+）
- 本地开发：Python 3.x 或 Node.js

### 文件说明
- **auto-advance-game.html**: 主游戏文件，包含所有优化功能
- **start-game.html**: 入口页面，提供版本选择和服务器状态
- **fix-game.js**: 自动修复脚本，检查常见问题

## 📊 项目统计
- **HTML文件**: 34个
- **总大小**: 约1.9MB
- **代码行数**: 约25,000行
- **最后更新**: 2026-03-30

## 📄 许可证
MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献
欢迎提交 Issue 和 Pull Request！

## 📞 联系
- **项目负责人**: 李玉辉
- **GitHub**: [tdrh698-bit](https://github.com/tdrh698-bit)
- **仓库**: https://github.com/tdrh698-bit/rental-tax-deduction-game
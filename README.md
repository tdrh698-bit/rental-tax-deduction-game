# 住房租金扣除通关游戏 🏠💰

[![GitHub](https://img.shields.io/badge/GitHub-tdrh698--bit-blue)](https://github.com/tdrh698-bit)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

一个教育性的HTML游戏，帮助用户学习中国个人所得税住房租金扣除政策。通过4个互动任务，让用户在游戏中掌握税收知识。

## 🌟 项目亮点

- **🎮 游戏化学习**：将枯燥的税收政策转化为有趣的游戏体验
- **📚 四大任务模块**：从基础认知到实战应用，循序渐进
- **🎯 互动性强**：拖拽、选择、计算、收集等多种交互方式
- **📱 响应式设计**：完美适配桌面和移动设备
- **🚀 开箱即用**：无需复杂配置，直接部署使用

## 🎮 游戏任务

### 任务一：城市等级认知 🏙️
- **目标**：掌握不同城市的住房租金扣除标准
- **内容**：将8个指定城市拖拽到正确的扣除标准区域
- **城市分类**：
  - 1500元/月：北京市、厦门市、杭州市
  - 1100元/月：苏州市、温州市、佛山市
  - 800元/月：伊春市、七台河市

### 任务二：合同审查实践 📝
- **目标**：识别租赁合同中的常见问题
- **内容**：找出5个合同问题点并选择正确修复方案
- **问题类型**：
  1. 出租人信息不完整
  2. 地址信息缺失
  3. 租金金额格式不规范
  4. 缺失租赁合同备案信息
  5. 缺失房屋所有权证号

### 任务三：扣除计算实战 🧮
- **目标**：根据实际情况计算可扣除金额
- **内容**：4个真实场景的扣除计算
- **计算场景**：
  1. 单身租房族（杭州市，月租金2000元）
  2. 已婚夫妻同城（厦门市，配偶有自有住房）
  3. 已婚夫妻异地（北京市，配偶在异地工作）
  4. 合租分摊（苏州市，与1人合租）

### 任务四：申报材料准备 📋
- **目标**：在规定时间内收集申报所需材料
- **内容**：8种材料卡片，区分必需和可选材料
- **游戏模式**：
  - 简单模式：90秒
  - 普通模式：60秒
  - 困难模式：45秒
  - 练习模式：无时间限制

## 📁 文件结构

```
rental-tax-deduction-game/
├── 📄 README.md                    # 项目说明文档
├── 📄 auto-advance-game.html      # 🏆 最终优化版（推荐）
├── 📄 game-homepage.html          # 🏠 游戏首页导航
├── 📄 game-main-complete.html     # ✅ 完整通关版
├── 📄 working-game.html           # 🔧 稳定可操作版
├── 📄 picture-version.html        # 🖼️ 图片版本恢复页
├── 📄 final-integrated-game.html  # 🔗 集成优化版
├── 📄 restored-game.html          # 💾 数据恢复导航页
├── 📄 new-design-game.html        # 🎨 全新设计版
├── 📄 contract-optimized.html     # 📝 模块二优化版
├── 📄 fixed-master.html           # 🔧 修复导航版
├── 📄 simple-game.html            # 🎯 简化稳定版
├── 📄 all-in-one-game-complete.html # 🎮 一体化完整版
├── 📄 all-in-one-game.html        # 🎮 一体化基础版
├── 📄 auto-fix.js                 # 🔧 自动修复脚本
├── 📄 calculation-game.js         # 🧮 计算游戏逻辑
├── 📄 contract-game.js            # 📝 合同游戏逻辑
├── 📄 game.js                     # 🎮 主游戏逻辑
├── 📄 materials-game.js           # 📋 材料游戏逻辑
├── 📄 style.css                   # 🎨 样式文件
├── 📄 TEST-CHECKLIST.md           # ✅ 测试检查清单
├── 📄 USAGE.md                    # 📖 使用说明
├── 📄 fix-report.md               # 📊 修复报告
├── 📄 quick-test.sh               # ⚡ 快速测试脚本
├── 📄 start-server.sh             # 🚀 启动服务器脚本
└── 📄 其他测试和验证文件...
```

## 🚀 快速开始

### 方法一：使用Python HTTP服务器（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/tdrh698-bit/rental-tax-deduction-game.git
cd rental-tax-deduction-game

# 2. 启动HTTP服务器
python3 -m http.server 3000

# 3. 在浏览器中访问
# 首页导航：http://localhost:3000/game-homepage.html
# 最终优化版：http://localhost:3000/auto-advance-game.html
# 完整通关版：http://localhost:3000/game-main-complete.html
```

### 方法二：直接打开文件

1. 下载项目文件
2. 双击 `game-homepage.html` 或 `auto-advance-game.html`
3. 在浏览器中打开（建议使用Chrome/Firefox）

### 方法三：使用提供的脚本

```bash
# 给予执行权限
chmod +x start-server.sh quick-test.sh

# 启动服务器
./start-server.sh

# 快速测试
./quick-test.sh
```

## 🌐 在线演示

项目已部署在服务器上，可通过以下地址访问：

- **游戏首页**：`http://43.153.117.19:3000/game-homepage.html`
- **最终优化版**：`http://43.153.117.19:3000/auto-advance-game.html`
- **完整通关版**：`http://43.153.117.19:3000/game-main-complete.html`

## 🛠️ 技术栈

- **前端**：HTML5、CSS3、JavaScript (ES6+)
- **图标**：Font Awesome 6.4.0
- **字体**：系统字体 + Google Fonts (可选)
- **服务器**：Python HTTP Server / Node.js / Nginx
- **部署**：GitHub Pages / 自有服务器

## 📊 项目统计

- **总文件数**：43个文件
- **主要HTML文件**：29个
- **JavaScript文件**：5个
- **CSS文件**：1个
- **脚本文件**：2个
- **文档文件**：6个
- **总代码行数**：约25,879行
- **项目大小**：约1MB

## 🎯 核心功能

### 1. 自动跳转优化版 (`auto-advance-game.html`)
- ✅ 任务完成后3秒自动跳转到下一关
- ✅ 任务二显示正确选项提示
- ✅ 任务三全年可扣除金额填空验证
- ✅ 任务四可选择不同难度模式
- ✅ 进度跟踪和得分系统
- ✅ 完成证书奖励

### 2. 游戏首页 (`game-homepage.html`)
- 🏠 项目介绍和核心功能展示
- 🚀 一键跳转到主要版本
- 📊 游戏数据统计
- 🔧 服务器状态监控
- 📁 完整文件列表

### 3. 完整通关版 (`game-main-complete.html`)
- 🎮 一体化游戏体验
- 📈 进度保存和恢复
- 🏆 成就系统
- 📊 学习报告生成
- 🔄 数据备份功能

## 🔧 开发与维护

### 环境要求
- 现代浏览器（Chrome 90+、Firefox 88+、Safari 14+）
- Python 3.6+（用于HTTP服务器）
- Git（用于版本控制）

### 开发指南

1. **添加新城市**：修改 `game.js` 中的城市数组
2. **调整扣除标准**：修改 `calculation-game.js` 中的计算逻辑
3. **添加新任务**：创建新的JavaScript类并集成到主游戏
4. **修改样式**：编辑 `style.css` 文件
5. **添加新功能**：遵循模块化设计原则

### 测试流程

```bash
# 运行测试检查清单
cat TEST-CHECKLIST.md

# 启动测试服务器
python3 -m http.server 3000

# 访问测试页面
# http://localhost:3000/test-game.html
# http://localhost:3000/direct-test.html
```

## 📈 版本历史

### v1.0.0 (2026-03-27)
- ✅ 初始版本发布
- ✅ 4个完整任务模块
- ✅ 29个HTML游戏文件
- ✅ 响应式设计
- ✅ 游戏化学习体验

### v1.1.0 (2026-03-27)
- 🚀 添加自动跳转优化版
- 🎨 创建游戏首页导航
- 🔧 优化用户体验
- 📊 添加进度跟踪系统

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

**李玉辉** - 项目负责人
- GitHub: [@tdrh698-bit](https://github.com/tdrh698-bit)

## 🙏 致谢

- 感谢所有测试用户的反馈
- 感谢开源社区提供的工具和资源
- 特别感谢税收政策专家的指导

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- **GitHub Issues**: [项目问题跟踪](https://github.com/tdrh698-bit/rental-tax-deduction-game/issues)
- **电子邮件**: liyuhui@example.com

---

**最后更新**: 2026-03-29  
**项目状态**: ✅ 生产就绪  
**访问地址**: [https://github.com/tdrh698-bit/rental-tax-deduction-game](https://github.com/tdrh698-bit/rental-tax-deduction-game)

⭐ **如果这个项目对你有帮助，请给个Star！** ⭐
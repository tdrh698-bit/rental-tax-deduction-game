#!/bin/bash

# 住房租金扣除游戏 - 服务器启动脚本
# 使用方法：./start-server.sh [端口号]

# 设置默认端口
PORT=${1:-3000}

# 显示游戏信息
echo "========================================="
echo "  住房租金扣除游戏 - 服务器启动"
echo "========================================="
echo ""
echo "游戏版本：1.0.0"
echo "启动时间：$(date)"
echo "工作目录：$(pwd)"
echo ""

# 检查Python3是否可用
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到 python3，请安装Python3"
    exit 1
fi

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  警告：端口 $PORT 已被占用"
    echo "尝试使用其他端口..."
    PORT=$((PORT + 1))
    echo "使用端口：$PORT"
fi

# 显示可用链接
echo ""
echo "📡 服务器启动中..."
echo ""

# 启动HTTP服务器
echo "✅ 正在启动HTTP服务器（端口：$PORT）..."
echo ""

# 显示访问链接
echo "🌐 访问链接："
echo "-----------------------------------------"
echo "1. 🎮 主游戏页面："
echo "   http://localhost:$PORT/index.html"
echo ""
echo "2. 🧪 综合测试页面："
echo "   http://localhost:$PORT/test-game.html"
echo ""
echo "3. 🛠️ 最终修复版本："
echo "   http://localhost:$PORT/final-fix.html"
echo ""
echo "4. 🔍 问题诊断页面："
echo "   http://localhost:$PORT/check-qitaihe.html"
echo ""
echo "5. 📊 城市验证页面："
echo "   http://localhost:$PORT/verify-cities.html"
echo "-----------------------------------------"
echo ""
echo "📝 提示："
echo "- 按 Ctrl+C 停止服务器"
echo "- 如果无法访问，请检查防火墙设置"
echo "- 使用无痕模式避免缓存问题"
echo ""

# 启动服务器
echo "🚀 启动服务器..."
echo ""

# 记录日志
LOG_FILE="server-$(date +%Y%m%d-%H%M%S).log"
echo "日志文件：$LOG_FILE"
echo ""

# 启动HTTP服务器
python3 -m http.server $PORT 2>&1 | tee "$LOG_FILE"
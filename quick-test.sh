#!/bin/bash

# 住房租金扣除游戏 - 快速测试脚本
# 自动启动服务器并打开测试页面

echo "========================================="
echo "  住房租金扣除游戏 - 快速测试"
echo "========================================="
echo ""

# 设置端口
PORT=3000

# 检查并杀死占用端口的进程
echo "🔍 检查端口 $PORT..."
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  端口 $PORT 被占用，尝试停止..."
    PID=$(lsof -ti:$PORT)
    kill -9 $PID 2>/dev/null
    sleep 1
    echo "✅ 已停止占用进程"
fi

# 启动服务器
echo ""
echo "🚀 启动游戏服务器..."
./start-server.sh $PORT &

# 等待服务器启动
echo ""
echo "⏳ 等待服务器启动..."
sleep 3

# 检查服务器是否运行
if curl -s http://localhost:$PORT > /dev/null; then
    echo "✅ 服务器启动成功！"
    echo ""
    
    # 显示测试链接
    echo "🌐 测试链接："
    echo "-----------------------------------------"
    echo "1. 主游戏测试："
    echo "   http://localhost:$PORT/index.html?test=quick"
    echo ""
    echo "2. 综合测试："
    echo "   http://localhost:$PORT/test-game.html?test=quick"
    echo ""
    echo "3. 最终修复版本："
    echo "   http://localhost:$PORT/final-fix.html?test=quick"
    echo ""
    echo "4. 城市验证："
    echo "   http://localhost:$PORT/verify-cities.html?test=quick"
    echo "-----------------------------------------"
    echo ""
    
    # 尝试打开浏览器（如果支持）
    if command -v xdg-open &> /dev/null; then
        echo "🖥️  尝试在浏览器中打开测试页面..."
        xdg-open "http://localhost:$PORT/test-game.html?test=quick" 2>/dev/null &
    elif command -v open &> /dev/null; then
        echo "🖥️  尝试在浏览器中打开测试页面..."
        open "http://localhost:$PORT/test-game.html?test=quick" 2>/dev/null &
    else
        echo "📋 请手动复制以上链接到浏览器中打开"
    fi
    
    echo ""
    echo "📝 测试要点："
    echo "1. 检查任务一：8个城市是否都显示（包括七台河）"
    echo "2. 检查任务二：合同审查功能是否正常"
    echo "3. 检查任务三：扣除计算是否准确"
    echo "4. 检查任务四：材料准备游戏是否正常"
    echo ""
    echo "🛑 按 Ctrl+C 停止服务器"
    echo ""
    
    # 保持脚本运行
    wait
    
else
    echo "❌ 服务器启动失败，请检查日志"
    exit 1
fi
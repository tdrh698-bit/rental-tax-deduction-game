// 扣除计算实战游戏模块
class CalculationGame {
    constructor() {
        this.currentScenario = 1;
        this.totalScore = 0;
        this.userAnswers = {};
        
        // 扣除标准数据（仅包含8个指定城市）
        this.deductionStandards = {
            '北京': 1500,    // 直辖市
            '厦门': 1500,    // 计划单列市
            '杭州': 1500,    // 省会城市
            '苏州': 1100,    // 人口>100万
            '温州': 1100,    // 人口>100万
            '佛山': 1100,    // 人口>100万
            '伊春': 800,     // 人口≤100万
            '七台河': 800    // 人口≤100万
        };
        
        // 计算场景
        this.scenarios = [
            {
                id: 1,
                title: '单身租房族',
                description: '你在杭州市工作，月租金2000元，租赁期限全年',
                data: {
                    city: '杭州',
                    actualRent: 2000,
                    months: 12,
                    hasSpouse: false,
                    spouseHasHouse: false,
                    spouseInSameCity: false
                },
                correctAnswer: 1500,
                explanation: '杭州市扣除标准为1500元/月，实际租金2000元超过标准，按标准1500元扣除'
            },
            {
                id: 2,
                title: '已婚夫妻同城',
                description: '你在厦门市工作，月租金3000元，配偶在同城工作且有自有住房',
                data: {
                    city: '厦门',
                    actualRent: 3000,
                    months: 12,
                    hasSpouse: true,
                    spouseHasHouse: true,
                    spouseInSameCity: true
                },
                correctAnswer: 0,
                explanation: '夫妻双方在同一城市工作，其中一方有自有住房的，双方均不能享受住房租金扣除'
            },
            {
                id: 3,
                title: '已婚夫妻异地',
                description: '你在北京市工作，月租金2500元，配偶在外地工作',
                data: {
                    city: '北京',
                    actualRent: 2500,
                    months: 12,
                    hasSpouse: true,
                    spouseHasHouse: false,
                    spouseInSameCity: false
                },
                correctAnswer: 1500,
                explanation: '夫妻异地工作，且在工作城市均无自有住房的，可以分别享受扣除'
            },
            {
                id: 4,
                title: '合租分摊',
                description: '你和朋友在苏州市合租，月租金总额2200元，你们平均分摊',
                data: {
                    city: '苏州',
                    actualRent: 1100,
                    months: 12,
                    hasSpouse: false,
                    spouseHasHouse: false,
                    spouseInSameCity: false,
                    isSharing: true,
                    totalRent: 2200,
                    sharers: 2
                },
                correctAnswer: 1100,
                explanation: '合租住房的，根据租赁合同列明的租金金额，按实际分摊的租金扣除'
            }
        ];
    }
    
    init() {
        this.renderScenario();
        this.setupEventListeners();
        this.updateScoreDisplay();
    }
    
    renderScenario() {
        const scenario = this.scenarios[this.currentScenario - 1];
        const container = document.getElementById('calculationGame');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <h3><i class="fas fa-calculator"></i> 场景${scenario.id}: ${scenario.title}</h3>
                    <div class="scenario-score">当前得分: <span id="currentScore">${this.totalScore}</span>分</div>
                </div>
                
                <div class="scenario-description">
                    <p>${scenario.description}</p>
                </div>
                
                <div class="scenario-details">
                    <h4><i class="fas fa-info-circle"></i> 场景详情</h4>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">工作城市:</span>
                            <span class="detail-value">${scenario.data.city}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">月租金:</span>
                            <span class="detail-value">¥${scenario.data.actualRent}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">租赁期限:</span>
                            <span class="detail-value">${scenario.data.months}个月</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">婚姻状况:</span>
                            <span class="detail-value">${scenario.data.hasSpouse ? '已婚' : '未婚'}</span>
                        </div>
                        ${scenario.data.hasSpouse ? `
                        <div class="detail-item">
                            <span class="detail-label">配偶有房:</span>
                            <span class="detail-value">${scenario.data.spouseHasHouse ? '是' : '否'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">配偶同城:</span>
                            <span class="detail-value">${scenario.data.spouseInSameCity ? '是' : '否'}</span>
                        </div>
                        ` : ''}
                        ${scenario.data.isSharing ? `
                        <div class="detail-item">
                            <span class="detail-label">合租人数:</span>
                            <span class="detail-value">${scenario.data.sharers}人</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">总租金:</span>
                            <span class="detail-value">¥${scenario.data.totalRent}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="calculation-question">
                    <h4><i class="fas fa-question-circle"></i> 问题：你每月可以扣除多少租金支出？</h4>
                    
                    <div class="answer-options">
                        <div class="option-group">
                            <label class="option-item">
                                <input type="radio" name="deductionAnswer" value="0">
                                <span class="option-text">0元</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="deductionAnswer" value="800">
                                <span class="option-text">800元</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="deductionAnswer" value="1100">
                                <span class="option-text">1100元</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="deductionAnswer" value="1500">
                                <span class="option-text">1500元</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="deductionAnswer" value="${scenario.data.actualRent}">
                                <span class="option-text">实际租金 ¥${scenario.data.actualRent}</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="calculation-tools">
                    <h4><i class="fas fa-tools"></i> 计算工具</h4>
                    <div class="tools-grid">
                        <div class="tool-item">
                            <label>城市选择:</label>
                            <select id="citySelect" class="tool-select">
                                <option value="1500">直辖市/省会 (1500元)</option>
                                <option value="1100">人口>100万 (1100元)</option>
                                <option value="800">人口≤100万 (800元)</option>
                            </select>
                        </div>
                        <div class="tool-item">
                            <label>实际租金:</label>
                            <div class="slider-container">
                                <input type="range" id="rentSlider" min="500" max="5000" value="${scenario.data.actualRent}" step="100" class="tool-slider">
                                <span id="rentValue">¥${scenario.data.actualRent}</span>
                            </div>
                        </div>
                        <div class="tool-item">
                            <label>家庭状况:</label>
                            <div class="toggle-group">
                                <button class="toggle-btn ${!scenario.data.hasSpouse ? 'active' : ''}" data-status="single">单身</button>
                                <button class="toggle-btn ${scenario.data.hasSpouse && !scenario.data.spouseHasHouse ? 'active' : ''}" data-status="married-no-house">已婚无房</button>
                                <button class="toggle-btn ${scenario.data.hasSpouse && scenario.data.spouseHasHouse ? 'active' : ''}" data-status="married-with-house">已婚有房</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-secondary" id="calcHintBtn">
                        <i class="fas fa-lightbulb"></i> 查看提示
                    </button>
                    <button class="btn btn-primary" id="calcSubmitBtn">
                        <i class="fas fa-check-circle"></i> 提交答案
                    </button>
                    ${this.currentScenario < this.scenarios.length ? `
                    <button class="btn btn-next" id="nextScenarioBtn" style="display: none;">
                        <i class="fas fa-arrow-right"></i> 下一场景
                    </button>
                    ` : `
                    <button class="btn btn-success" id="finishCalcBtn" style="display: none;">
                        <i class="fas fa-flag-checkered"></i> 完成计算任务
                    </button>
                    `}
                </div>
                
                <div id="calcFeedback" class="feedback-area"></div>
            </div>
        `;
        
        this.initTools();
    }
    
    initTools() {
        // 租金滑块
        const rentSlider = document.getElementById('rentSlider');
        const rentValue = document.getElementById('rentValue');
        
        if (rentSlider && rentValue) {
            rentSlider.addEventListener('input', (e) => {
                rentValue.textContent = '¥' + e.target.value;
            });
        }
        
        // 城市选择
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            const scenario = this.scenarios[this.currentScenario - 1];
            const standard = this.deductionStandards[scenario.data.city];
            
            if (standard === 1500) citySelect.value = '1500';
            else if (standard === 1100) citySelect.value = '1100';
            else citySelect.value = '800';
        }
        
        // 家庭状况切换
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'calcHintBtn' || e.target.closest('#calcHintBtn')) {
                this.showHint();
            }
            
            if (e.target.id === 'calcSubmitBtn' || e.target.closest('#calcSubmitBtn')) {
                this.submitAnswer();
            }
            
            if (e.target.id === 'nextScenarioBtn' || e.target.closest('#nextScenarioBtn')) {
                this.nextScenario();
            }
            
            if (e.target.id === 'finishCalcBtn' || e.target.closest('#finishCalcBtn')) {
                this.finishTask();
            }
        });
    }
    
    showHint() {
        const scenario = this.scenarios[this.currentScenario - 1];
        const feedback = document.getElementById('calcFeedback');
        
        if (!feedback) return;
        
        feedback.innerHTML = `
            <div class="hint-message">
                <h4><i class="fas fa-lightbulb"></i> 计算提示</h4>
                <p><strong>扣除标准：</strong>${scenario.data.city}市的扣除标准为¥${this.deductionStandards[scenario.data.city]}/月</p>
                <p><strong>计算规则：</strong></p>
                <ul>
                    <li>扣除金额不能超过城市标准上限</li>
                    <li>夫妻同城且一方有房的，双方均不能扣除</li>
                    <li>夫妻异地工作的，可以分别扣除</li>
                    <li>合租的按实际分摊金额扣除</li>
                </ul>
                <p><em>提示：仔细分析家庭状况和城市标准</em></p>
            </div>
        `;
    }
    
    submitAnswer() {
        const selectedOption = document.querySelector('input[name="deductionAnswer"]:checked');
        if (!selectedOption) {
            this.showFeedback('请先选择一个答案！', 'error');
            return;
        }
        
        const userAnswer = parseInt(selectedOption.value);
        const scenario = this.scenarios[this.currentScenario - 1];
        const isCorrect = userAnswer === scenario.correctAnswer;
        
        this.userAnswers[scenario.id] = {
            userAnswer,
            correctAnswer: scenario.correctAnswer,
            isCorrect
        };
        
        if (isCorrect) {
            this.totalScore += 25;
            this.showFeedback(`✅ 回答正确！每月可扣除¥${scenario.correctAnswer}<br>+25分`, 'success');
        } else {
            this.showFeedback(`❌ 回答错误。正确答案是¥${scenario.correctAnswer}/月`, 'error');
        }
        
        this.showExplanation(scenario);
        this.updateScoreDisplay();
        
        if (this.currentScenario < this.scenarios.length) {
            document.getElementById('nextScenarioBtn').style.display = 'inline-block';
            document.getElementById('calcSubmitBtn').style.display = 'none';
        } else {
            document.getElementById('finishCalcBtn').style.display = 'inline-block';
            document.getElementById('calcSubmitBtn').style.display = 'none';
        }
    }
    
    showExplanation(scenario) {
        const feedback = document.getElementById('calcFeedback');
        if (!feedback) return;
        
        const existingHint = feedback.querySelector('.hint-message');
        if (existingHint) existingHint.remove();
        
        feedback.innerHTML += `
            <div class="explanation-message">
                <h4><i class="fas fa-graduation-cap"></i> 知识点解析</h4>
                <p>${scenario.explanation}</p>
                <div class="explanation-details">
                    <p><strong>计算过程：</strong></p>
                    <ol>
                        <li>确定城市标准：${scenario.data.city} → ¥${this.deductionStandards[scenario.data.city]}/月</li>
                        <li>比较实际租金：¥${scenario.data.actualRent} ${scenario.data.actualRent > this.deductionStandards[scenario.data.city] ? '> 标准，按标准扣除' : '≤ 标准，按实际扣除'}</li>
                        ${scenario.data.hasSpouse ? `
                        <li>家庭状况：${scenario.data.spouseHasHouse ? '配偶有自有住房' : '配偶无自有住房'}</li>
                        <li>工作地点：${scenario.data.spouseInSameCity ? '夫妻同城工作' : '夫妻异地工作'}</li>
                        ` : ''}
                        ${scenario.data.isSharing ? `
                        <li>合租分摊：总租金¥${scenario.data.totalRent} ÷ ${scenario.data.sharers}人 = ¥${scenario.data.actualRent}/人</li>
                        ` : ''}
                        <li>最终扣除：¥${scenario.correctAnswer}/月</li>
                    </ol>
                </div>
            </div>
        `;
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('calcFeedback');
        if (!feedback) return;
        
        const existingFeedback = feedback.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();
        
        feedback.innerHTML = `
            <div class="feedback-message ${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <div>${message}</div>
            </div>
        ` + feedback.innerHTML;
    }
    
    updateScoreDisplay() {
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = this.totalScore;
        }
    }
    
    nextScenario() {
        if (this.currentScenario < this.scenarios.length) {
            this.currentScenario++;
            this.renderScenario();
            this.setupEventListeners();
        }
    }
    
    finishTask() {
        const maxScore = this.scenarios.length * 25;
        const percentage = Math.round((this.totalScore / maxScore) * 100);
        const container = document.getElementById('calculationGame');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="completion-card">
                <div class="completion-header">
                    <i class="fas fa-flag-checkered completion-icon"></i>
                    <h2>扣除计算任务完成！</h2>
                </div>
                
                <div class="score-summary">
                    <div class="score-item">
                        <div class="score-label">场景完成</div>
                        <div class="score-value">${this.scenarios.length}/${this.scenarios.length}</div>
                    </div>
                    <div class="score-item">
                        <div class="score-label">得分</div>
                        <div class="score-value">${this.totalScore}/${maxScore}</div>
                    </div>
                    <div class="score-item">
                        <div class="score-label">正确率</div>
                        <div class="score-value">${percentage}%</div>
                    </div>
                </div>
                
                <div class="performance-rating">
                    <h3>表现评级</h3>
                    ${percentage >= 90 ? `
                    <div class="rating-excellent">
                        <i class="fas fa-trophy"></i>
                        <h4>计算专家</h4>
                        <p>你对扣除计算规则掌握得非常透彻！</p>
                    </div>
                    ` : percentage >= 70 ? `
                    <div class="rating-good">
                        <i class="fas fa-star"></i>
                        <h4>合格纳税人</h4>
                        <p>你基本掌握了扣除计算方法。</p>
                    </div>
                    ` : percentage >= 60 ? `
                    <div class="rating-average">
                        <i class="fas fa-check-circle"></i>
                        <h4>需要练习</h4>
                        <p>建议复习一下扣除计算规则。</p>
                    </div>
                    ` : `
                    <div class="rating-poor">
                        <i class="fas fa-redo"></i>
                        <h4>重新学习</h4>
                        <p>需要重新学习扣除计算相关知识。</p>
                    </div>
                    `}
                </div>
                
                <div class="answers-review">
                    <h3><i class="fas fa-clipboard-check"></i> 答案回顾</h3>
                    <div class="answers-list">
                        ${this.scenarios.map(scenario => {
                            const userAnswer = this.userAnswers[scenario.id];
                            return `
                                <div class="answer-item ${userAnswer?.isCorrect ? 'correct' : 'incorrect'}">
                                    <div class="answer-header">
                                        <span class="answer-title">场景${scenario.id}: ${scenario.title}</span>
                                        <span class="answer-status">
                                            ${userAnswer?.isCorrect ? '✅ 正确' : '❌ 错误'}
                                        </span>
                                    </div>
                                    <div class="answer-details">
                                        <div class="detail-row">
                                            <span>你的答案:</span>
                                            <span class="user-answer">¥${userAnswer?.userAnswer || '未回答'}</span>
                                        </div>
                                        <div class="detail-row">
                                            <span>正确答案:</span>
                                            <span class="correct-answer">¥${scenario.correctAnswer}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="key-knowledge">
                    <h3><i class="fas fa-graduation-cap"></i> 核心知识点总结</h3>
                    <div class="knowledge-points">
                        <div class="knowledge-item">
                            <i class="fas fa-city"></i>
                            <h4>城市标准</h4>
                            <p>直辖市/省会: 1500元<br>人口>100万: 1100元<br>人口≤100万: 800元</p>
                        </div>
                        <div class="knowledge-item">
                            <i class="fas fa-home"></i>
                            <h4>家庭状况</h4>
                            <p>夫妻同城有房: 双方均不能扣<br>夫妻异地工作: 可以分别扣除</p>
                        </div>
                        <div class="knowledge-item">
                            <i class="fas fa-users"></i>
                            <h4>合租分摊</h4>
                            <p>按实际分摊金额扣除<br>不超过个人分摊的城市标准</p>
                        </div>
                        <div class="knowledge-item">
                            <i class="fas fa-calculator"></i>
                            <h4>计算规则</h4>
                            <p>取实际租金和城市标准<br>两者中的较低值</p>
                        </div>
                    </div>
                </div>
                
                <div class="completion-actions">
                    <button class="btn btn-secondary" onclick="calculationGame.restart()">
                        <i class="fas fa-redo"></i> 重新挑战
                    </button>
                    <button class="btn btn-primary" onclick="window.location.href='#mission4'">
                        <i class="fas fa-arrow-right"></i> 继续任务四
                    </button>
                </div>
            </div>
        `;
    }
    
    restart() {
        this.currentScenario = 1;
        this.totalScore = 0;
        this.userAnswers = {};
        this.renderScenario();
        this.updateScoreDisplay();
    }
}

// 全局实例
let calculationGame = new CalculationGame();
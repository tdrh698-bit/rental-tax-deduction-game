// 申报材料准备游戏模块
class MaterialsGame {
    constructor() {
        this.materials = [
            {
                id: 'contract',
                name: '房屋租赁合同',
                description: '已备案的正式租赁合同',
                isRequired: true,
                isSelected: false,
                points: 25,
                icon: 'fa-file-contract'
            },
            {
                id: 'invoice',
                name: '租赁发票',
                description: '租金支付凭证或发票',
                isRequired: true,
                isSelected: false,
                points: 25,
                icon: 'fa-receipt'
            },
            {
                id: 'property',
                name: '房产证明',
                description: '出租方房产证复印件',
                isRequired: true,
                isSelected: false,
                points: 25,
                icon: 'fa-home'
            },
            {
                id: 'record',
                name: '备案证明',
                description: '租赁合同备案登记证明',
                isRequired: true,
                isSelected: false,
                points: 25,
                icon: 'fa-stamp'
            },
            {
                id: 'id',
                name: '身份证',
                description: '承租人身份证复印件',
                isRequired: true,
                isSelected: false,
                points: 20,
                icon: 'fa-id-card'
            },
            {
                id: 'utility',
                name: '水电费账单',
                description: '最近3个月的水电费账单',
                isRequired: false,
                isSelected: false,
                points: -10,
                icon: 'fa-bolt'
            },
            {
                id: 'neighbor',
                name: '邻居证明',
                description: '邻居出具的居住证明',
                isRequired: false,
                isSelected: false,
                points: -15,
                icon: 'fa-user-friends'
            },
            {
                id: 'furniture',
                name: '家具发票',
                description: '购买家具的发票',
                isRequired: false,
                isSelected: false,
                points: -20,
                icon: 'fa-couch'
            },
            {
                id: 'pet',
                name: '宠物证明',
                description: '宠物饲养许可证',
                isRequired: false,
                isSelected: false,
                points: -25,
                icon: 'fa-paw'
            },
            {
                id: 'parking',
                name: '停车费收据',
                description: '小区停车费收据',
                isRequired: false,
                isSelected: false,
                points: -10,
                icon: 'fa-car'
            }
        ];
        
        this.score = 0;
        this.timeRemaining = 300;
        this.timer = null;
        this.gameCompleted = false;
    }
    
    init() {
        this.renderGame();
        this.setupEventListeners();
        this.startTimer();
    }
    
    renderGame() {
        const container = document.getElementById('materialsGame');
        if (!container) return;
        
        container.innerHTML = `
            <div class="materials-game-container">
                <div class="game-header">
                    <div class="header-left">
                        <h2><i class="fas fa-clipboard-list"></i> 申报材料准备</h2>
                        <p class="game-description">收集正确的申报材料，避免选择不需要的材料</p>
                    </div>
                    <div class="header-right">
                        <div class="game-stats">
                            <div class="stat-item">
                                <i class="fas fa-clock"></i>
                                <span id="timerDisplay">05:00</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-star"></i>
                                <span id="scoreDisplay">0</span>分
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-check-circle"></i>
                                <span id="selectedCount">0</span>/10
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="game-instructions">
                    <div class="instruction-card">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>游戏规则</h4>
                            <p>点击收集正确的申报材料，每选对一个+25分，选错一个扣分。必须在5分钟内完成！</p>
                        </div>
                    </div>
                    <div class="instruction-card">
                        <i class="fas fa-lightbulb"></i>
                        <div>
                            <h4>提示</h4>
                            <p>必须材料：租赁合同、发票、房产证明、备案证明、身份证</p>
                        </div>
                    </div>
                </div>
                
                <div class="materials-grid">
                    ${this.materials.map(material => `
                        <div class="material-card ${material.isSelected ? 'selected' : ''} ${material.isRequired ? 'required' : 'optional'}" 
                             data-id="${material.id}" onclick="materialsGame.toggleMaterial('${material.id}')">
                            <div class="material-icon">
                                <i class="fas ${material.icon}"></i>
                            </div>
                            <div class="material-info">
                                <h4>${material.name}</h4>
                                <p>${material.description}</p>
                                <div class="material-status">
                                    <span class="status-badge ${material.isRequired ? 'required-badge' : 'optional-badge'}">
                                        ${material.isRequired ? '必须材料' : '不需要'}
                                    </span>
                                    <span class="points-badge ${material.points > 0 ? 'positive' : 'negative'}">
                                        ${material.points > 0 ? '+' : ''}${material.points}分
                                    </span>
                                </div>
                            </div>
                            <div class="material-check">
                                <i class="fas fa-${material.isSelected ? 'check-circle' : 'plus-circle'}"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="game-controls">
                    <div class="progress-section">
                        <div class="progress-label">
                            <span>完成进度</span>
                            <span id="progressPercent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="control-buttons">
                        <button class="btn btn-secondary" id="materialsHintBtn">
                            <i class="fas fa-lightbulb"></i> 查看材料清单
                        </button>
                        <button class="btn btn-primary" id="submitMaterialsBtn">
                            <i class="fas fa-paper-plane"></i> 提交申报
                        </button>
                        <button class="btn btn-reset" id="resetMaterialsBtn">
                            <i class="fas fa-redo"></i> 重新开始
                        </button>
                    </div>
                </div>
                
                <div id="materialsFeedback" class="feedback-area"></div>
            </div>
        `;
        
        this.updateUI();
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'materialsHintBtn' || e.target.closest('#materialsHintBtn')) {
                this.showMaterialsList();
            }
            
            if (e.target.id === 'submitMaterialsBtn' || e.target.closest('#submitMaterialsBtn')) {
                this.submitMaterials();
            }
            
            if (e.target.id === 'resetMaterialsBtn' || e.target.closest('#resetMaterialsBtn')) {
                this.resetGame();
            }
        });
    }
    
    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.timeUp();
                return;
            }
            
            this.timeRemaining--;
            this.updateTimerDisplay();
        }, 1000);
    }
    
    updateTimerDisplay() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeRemaining <= 60) {
                timerDisplay.style.color = '#F44336';
                timerDisplay.style.fontWeight = 'bold';
            }
        }
    }
    
    toggleMaterial(materialId) {
        if (this.gameCompleted) return;
        
        const material = this.materials.find(m => m.id === materialId);
        if (!material) return;
        
        material.isSelected = !material.isSelected;
        
        if (material.isSelected) {
            this.score += material.points;
        } else {
            this.score -= material.points;
        }
        
        this.updateUI();
    }
    
    updateUI() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        if (scoreDisplay) {
            scoreDisplay.textContent = this.score;
        }
        
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            const selected = this.materials.filter(m => m.isSelected).length;
            selectedCount.textContent = selected;
        }
        
        const requiredCount = this.materials.filter(m => m.isRequired).length;
        const selectedRequired = this.materials.filter(m => m.isRequired && m.isSelected).length;
        const progressPercent = Math.round((selectedRequired / requiredCount) * 100);
        
        const progressPercentElement = document.getElementById('progressPercent');
        const progressFill = document.getElementById('progressFill');
        
        if (progressPercentElement) {
            progressPercentElement.textContent = `${progressPercent}%`;
        }
        
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
            
            if (progressPercent >= 100) {
                progressFill.style.backgroundColor = '#4CAF50';
            } else if (progressPercent >= 50) {
                progressFill.style.backgroundColor = '#FF9800';
            } else {
                progressFill.style.backgroundColor = '#F44336';
            }
        }
        
        this.materials.forEach(material => {
            const card = document.querySelector(`[data-id="${material.id}"]`);
            if (card) {
                if (material.isSelected) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
                
                const checkIcon = card.querySelector('.material-check i');
                if (checkIcon) {
                    checkIcon.className = `fas fa-${material.isSelected ? 'check-circle' : 'plus-circle'}`;
                }
            }
        });
    }
    
    showMaterialsList() {
        const feedback = document.getElementById('materialsFeedback');
        if (!feedback) return;
        
        const requiredMaterials = this.materials.filter(m => m.isRequired);
        const optionalMaterials = this.materials.filter(m => !m.isRequired);
        
        feedback.innerHTML = `
            <div class="materials-list-hint">
                <h4><i class="fas fa-clipboard-check"></i> 申报材料清单</h4>
                
                <div class="list-section">
                    <h5><i class="fas fa-check-circle" style="color: #4CAF50"></i> 必须准备的材料（5项）</h5>
                    <div class="materials-mini-grid">
                        ${requiredMaterials.map(material => `
                            <div class="mini-material ${material.isSelected ? 'selected-mini' : ''}">
                                <i class="fas ${material.icon}"></i>
                                <span>${material.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="list-section">
                    <h5><i class="fas fa-times-circle" style="color: #F44336"></i> 不需要准备的材料（5项）</h5>
                    <div class="materials-mini-grid">
                        ${optionalMaterials.map(material => `
                            <div class="mini-material ${material.isSelected ? 'selected-mini' : ''}">
                                <i class="fas ${material.icon}"></i>
                                <span>${material.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="hint-tips">
                    <p><strong>💡 小贴士：</strong></p>
                    <ul>
                        <li>租赁合同必须已经备案</li>
                        <li>发票可以是电子发票或纸质发票</li>
                        <li>房产证明需要出租方提供复印件</li>
                        <li>备案证明从房管局获取</li>
                        <li>身份证需要正反面复印件</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    submitMaterials() {
        if (this.gameCompleted) return;
        
        clearInterval(this.timer);
        this.gameCompleted = true;
        
        const requiredMaterials = this.materials.filter(m => m.isRequired);
        const optionalMaterials = this.materials.filter(m => !m.isRequired);
        
        const selectedRequired = requiredMaterials.filter(m => m.isSelected).length;
        const selectedOptional = optionalMaterials.filter(m => m.isSelected).length;
        
        const finalScore = Math.max(0, this.score);
        const percentage = Math.round((selectedRequired / requiredMaterials.length) * 100);
        
        let timeBonus = 0;
        if (this.timeRemaining > 120) {
            timeBonus = 50;
        } else if (this.timeRemaining > 60) {
            timeBonus = 25;
        }
        
        const totalScore = finalScore + timeBonus;
        
        this.showResults({
            selectedRequired,
            totalRequired: requiredMaterials.length,
            selectedOptional,
            totalOptional: optionalMaterials.length,
            finalScore,
            timeBonus,
            totalScore,
            percentage,
            timeRemaining: this.timeRemaining
        });
    }
    
    showResults(results) {
        const container = document.getElementById('materialsGame');
        if (!container) return;
        
        container.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <i class="fas fa-clipboard-check results-icon"></i>
                    <h2>申报材料准备完成！</h2>
                    <p class="results-subtitle">${results.timeRemaining > 0 ? '在规定时间内完成！' : '超时完成'}</p>
                </div>
                
                <div class="score-breakdown">
                    <div class="breakdown-item">
                        <div class="breakdown-label">材料正确率</div>
                        <div class="breakdown-value">${results.selectedRequired}/${results.totalRequired}</div>
                        <div class="breakdown-bar">
                            <div class="bar-fill" style="width: ${results.percentage}%"></div>
                        </div>
                        <div class="breakdown-percent">${results.percentage}%</div>
                    </div>
                    
                    <div class="breakdown-item">
                        <div class="breakdown-label">多余材料</div>
                        <div class="breakdown-value">${results.selectedOptional}项</div>
                        <div class="breakdown-detail">${results.selectedOptional > 0 ? '选择了不需要的材料' : '完美！没有多余材料'}</div>
                    </div>
                    
                    <div class="breakdown-item">
                        <div class="breakdown-label">时间剩余</div>
                        <div class="breakdown-value">${Math.floor(results.timeRemaining / 60)}:${(results.timeRemaining % 60).toString().padStart(2, '0')}</div>
                        <div class="breakdown-detail">${results.timeBonus > 0 ? `+${results.timeBonus}分时间奖励` : '无时间奖励'}</div>
                    </div>
                </div>
                
                <div class="final-score">
                    <div class="score-circle">
                        <div class="score-number">${results.totalScore}</div>
                        <div class="score-label">总分</div>
                    </div>
                    
                    <div class="score-details">
                        <div class="detail-row">
                            <span>材料得分:</span>
                            <span class="detail-value">${results.finalScore}分</span>
                        </div>
                        <div class="detail-row">
                            <span>时间奖励:</span>
                            <span class="detail-value ${results.timeBonus > 0 ? 'positive' : ''}">+${results.timeBonus}分</span>
                        </div>
                        <div class="detail-row total-row">
                            <span>最终得分:</span>
                            <span class="detail-value total-value">${results.totalScore}分</span>
                        </div>
                    </div>
                </div>
                
                <div class="performance-rating">
                    <h3><i class="fas fa-chart-line"></i> 表现评级</h3>
                    ${results.totalScore >= 125 ? `
                    <div class="rating-excellent">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <h4>材料准备专家</h4>
                            <p>你对申报材料要求了如指掌！所有必须材料都准备齐全，且没有多余材料。</p>
                        </div>
                    </div>
                    ` : results.totalScore >= 100 ? `
                    <div class="rating-good">
                        <i class="fas fa-star"></i>
                        <div>
                            <h4>合格申报者</h4>
                            <p>基本掌握了申报材料要求，可以顺利完成申报。</p>
                        </div>
                    </div>
                    ` : results.totalScore >= 75 ? `
                    <div class="rating-average">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>需要改进</h4>
                            <p>部分必须材料缺失或选择了多余材料，需要复习材料要求。</p>
                        </div>
                    </div>
                    ` : `
                    <div class="rating-poor">
                        <i class="fas fa-redo"></i>
                        <div>
                            <h4>重新学习</h4>
                            <p>需要重新学习申报材料要求，确保下次能正确准备。</p>
                        </div>
                    </div>
                    `}
                </div>
                
                <div class="key-materials">
                    <h3><i class="fas fa-list-check"></i> 关键材料清单</h3>
                    <div class="materials-checklist">
                        <div class="checklist-section">
                            <h4>✅ 必须准备的材料</h4>
                            <ul>
                                <li><i class="fas fa-file-contract"></i> 房屋租赁合同（已备案）</li>
                                <li><i class="fas fa-receipt"></i> 租赁发票或支付凭证</li>
                                <li><i class="fas fa-home"></i> 出租方房产证明复印件</li>
                                <li><i class="fas fa-stamp"></i> 租赁合同备案证明</li>
                                <li><i class="fas fa-id-card"></i> 承租人身份证复印件</li>
                            </ul>
                        </div>
                        <div class="checklist-section">
                            <h4>❌ 不需要的材料</h4>
                            <ul>
                                <li><i class="fas fa-bolt"></i> 水电费账单</li>
                                <li><i class="fas fa-user-friends"></i> 邻居证明</li>
                                <li><i class="fas fa-couch"></i> 家具发票</li>
                                <li><i class="fas fa-paw"></i> 宠物证明</li>
                                <li><i class="fas fa-car"></i> 停车费收据</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="completion-actions">
                    <button class="btn btn-secondary" onclick="materialsGame.resetGame()">
                        <i class="fas fa-redo"></i> 重新挑战
                    </button>
                    <button class="btn btn-primary" onclick="window.location.href='#summary'">
                        <i class="fas fa-flag-checkered"></i> 完成所有任务
                    </button>
                </div>
            </div>
        `;
    }
    
    timeUp() {
        if (this.gameCompleted) return;
        
        this.gameCompleted = true;
        clearInterval(this.timer);
        
        const feedback = document.getElementById('materialsFeedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="time-up-message">
                    <h4><i class="fas fa-clock"></i> 时间到！</h4>
                    <p>5分钟时间已用完，游戏自动结束。</p>
                    <button class="btn btn-primary" onclick="materialsGame.submitMaterials()">
                        查看最终得分
                    </button>
                </div>
            `;
        }
    }
    
    resetGame() {
        this.materials.forEach(material => {
            material.isSelected = false;
        });
        
        this.score = 0;
        this.timeRemaining = 300;
        this.gameCompleted = false;
        
        this.renderGame();
        this.setupEventListeners();
        this.startTimer();
    }
}

// 全局实例
let materialsGame = new MaterialsGame();
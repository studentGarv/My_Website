// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.querySelectorAll('a').forEach(link => {
                link.style.color = 'white';
            });
            navbar.querySelector('.nav-brand h2').style.color = 'white';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.querySelectorAll('a').forEach(link => {
                link.style.color = 'white';
            });
            navbar.querySelector('.nav-brand h2').style.color = 'white';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill cards for animation
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Add escape key functionality for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Easter Egg: Platformer Game
let clickCount = 0;
let clickTimer = null;
const navBrand = document.querySelector('.nav-brand h2');    if (navBrand) {
        navBrand.style.cursor = 'pointer';
        navBrand.style.userSelect = 'none';
        navBrand.title = 'Click me... there might be a surprise! 🎮';
        
        navBrand.addEventListener('click', function() {
        clickCount++;

        // Play click sound
        playClickSound();

        // Reset counter after 3 seconds of no clicks
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 3000);

        // Add click effect
        navBrand.style.transform = 'scale(0.95)';
        setTimeout(() => {
            navBrand.style.transform = 'scale(1)';
        }, 100);

        // Show click progress
        if (clickCount > 1 && clickCount < 5) {
            navBrand.style.color = `hsl(${60 * clickCount}, 70%, 50%)`;
            setTimeout(() => {
                navBrand.style.color = '';
            }, 500);
        }        if (clickCount === 5) {
            // Easter egg triggered!
            playEasterEggSound();
            navBrand.style.color = '#FFD700';
            navBrand.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            
            // Show notification first
            showEasterEggNotification();
            clickCount = 0;
                
                // Reset the name style after animation
                setTimeout(() => {
                    navBrand.style.color = '';
                    navBrand.style.textShadow = '';
                }, 2000);
            }
    });
}

function showEasterEggNotification() {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF9933 0%, #138808 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            animation: slideInFromRight 0.5s ease;
            cursor: pointer;
            max-width: 280px;
            text-align: center;
        `;
        notification.innerHTML = '🎉 Easter Egg Activated! Click to play! 🎮';
        
        // Add mobile class if on mobile
        if (window.innerWidth <= 768) {
            notification.classList.add('notification-mobile');
        }
        
        // Add animation keyframes
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @media (max-width: 768px) {
                .notification-mobile {
                    top: 10px !important;
                    right: 10px !important;
                    left: 10px !important;
                    max-width: none !important;
                    font-size: 14px !important;
                    padding: 12px 16px !important;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
        
        document.body.appendChild(notification);
        
        // Make it pulse
        notification.style.animation = 'slideInFromRight 0.5s ease, pulse 2s infinite 1s';
        
        // Auto remove after 5 seconds or on click
        const removeNotification = () => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideInFromRight 0.3s ease reverse';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                    if (document.head.contains(notificationStyles)) {
                        document.head.removeChild(notificationStyles);
                    }
                }, 300);
            }
        };
        
        notification.addEventListener('click', () => {
            removeNotification();
            openPlatformerGame();
        });
        
        setTimeout(removeNotification, 5000);
    }
    
function openPlatformerGame() {
    // Create game modal
    const gameModal = document.createElement('div');
    gameModal.id = 'platformer-modal';
    gameModal.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h3>🎮 Secret Platformer Game! 🎮</h3>
                <button class="close-game">×</button>
            </div>
            <canvas id="gameCanvas" width="800" height="400"></canvas>
            <div class="mobile-controls">
                <div class="controls-left">
                    <button class="control-btn" id="leftBtn">←</button>
                    <button class="control-btn" id="rightBtn">→</button>
                </div>
                <div class="controls-right">
                    <button class="control-btn jump-btn" id="jumpBtn">Jump</button>
                </div>
            </div>
            <div class="game-controls">
                <p class="desktop-only">Use ARROW KEYS or WASD to move and jump!</p>
                <p class="mobile-only">Use the buttons below to move and jump!</p>
                <p>Collect coins and avoid obstacles!</p>
            </div>
        </div>
    `;

    // Add game styles
    const gameStyles = document.createElement('style');
    gameStyles.textContent = `
        #platformer-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }

        .game-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            max-width: 90%;
            max-height: 90%;
        }

        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .game-header h3 {
            margin: 0;
            color: #138808;
            font-size: 1.5rem;
        }

        .close-game {
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-game:hover {
            background: #cc3333;
        }

        #gameCanvas {
            border: 3px solid #138808;
            border-radius: 10px;
            display: block;
            background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
            max-width: 100%;
            height: auto;
        }
        
        .mobile-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            padding: 0 20px;
        }
        
        .controls-left {
            display: flex;
            gap: 10px;
        }
        
        .control-btn {
            background: #138808;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
            touch-action: manipulation;
            min-width: 60px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .control-btn:hover {
            background: #0f6b06;
            transform: scale(1.05);
        }
        
        .control-btn:active {
            background: #0a4a04;
            transform: scale(0.95);
        }
        
        .jump-btn {
            background: #FF9933;
            font-size: 16px;
            padding: 15px 25px;
            min-width: 80px;
        }
        
        .jump-btn:hover {
            background: #e6851f;
        }
        
        .jump-btn:active {
            background: #cc7019;
        }
        
        .desktop-only {
            display: block;
        }
        
        .mobile-only {
            display: none;
        }
        
        @media (max-width: 768px) {
            .game-container {
                margin: 10px;
                padding: 15px;
                max-width: 95%;
                max-height: 95%;
            }
            
            .game-header h3 {
                font-size: 1.2rem;
            }
            
            #gameCanvas {
                width: 100%;
                max-width: 400px;
                height: 200px;
            }
            
            .desktop-only {
                display: none;
            }
            
            .mobile-only {
                display: block;
            }
            
            .control-btn {
                padding: 12px 16px;
                font-size: 16px;
                min-width: 50px;
                min-height: 50px;
            }
            
            .jump-btn {
                padding: 12px 20px;
                min-width: 70px;
            }
        }
        
        @media (max-width: 480px) {
            .game-container {
                margin: 5px;
                padding: 10px;
            }
            
            #gameCanvas {
                max-width: 350px;
                height: 175px;
            }
            
            .control-btn {
                padding: 10px 12px;
                font-size: 14px;
                min-width: 45px;
                min-height: 45px;
            }
            
            .jump-btn {
                padding: 10px 15px;
                min-width: 60px;
                font-size: 14px;
            }
        }

        .game-controls {
            text-align: center;
            margin-top: 15px;
            color: #666;
        }

        .game-controls p {
            margin: 5px 0;
            font-size: 0.9rem;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;

    document.head.appendChild(gameStyles);
    document.body.appendChild(gameModal);    // Initialize game
    initPlatformerGame();
    
    // Setup mobile controls
    setupMobileControls();
    
    // Close game functionality
    const closeBtn = gameModal.querySelector('.close-game');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(gameModal);
        document.head.removeChild(gameStyles);
    });

    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(gameModal);
            document.head.removeChild(gameStyles);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function initPlatformerGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Game state
    const game = {
        player: {
            x: 50,
            y: 300,
            width: 30,
            height: 30,
            velocityY: 0,
            speed: 5,
            jumpPower: 12,
            onGround: false,
            color: '#FF9933'
        },
        platforms: [
            {x: 0, y: 370, width: 200, height: 30},
            {x: 250, y: 320, width: 150, height: 20},
            {x: 450, y: 270, width: 120, height: 20},
            {x: 620, y: 220, width: 180, height: 20},
            {x: 300, y: 150, width: 100, height: 20}
        ],
        coins: [
            {x: 300, y: 290, collected: false},
            {x: 500, y: 240, collected: false},
            {x: 650, y: 190, collected: false},
            {x: 350, y: 120, collected: false}
        ],
        obstacles: [
            {x: 400, y: 340, width: 20, height: 30},
            {x: 700, y: 190, width: 20, height: 30}
        ],
        gravity: 0.8,
        score: 0,
        keys: {},
        scale: { x: 1, y: 1 }
    };

    // Input handling
    document.addEventListener('keydown', (e) => {
        game.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', (e) => {
        game.keys[e.key.toLowerCase()] = false;
    });

    function update() {
        const player = game.player;

        // Horizontal movement (keyboard + mobile)
        const mobileControls = window.mobileControls || {};
        if (game.keys['arrowleft'] || game.keys['a'] || mobileControls.left) {
            player.x -= player.speed;
        }
        if (game.keys['arrowright'] || game.keys['d'] || mobileControls.right) {
            player.x += player.speed;
        }

        // Jumping (keyboard + mobile)
        if ((game.keys['arrowup'] || game.keys['w'] || game.keys[' '] || mobileControls.jump) && player.onGround) {
            player.velocityY = -player.jumpPower;
            player.onGround = false;
            provideMobileFeedback('jump');
        }

        // Apply gravity
        player.velocityY += game.gravity;
        player.y += player.velocityY;

        // Platform collision
        player.onGround = false;
        game.platforms.forEach(platform => {
            if (player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y < platform.y + platform.height &&
                player.y + player.height > platform.y) {

                if (player.velocityY > 0) { // Falling
                    player.y = platform.y - player.height;
                    player.velocityY = 0;
                    player.onGround = true;
                }
            }
        });

        // Boundary checks
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        if (player.y > canvas.height) {
            // Reset player position
            player.x = 50;
            player.y = 300;
            player.velocityY = 0;
        }

        // Coin collection
        game.coins.forEach(coin => {
            if (!coin.collected &&
                Math.abs(player.x + player.width/2 - coin.x) < 20 &&
                Math.abs(player.y + player.height/2 - coin.y) < 20) {
                coin.collected = true;
                game.score += 10;
                provideMobileFeedback('coin');
            }
        });

        // Obstacle collision
        game.obstacles.forEach(obstacle => {
            if (player.x < obstacle.x + obstacle.width &&
                player.x + player.width > obstacle.x &&
                player.y < obstacle.y + obstacle.height &&
                player.y + player.height > obstacle.y) {
                // Reset player position
                provideMobileFeedback('obstacle');
                player.x = 50;
                player.y = 300;
                player.velocityY = 0;
            }
        });
    }

    function draw() {
        const scaleX = game.scale.x;
        const scaleY = game.scale.y;
        
        // Clear canvas
        ctx.fillStyle = 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw platforms
        ctx.fillStyle = '#8B4513';
        game.platforms.forEach(platform => {
            ctx.fillRect(
                platform.x * scaleX, 
                platform.y * scaleY, 
                platform.width * scaleX, 
                platform.height * scaleY
            );
        });

        // Draw player
        ctx.fillStyle = game.player.color;
        const playerX = game.player.x * scaleX;
        const playerY = game.player.y * scaleY;
        const playerW = game.player.width * scaleX;
        const playerH = game.player.height * scaleY;
        
        ctx.fillRect(playerX, playerY, playerW, playerH);

        // Draw eyes on player (scaled)
        ctx.fillStyle = 'white';
        ctx.fillRect(playerX + 5 * scaleX, playerY + 5 * scaleY, 6 * scaleX, 6 * scaleY);
        ctx.fillRect(playerX + 19 * scaleX, playerY + 5 * scaleY, 6 * scaleX, 6 * scaleY);
        ctx.fillStyle = 'black';
        ctx.fillRect(playerX + 7 * scaleX, playerY + 7 * scaleY, 2 * scaleX, 2 * scaleY);
        ctx.fillRect(playerX + 21 * scaleX, playerY + 7 * scaleY, 2 * scaleX, 2 * scaleY);

        // Draw coins
        ctx.fillStyle = '#FFD700';
        game.coins.forEach(coin => {
            if (!coin.collected) {
                ctx.beginPath();
                ctx.arc(coin.x * scaleX, coin.y * scaleY, 8 * Math.min(scaleX, scaleY), 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFA500';
                ctx.beginPath();
                ctx.arc(coin.x * scaleX, coin.y * scaleY, 4 * Math.min(scaleX, scaleY), 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFD700';
            }
        });

        // Draw obstacles
        ctx.fillStyle = '#FF4444';
        game.obstacles.forEach(obstacle => {
            ctx.fillRect(
                obstacle.x * scaleX, 
                obstacle.y * scaleY, 
                obstacle.width * scaleX, 
                obstacle.height * scaleY
            );
        });

        // Draw score (scaled font)
        ctx.fillStyle = '#333';
        ctx.font = `${Math.max(16, 20 * Math.min(scaleX, scaleY))}px Poppins, Arial`;
        ctx.fillText(`Score: ${game.score}`, 10 * scaleX, 30 * scaleY);

        // Draw instructions (scaled font)
        ctx.font = `${Math.max(12, 14 * Math.min(scaleX, scaleY))}px Poppins, Arial`;
        ctx.fillText('Collect coins! Avoid red obstacles!', 10 * scaleX, canvas.height - 10 * scaleY);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    // Start game loop
    gameLoop();        // Show celebratory message
        setTimeout(() => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(canvas.width/2 - 150 * game.scale.x, canvas.height/2 - 40 * game.scale.y, 300 * game.scale.x, 80 * game.scale.y);
            ctx.fillStyle = '#138808';
            ctx.font = `bold ${Math.max(16, 20 * Math.min(game.scale.x, game.scale.y))}px Poppins, Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('🎉 Easter Egg Found! 🎉', canvas.width/2, canvas.height/2 - 10 * game.scale.y);
            ctx.font = `${Math.max(14, 16 * Math.min(game.scale.x, game.scale.y))}px Poppins, Arial`;
            ctx.fillText('Enjoy the secret game!', canvas.width/2, canvas.height/2 + 15 * game.scale.y);
            if (window.innerWidth <= 768) {
                ctx.font = `${Math.max(12, 14 * Math.min(game.scale.x, game.scale.y))}px Poppins, Arial`;
                ctx.fillText('Tap canvas to jump!', canvas.width/2, canvas.height/2 + 35 * game.scale.y);
            }
            ctx.textAlign = 'left';
        }, 500);

    // Add touch gesture support for canvas
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const mobileControls = window.mobileControls || {};
        mobileControls.jump = true;
        setTimeout(() => {
            mobileControls.jump = false;
        }, 150);
    });
    
    // Prevent default touch behaviors on canvas
    canvas.addEventListener('touchmove', (e) => e.preventDefault());
    canvas.addEventListener('touchend', (e) => e.preventDefault());
    
    // Make canvas responsive
    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth - 40; // Account for padding
        const maxWidth = window.innerWidth <= 768 ? 400 : 800;
        const maxHeight = window.innerWidth <= 768 ? 200 : 400;
        
        canvas.width = Math.min(containerWidth, maxWidth);
        canvas.height = maxHeight * (canvas.width / maxWidth);
        
        // Scale game elements proportionally
        const scaleX = canvas.width / 800;
        const scaleY = canvas.height / 400;
        game.scale = { x: scaleX, y: scaleY };
    }
    
    // Initial resize and add event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Update game to use scaling
}

// Simple sound effects using Web Audio API
function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800 + (clickCount * 200);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Audio not supported, silent fallback
    }
}

function playEasterEggSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Play a celebratory melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
        let noteIndex = 0;
        
        function playNote() {
            if (noteIndex < notes.length) {
                oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
                noteIndex++;
                setTimeout(playNote, 150);
            }
        }
        
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        playNote();
    } catch (e) {
        // Audio not supported, silent fallback
    }
}

function setupMobileControls() {
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    
    if (!leftBtn || !rightBtn || !jumpBtn) return;
    
    // Touch/click events for mobile controls
    let touchControls = {
        left: false,
        right: false,
        jump: false
    };
    
    // Left button
    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchControls.left = true;
        leftBtn.style.background = '#0a4a04';
    });
    
    leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchControls.left = false;
        leftBtn.style.background = '#138808';
    });
    
    leftBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        touchControls.left = true;
        leftBtn.style.background = '#0a4a04';
    });
    
    leftBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        touchControls.left = false;
        leftBtn.style.background = '#138808';
    });
    
    // Right button
    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchControls.right = true;
        rightBtn.style.background = '#0a4a04';
    });
    
    rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchControls.right = false;
        rightBtn.style.background = '#138808';
    });
    
    rightBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        touchControls.right = true;
        rightBtn.style.background = '#0a4a04';
    });
    
    rightBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        touchControls.right = false;
        rightBtn.style.background = '#138808';
    });
    
    // Jump button
    jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchControls.jump = true;
        jumpBtn.style.background = '#cc7019';
    });
    
    jumpBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchControls.jump = false;
        jumpBtn.style.background = '#FF9933';
    });
    
    jumpBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        touchControls.jump = true;
        jumpBtn.style.background = '#cc7019';
    });
    
    jumpBtn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        touchControls.jump = false;
        jumpBtn.style.background = '#FF9933';
    });
    
    // Prevent context menu on long press
    [leftBtn, rightBtn, jumpBtn].forEach(btn => {
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
    });
    
    // Make touch controls available globally for the game
    window.mobileControls = touchControls;
}

// Mobile haptic feedback
function vibrate(duration = 50) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Enhanced mobile control feedback
function provideMobileFeedback(action) {
    switch(action) {
        case 'jump':
            vibrate(30);
            break;
        case 'coin':
            vibrate([20, 10, 20]);
            break;
        case 'obstacle':
            vibrate([100, 50, 100]);
            break;
        case 'move':
            vibrate(10);
            break;
    }
}

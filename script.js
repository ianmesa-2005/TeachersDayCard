let isOpen = false;
const envelopeFlap = document.getElementById('envelopeFlap');
const letter = document.getElementById('letter');
const clickHint = document.getElementById('clickHint');
const backgroundMusic = document.getElementById('backgroundMusic'); // Music element

function toggleEnvelope() {
    if (!isOpen) {
        openEnvelope();
    } else {
        closeEnvelope();
    }
}

function openEnvelope() {
    isOpen = true;
    envelopeFlap.classList.add('open');

    setTimeout(() => {
        letter.classList.add('visible');
        clickHint.textContent = 'Click to close the envelope';

        // Start or resume music
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));

        // Add subtle animation feedback
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = 'subtle-pulse 4s ease-in-out infinite';
        }, 10);
    }, 400);
}

function closeEnvelope() {
    isOpen = false;
    letter.classList.remove('visible');

    setTimeout(() => {
        envelopeFlap.classList.remove('open');
        clickHint.textContent = 'Click to open the envelope ✨';

        // Pause music (resume from same spot when reopened)
        backgroundMusic.pause();

        // Remove animation feedback
        document.body.style.animation = 'none';
    }, 300);
}

// Add subtle pulse animation style for music feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes subtle-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.05); }
    }
`;
document.head.appendChild(style);

// Sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// Sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// Sparkles on envelope click
document.querySelector('.envelope-container').addEventListener('click', function(e) {
    if (e.target.closest('.photo-frame')) return; // ignore clicks directly on the photo

    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                rect.left + x + (Math.random() - 0.5) * 50,
                rect.top + y + (Math.random() - 0.5) * 50
            );
        }, i * 100);
    }
});
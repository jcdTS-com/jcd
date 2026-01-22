function createSparkle(x, y, angle, delay) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✏️'; //❄️
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    // Add random rotation
    sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
    // Add delay for staggered animation
    sparkle.style.animationDelay = `${delay}s`;
    // Add custom direction using CSS variables
    sparkle.style.setProperty('--angle', `${angle}deg`);
    document.body.appendChild(sparkle);
    
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}

function createMultipleSparkles(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Calculate center point of the button
    const centerX = rect.left + rect.width / 2 + scrollX;
    const centerY = rect.top + rect.height / 2 + scrollY;
    
    // Create sparkles in a circular pattern
    const numSparkles = 6; // Reduced number of sparkles
    for (let i = 0; i < numSparkles; i++) {
        const angle = (i * 360) / numSparkles;
        createSparkle(centerX, centerY, angle, 0); // No delay
    }
    
    // Add just a couple random sparkles for extra effect
    for (let i = 0; i < 2; i++) {
        const randomAngle = Math.random() * 360;
        createSparkle(centerX, centerY, randomAngle, 0); // No delay
    }
}

async function copyAndOpenStore(code, url) {
    try {
        // Copy the discount code to clipboard
        await navigator.clipboard.writeText(code);
        showCopyPopup(code);
        
        // Wait a moment so user sees the popup, then open the store
        setTimeout(() => {
            window.open(url, '_blank');
        }, 1000);
    } catch (err) {
        console.error('Failed to copy code: ', err);
        // Still open the website even if copy fails
        window.open(url, '_blank');
    }
}

function showCopyPopup(code) {
    // Remove any existing popup
    const existingPopup = document.querySelector('.copy-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create new popup
    const popup = document.createElement('div');
    popup.className = 'copy-popup';
    popup.textContent = `✔ Code Copied: ${code}`;
    document.body.appendChild(popup);
    
    // Force a reflow before adding the show class
    void popup.offsetWidth;
    popup.classList.add('show');
    
    // Remove the popup after animation completes
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
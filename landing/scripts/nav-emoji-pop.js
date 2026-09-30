function createEmojiPop(e, emoji, sectionId) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate center point of the button relative to the viewport
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create the emoji element
    const emojiElement = document.createElement('div');
    emojiElement.className = 'nav-emoji-pop';
    emojiElement.textContent = emoji;
    emojiElement.style.left = centerX + 'px';
    emojiElement.style.top = centerY + 'px';
    
    document.body.appendChild(emojiElement);
    
    // Remove the element after animation completes
    emojiElement.addEventListener('animationend', () => {
        emojiElement.remove();
    });
    
    // Blow away snow based on scroll distance
    blowAwaySnow(button, sectionId);
}

// Remove scroll tracking - we'll determine direction from target position instead
function blowAwaySnow(button, targetSectionId) {
    const pile = document.getElementById('snow-pile');
    if (!pile) return;
    
    const flakes = pile.querySelectorAll('.snow-pile-flake');
    if (flakes.length === 0) return;
    
    // Get current scroll position
    const currentScrollY = window.scrollY || window.pageYOffset;
    
    // Get target element position
    const targetElement = document.getElementById(targetSectionId);
    if (!targetElement) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    const targetScrollY = currentScrollY + targetRect.top;
    
    // Determine scroll direction based on target vs current position
    let scrollDirection = 0;
    if (targetScrollY > currentScrollY) {
        scrollDirection = 1; // Going down
    } else if (targetScrollY < currentScrollY) {
        scrollDirection = -1; // Going up
    }
    
    // If target is close to current view, don't blow away snow
    if (Math.abs(targetScrollY - currentScrollY) < 50) return;
    
    // Calculate distance to determine wind intensity
    const distanceFromViewport = Math.abs(targetScrollY - currentScrollY);
    const maxDistance = document.documentElement.scrollHeight;
    const windIntensity = Math.min(distanceFromViewport / (maxDistance / 2), 1.0) * 0.8 + 0.2;
    
    // Number of flakes to blow away
    const flakesToBlow = Math.ceil(flakes.length * windIntensity);
    
    // Blow away random flakes
    const indicesToBlow = new Set();
    while (indicesToBlow.size < flakesToBlow && indicesToBlow.size < flakes.length) {
        indicesToBlow.add(Math.floor(Math.random() * flakes.length));
    }
    
    indicesToBlow.forEach(index => {
        const flake = flakes[index];
        const flakeRect = flake.getBoundingClientRect();
        const flakeCenterX = flakeRect.left + flakeRect.width / 2;
        
        // Determine horizontal wind direction based on flake position
        const blowLeft = flakeCenterX < window.innerWidth / 2;
        const windDirection = blowLeft ? -1 : 1;
        
        // Random horizontal angle for natural movement - more pronounced
        const angleVariation = (Math.random() - 0.5) * 180; // -90 to +90 degrees
        const radians = (angleVariation * Math.PI) / 180;
        
        // Calculate horizontal blow distance
        const blowDistance = 300 + windIntensity * 500;
        const translationX = windDirection * blowDistance * Math.cos(radians);
        
        // Vertical movement based on scroll direction
        let translationY;
        if (scrollDirection === 1) {
            // Going down - blow upward
            translationY = -(100 + Math.random() * 150);
        } else if (scrollDirection === -1) {
            // Going up - blow downward
            translationY = 100 + Math.random() * 150;
        } else {
            translationY = 0;
        }
        
        // Random spin amount
        const spins = 2 + Math.random() * 3;
        const totalRotation = 360 * spins + (Math.random() - 0.5) * 100;
        
        // Animate the blow effect
        flake.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        flake.style.transform = `translate(${translationX}px, ${translationY}px) rotate(${totalRotation}deg)`;
        flake.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            flake.remove();
        }, 1500);
    });
}

// Update the scrollToSection function to include emoji pop
const originalScrollToSection = window.scrollToSection;
window.scrollToSection = function(sectionId) {
    // Get the button that was clicked
    const button = event.currentTarget;
    // Get just the emoji character (it's the first character before the span)
    const emoji = button.childNodes[0].textContent.trim();
    // Get current scroll position before scrolling
    const scrollBefore = window.scrollY || window.pageYOffset;
    // Create the emoji pop effect with sectionId
    createEmojiPop(event, emoji, sectionId);
    // Call the original scroll function
    if (typeof originalScrollToSection === 'function') {
        originalScrollToSection(sectionId);
    } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    // After scroll, check if position actually changed significantly
    setTimeout(() => {
        const scrollAfter = window.scrollY || window.pageYOffset;
        if (Math.abs(scrollAfter - scrollBefore) < 50) {
            // Page didn't scroll enough, no snow blow
            return;
        }
    }, 100);
};
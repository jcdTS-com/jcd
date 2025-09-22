function createEmojiPop(e, emoji) {
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
}

// Update the scrollToSection function to include emoji pop
const originalScrollToSection = window.scrollToSection;
window.scrollToSection = function(sectionId) {
    // Get the button that was clicked
    const button = event.currentTarget;
    // Get just the emoji character (it's the first character before the span)
    const emoji = button.childNodes[0].textContent.trim();
    // Create the emoji pop effect
    createEmojiPop(event, emoji);
    // Call the original scroll function
    if (typeof originalScrollToSection === 'function') {
        originalScrollToSection(sectionId);
    } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
};
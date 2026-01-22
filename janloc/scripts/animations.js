function goBack() {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('slide-from-top');
    
    setTimeout(() => {
        window.location.href = '../';
    }, 800);
}

// Add click handlers for ALL devices (not just touch-only)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        // Only toggle on touch devices
        if (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches) {
            this.classList.toggle('active');
        }
    });
});
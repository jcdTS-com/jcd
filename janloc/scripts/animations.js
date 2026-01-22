function goBack() {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('slide-from-top');
    
    setTimeout(() => {
        window.location.href = '../';
    }, 800);
}

// Add click handlers for ALL devices (not just touch-only)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        // Only apply on touch devices
        if (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches) {

            const isAlreadyActive = this.classList.contains('active');

            // Remove active from all cards
            document.querySelectorAll('.card.active').forEach(activeCard => {
                activeCard.classList.remove('active');
            });

            // If this wasn't active before, activate it
            if (!isAlreadyActive) {
                this.classList.add('active');
            }
        }
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.card')) {
        document.querySelectorAll('.card.active').forEach(card => {
            card.classList.remove('active');
        });
    }
});

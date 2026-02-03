function toggleCards() {
    const mainCards = document.getElementById('main-cards');
    const affiliateCards = document.getElementById('affiliate-cards');
    const btn = document.getElementById('toggleBtn');

    if (mainCards.classList.contains('hidden')) {
        // Show main, hide affiliates
        mainCards.classList.remove('hidden');
        mainCards.classList.add('slide-in');
        affiliateCards.classList.add('hidden');
        affiliateCards.classList.remove('slide-in');
        btn.textContent = 'Affiliates';
    } else {
        // Show affiliates, hide main
        affiliateCards.classList.remove('hidden');
        affiliateCards.classList.add('slide-in');
        mainCards.classList.add('hidden');
        mainCards.classList.remove('slide-in');
        btn.textContent = 'Main';
    }
}

document.querySelectorAll('.tutorial-card, .janloc-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const overlay = document.getElementById('transition-overlay');
        
        const bgColor = window.getComputedStyle(this).backgroundColor || 'rgb(164, 216, 216)';
        overlay.style.backgroundColor = bgColor;
        
        if (this.classList.contains('tutorial-card')) {
            overlay.classList.add('slide-from-left');
        } else if (this.classList.contains('janloc-card')) {
            overlay.classList.add('slide-from-right');
        }
        
        setTimeout(() => {
            window.location.href = href;
        }, 800);
    });
});
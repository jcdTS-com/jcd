function toggleCards() {
    const mainCards = document.getElementById('main-cards');
    const affiliateCards = document.getElementById('affiliate-cards');
    const mainCard = mainCards.querySelector('.tutorial-card');
    const affiliateCard = affiliateCards.querySelector('.janloc-card');
    const btn = document.getElementById('toggleBtn');

    if (mainCards.classList.contains('hidden')) {
        // Fade out the affiliate card
        affiliateCard.classList.add('fade-out');
        
        setTimeout(() => {
            affiliateCards.classList.add('hidden');
            affiliateCard.classList.remove('fade-out');
            
            // Slide in main
            mainCards.classList.remove('hidden');
            mainCards.classList.add('slide-in');
            btn.textContent = 'Affiliates';
            
            setTimeout(() => {
                mainCards.classList.remove('slide-in');
            }, 500);
        }, 300);
        
    } else {
        // Fade out the main card
        mainCard.classList.add('fade-out');
        
        setTimeout(() => {
            mainCards.classList.add('hidden');
            mainCard.classList.remove('fade-out');
            
            // Slide in affiliates
            affiliateCards.classList.remove('hidden');
            affiliateCards.classList.add('slide-in');
            btn.textContent = 'Main';
            
            setTimeout(() => {
                affiliateCards.classList.remove('slide-in');
            }, 500);
        }, 300);
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
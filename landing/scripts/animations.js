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
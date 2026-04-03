// Detect if user navigated via back button
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (back button)
        window.location.reload();
    }
});

function goBack() {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('slide-from-top');
    
    setTimeout(() => {
        window.location.href = '../';
    }, 800);
}
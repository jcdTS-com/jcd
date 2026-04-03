// Handle browser back button
window.addEventListener('popstate', () => {
  goBack();
});

// Handle mobile back button (Android)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace' && event.target === document.body) {
    goBack();
  }
});

// Fallback for older Android devices
document.addEventListener('backbutton', () => {
  goBack();
});

function goBack() {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('slide-from-top');

    setTimeout(() => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../';
        }
    }, 800);
}

// function goBack() {
//     const overlay = document.getElementById('transition-overlay');
//     overlay.classList.add('slide-from-top');
    
//     setTimeout(() => {
//         window.location.href = '../';
//     }, 800);
// }
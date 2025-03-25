function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        if(text.includes('@')) {
            alert('Email address copied to clipboard!');
        } else {
            alert('Phone number copied to clipboard!');
        }
    }).catch(err => {
        alert('Failed to copy to clipboard');
        console.error('Failed to copy:', err);
    });
}

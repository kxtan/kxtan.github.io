document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.cursor-glow');
        cursor.style.transform = 'scale(2)';
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.cursor-glow');
        cursor.style.transform = 'scale(1)';
    });
});

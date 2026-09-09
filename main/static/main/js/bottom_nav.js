const sections = document.querySelectorAll('#header, #services, #our-work');
const navItems = document.querySelectorAll('.bottom-nav .nav-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            navItems.forEach(item => {
                item.classList.remove('active');
            });

            const activeItem = document.querySelector(
                `.bottom-nav a[href="#${entry.target.id}"]`
            );

            if (activeItem) {
                activeItem.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    observer.observe(section);
});
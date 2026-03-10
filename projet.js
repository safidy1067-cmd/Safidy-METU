
    const sklillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                },100);
            }
        });
    },{threshold: 0.5});

    sklillBars.forEach(bar => {
        observer.observe(bar);
    });

    var toggle_menu = document.querySelector('.responsive-menu');
    var menu = document.querySelector('.menu');
    toggle_menu.onclick= function(){
        toggle_menu.classList.toggle('active');
        menu.classList.toggle('responsive')

    const sklillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                },100);
            }
        });
    },{threshold: 0.5});

    sklillBars.forEach(bar => {
        observer.observe(bar);
    });

    var toggle_menu = document.querySelector('.responsive-menu');
    var menu = document.querySelector('.menu');
    toggle_menu.onclick= function(){
        toggle_menu.classList.toggle('active');
        menu.classList.toggle('responsive')
    }
    }
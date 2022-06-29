// venobox
$(document).ready(function() {
    $('.venobox').venobox({
        framewidth: '700px',
    });
});

//Pagepiling
$(document).ready(function() {
    $('#pagepiling').pagepiling({
        menu: 'my-menu',
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: [],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
            'textColor': '#4070f486',
            'bulletsColor': 'var(--bs-primary)',
            'position': 'right',
            'tooltips': ['Home', 'About', 'Services', 'Portfolio', 'Blogs', 'Contact']
        },
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

        //events
        onLeave: function(index, nextIndex, direction) {},
        afterLoad: function(anchorLink, index) {},
        afterRender: function() {},
    });
});


// Click menu-btn to show side-navbar and color switcher
let menu_btn = document.querySelector('.menu-btn');
let navbar = document.querySelector('nav');
let menu_icon = document.querySelectorAll('.menu-btn span');

menu_btn.addEventListener('click', () => {

    // console.log(menu_icon);

    // show navbar
    if (navbar.classList.contains('d-none')) {

        //change menu-icon
        menu_icon.forEach(el => {
            el.classList.add('active-menu');
        })

        //Update 28/7/22
        navbar.classList.remove('animate__fadeOutLeft');

        //show navbar
        navbar.classList.add('d-block');
        navbar.classList.add('animate__fadeInLeft');
        navbar.classList.remove('d-none');

        //show color-switcher
        color_switcher.classList.add('d-block');
        color_switcher.classList.remove('animate__fadeOutLeft');
        color_switcher.classList.add('animate__fadeInLeft');
        color_switcher.classList.remove('d-none');
    } else {

        //change menu-icon
        menu_icon.forEach(el => {
            el.classList.remove('active-menu');
        })

        //Update 28/7/22
        navbar.classList.remove('animate__fadeInLeft');

        //hide navbar
        navbar.classList.add('animate__fadeOutLeft');
        //hide color-switcher
        color_switcher.classList.remove('animate__fadeInLeft');
        color_switcher.classList.add('animate__fadeOutLeft');
        //wait animation before hide
        setTimeout(() => {
            navbar.classList.add('d-none');
            color_switcher.classList.add('d-none');
        }, 500);
        navbar.classList.remove('d-block');
        color_switcher.classList.remove('d-block');
    }
})


//loadmore buttons .....
// get all rows of blogs 
let container = [...document.querySelectorAll('.more-blog')];
let page_count = container.length;
let current_page_count = container.length;

document.querySelector('#loadmore').addEventListener('click', () => {
    if (page_count > 0) {
        for (let index = 1; index <= page_count; index++) {
            container[index - 1].classList.remove('d-none');
        }
        document.querySelector('#loadmore').innerText = 'Show Less';
        page_count = 0;
    } else if (page_count == 0) {
        for (let index = current_page_count; index > 0; index--) {
            container[index - 1].classList.add('d-none');
        }
        document.querySelector('#loadmore').innerText = 'Load More';
        page_count = parseInt(current_page_count);
    }
})


//color switcher
let color_switcher = document.querySelector('.color-switcher-box'),
    colors_icons_box = document.querySelector('.colors-icons-box');;
let color_list = document.querySelectorAll('.color-switchers ul li');
let text_primary = document.querySelectorAll('.text-primary');

// show and hide color switcher when navicon click
color_switcher.addEventListener('click', () => {
    colors_icons_box.classList.toggle('d-none');
    colors_icons_box.classList.toggle('d-block');
})

color_list.forEach(el => {
    el.addEventListener('click', el => {
        // get element target to archive elemens attributes
        let target = el.target;
        // console.log(el.target);

        //remove boxshadow active icons , set boxshadow colors in clicked color icon
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');

        //get primary color in root , attributes in color switcher icons
        let root = document.querySelector(':root'),
            data_color = target.getAttribute('data-color');
        // console.log(data_color);

        root.style.setProperty('--bs-primary', data_color);
    });
})


//dark - light toggler
let icon = document.querySelector('.light-dark i');
let body = document.body;

let section_containers = document.querySelectorAll('.section');
let nav_icons = document.querySelector('nav ul');
let icons_list = document.querySelectorAll('nav ul li');

let text_black = document.querySelectorAll('.text-black');
let cards = document.querySelectorAll('.card');

let serviecs_cards = document.querySelectorAll('.services .row .col-12 .card');

document.querySelector('.light-dark').addEventListener('click', () => {
    // console.log('hello');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    nav_icons.classList.toggle('bg-white');
    nav_icons.classList.toggle('bg-black');

    //change text color in both light and dark mode
    text_black.forEach(el => {
        if (el.classList.contains('text-black')) {

            el.classList.toggle('text-white');
            el.classList.toggle('text-black');
        }
        el.classList.toggle('text-black');
    })

    //change entire icons list background color 
    icons_list.forEach(el => {
        el.classList.toggle('bg-white');
        el.classList.toggle('bg-black');
    })

    //change color switcher icons colors in both dark mode and light mode
    if (icon.classList.contains('fa-sun')) {
        section_containers.forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-black');
            color_switcher.classList.remove('bg-white');
            color_switcher.classList.add('bg-black');
            body.style.background = '#242526';
        })
    } else {
        section_containers.forEach(el => {
            el.classList.add('bg-white');
            el.classList.remove('bg-black');
            color_switcher.classList.add('bg-white');
            color_switcher.classList.remove('bg-black');
            body.style.background = 'white';
        })
    }

    //change primary color in dark mode
    serviecs_cards.forEach(el => {
        el.classList.toggle('text-black-50');
        el.classList.toggle('text-primary');
    })

    //change text to white color in dark mode
    cards.forEach(el => {
        el.classList.toggle('bg-black-50');
        if (el.classList.contains('text-black')) {
            el.classList.remove('text-white');
            el.classList.add('text-black');
        } else {
            el.classList.add('text-white');
            el.classList.remove('text-black');
        }
    })

})
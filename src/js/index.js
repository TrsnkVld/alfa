import 'core-js';

import smoothscroll from 'smoothscroll-polyfill';
import Swiper, { Pagination } from 'swiper';

// CSS
import 'reset-css';
import 'swiper/swiper-bundle.css';
import '../scss/main.scss';
////////////

smoothscroll.polyfill();

Swiper.use([Pagination]);

const mySwiper = new Swiper('.swiper-container', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 50,
    grabCursor: true,
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        992: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
    },
})



let parent = document.getElementsByClassName('card-text-wrap')[0],
    items = parent.children,
    loadMoreBtn = document.getElementById('load-more-cards'),
    maxItems = 4,
    hiddenClass = "d-none";

[].forEach.call(items, function (item, idx) {
    if (idx > maxItems - 1) {
        item.classList.add(hiddenClass);
    }
});

if (items.length < 5) {
    loadMoreBtn.classList.add('d-none')
}

loadMoreBtn.addEventListener('click', function () {

    [].forEach.call(document.getElementsByClassName(hiddenClass), function (item, idx) {
        if (idx < maxItems + 1) {
            item.classList.remove(hiddenClass);
        }

        if (document.getElementsByClassName(hiddenClass).length === 0) {
            loadMoreBtn.classList.add(hiddenClass);
        }

    });

});

document.getElementsByClassName('special-header__close')[0].addEventListener('click', function () {
    document.getElementsByClassName('special-header')[0].classList.remove('visible');
});
/*
document.getElementsByClassName('show-special')[0].addEventListener('click', function () {
    document.getElementsByClassName('special-header')[0].classList.add('visible');
});
*/

let scrollToTopBtn = document.getElementById("scroll-to-top-btn")
let rootElement = document.documentElement

function handleScroll() {
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if (!(rootElement.scrollTop > 1500) || ((rootElement.scrollTop / scrollTotal) >= 1)) {
        scrollToTopBtn.classList.remove('visible');
    } else {
        scrollToTopBtn.classList.add('visible');
    }
}

function scrollToTop() {
    //scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

function scrollToSpecial() {
    document.getElementsByClassName('section--special')[0].scrollIntoView({ behavior: "smooth" });
    document.getElementsByClassName('special-header')[0].classList.remove('visible');
}

document.getElementsByClassName('show-special')[0].addEventListener("click", scrollToSpecial);

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

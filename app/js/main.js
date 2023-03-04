"use strict"


document.addEventListener('DOMContentLoaded', function() {

	// PRELOADER

	window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }

// Переход по клику меню

	// $('a[href^="#"]').click(function() {
	// 	let offset = $('.sticky-menu').innerHeight();
	// 	let target = $(this).attr('href');
	// 	$('html').animate({
	// 		scrollTop: $(target).offset().top - offset
	// 	}, );
	// 	return false;
	// });



// Липкое меню
// Когда пользователь прокручивает страницу, выполните myFunction
window.onscroll = function() {myStickyMenu()};

// Получить навигатор
let stickyMenu = document.getElementById("sticky-menu");

// Получить смещение позиции навигационной панели
// let sticky = stickyMenu.offsetTop;

// Добавить класс sticky к навигационной панели, когда вы достигнете ее положения прокрутки. Удалите "sticky", когда вы покидаете положение прокрутки
function myStickyMenu() {
	if (window.pageYOffset >= 400) {
		stickyMenu.classList.add("sticky")
	} else {
		stickyMenu.classList.remove("sticky");
	}
}


// Изменение активного класса в меню
const observer = new IntersectionObserver((entries) =>{
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			document.querySelectorAll('.nav__link').forEach((link) => {
				// link.classList.toggle(
				// 	'active',
				// 	link.getAttribute('href').replace('#', '') === entry.target.id
				// );
				link.getAttribute('href').replace('#', '');
				if (link.getAttribute('href').replace('#', '') === entry.target.id) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			});

		}
	});
}, {
	threshold: 0.7,
});

document.querySelectorAll('header, section').forEach(( header, section) => 
	observer.observe(header, section),
);

// Переход по клику в меню

document.querySelector('.nav__list').addEventListener('click', (event) => {
	if (event.target.classList.contains('nav__link')) {
		event.preventDefault();

		const id = event.target.getAttribute('href').replace('#', '');
		window.scrollTo({
			top: document.getElementById(id).offsetTop - document.getElementById('sticky-menu').clientHeight,
			behavior: 'smooth',
		})
	}
});

document.querySelector('.nav-footer__list').addEventListener('click', (eventFooter) => {
	if (eventFooter.target.classList.contains('nav-footer__link')) {
		eventFooter.preventDefault();

		const id = eventFooter.target.getAttribute('href').replace('#', '');
		window.scrollTo({
			top: document.getElementById(id).offsetTop - document.getElementById('sticky-menu').clientHeight,
			behavior: 'smooth',
		})
	}
});



// PARALLAX

const scene = document.getElementById('scene');
const parallaxInstance = new Parallax(scene);

const scene2 = document.getElementById('scene2');
const parallaxInstance2 = new Parallax(scene2);

const scene3 = document.getElementById('scene3');
const parallaxInstance3 = new Parallax(scene3);

const scene4 = document.getElementById('scene4');
const parallaxInstance4 = new Parallax(scene4);

// SLIDERS
$(document).ready(function(){
	$('.slider-portfolio').slick({
		arrows: false,
		dots: true,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
				slidesToShow: 1,
				}
			}
		]
	});

	$('.slider-reviews').slick({
		slidesToShow: 1,
		infinite: true,
		speed: 500,
		autoplay: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				}
			}
		]
	});
})

// BURGER MENU
const btnOpen = document.getElementById('menu-burger__image');
const modal = document.getElementById('modal-menu');
const overlay = document.getElementById('overlay');
const homeMenu = document.getElementById('home-menu');
const aboutMenu = document.getElementById('about-menu');
const portfolioMenu = document.getElementById('portfolio-menu');
const schemeMenu = document.getElementById('scheme-menu');
const technologyMenu = document.getElementById('technology-menu');
const contactsMenu = document.getElementById('contacts-menu');

btnOpen.addEventListener('click', () => {
	overlay.classList.remove('d-none');
	modal.classList.remove('d-none');
})

const closeModal = () => {
	overlay.classList.add('d-none');
	modal.classList.add('d-none');
}

overlay.addEventListener('click', closeModal);
homeMenu.addEventListener('click', closeModal);
aboutMenu.addEventListener('click', closeModal);
portfolioMenu.addEventListener('click', closeModal);
schemeMenu.addEventListener('click', closeModal);
technologyMenu.addEventListener('click', closeModal);
contactsMenu.addEventListener('click', closeModal);


// FORM

// InputMask

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+38 (999) 999-99-99');
im.mask(inputs);

// Validate


function validateForm(selector, rules) {
	new window.JustValidate(selector, {
		 rules: rules,
		 submitHandler: function (form, values, ajax) {
			  console.log(form);

			  let formData = new FormData(form);

			  fetch("../mail.php", {
					method: "POST",
					body: formData
			  })
			  .then(function(data) {
					console.log(data);
					console.log('Отправлено');
					form.reset();
			  });
		 }
	});
}

validateForm('.contacts-box__form', {
	name: {
		required: true
	},
	email: {
		required: true,
		email: true
	},
	tel: {
		required: true
	}
});


});


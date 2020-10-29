(function ($) {
    'use strict'
    $(window).on('load resize', function () {
      // text box
        function textBox() {
            const textBox = $('.text-box')
            if (!textBox.length) return
            textBox.each(function () {
                const $this = $(this)
                const eachHeight = parseInt($this.find('.text-box__text').css('height'))
                const slideBlock = $this.find('.text-box__details')
                slideBlock.css({ 'transform': 'translateY(' + eachHeight + 'px)' })
            })
        }
        textBox()
    })
    $(window).on('scroll', function () {
        // header front-1
        function headerFrontOne() {
            const header = $('.header-common')
            if (!header.length) return
            const lower = $('.header-common .header__lower')
            const scroll = $(window).scrollTop()
            if (scroll >= 1) {
                lower.addClass('header__lower--fixed')
            }
            else {
                lower.removeClass('header__lower--fixed')
            }
        }
        headerFrontOne()
        // header front-2
        function headerFrontTwo() {
            const header = $('.header-f2')
            if (!header.length) return
            const topSize = parseInt(header.find('.header__lower').css('height'))
            const lower = $('.header-f2 .header__top')
            const scroll = $(window).scrollTop()
            if (scroll >= 1) {
                header.css({ 'transform': 'translate(-50%, -' + topSize + 'px)' })
                lower.addClass('lower--fixed')
            }
            else {
                header.css({ 'transform': 'translate(-50%, -' + 0 + 'px)' })
                lower.removeClass('lower--fixed')
            }
        }
        headerFrontTwo()
        // header front-3
        function headerFrontThree() {
            const header = $('.header-f3')
            if (!header.length) return
            const topSize = parseInt(header.find('.header__lower').css('height'))
            const lower = $('.header-f3 .header__top')
            const scroll = $(window).scrollTop()
            if (scroll >= 1) {
                header.css({ 'transform': 'translate(-50%, -' + topSize + 'px)' })
                lower.addClass('lower--fixed')
            }
            else {
                header.css({ 'transform': 'translate(-50%, -' + 0 + 'px)' })
                lower.removeClass('lower--fixed')
            }
        }
        headerFrontThree()
        // header intro
        function headerIntro() {
            const header = $('.header-intro')
            if (!header.length) return
            const scroll = $(window).scrollTop()
            if (scroll >= 1) {
                header.addClass('header--fixed')
            }
            else {
                header.removeClass('header--fixed')
            }
        }
        headerIntro()
    })
    $(document).ready(function () {
        // object fit
        objectFitImages()
        // menu trigger
        function menuTrigger() {
            const trigger = $('.hamburger')
            if (!trigger.length) return
            $('.hamburger').on('click', function () {
                $('body').toggleClass('body--static')
                $('.menu-dropdown').toggleClass('menu-dropdown--active')
            })
        }
        menuTrigger()
        // mobile menu
        function mobileMenu() {
            $('.screen--trigger').on('click', function () {
                const triggerValue = $(this).data('category')
                $('.screen--start').addClass('screen--inactive')
                $('.menu-dropdown__inner').each(function () {
                    if ($(this).data('value') === triggerValue) {
                        $(this).addClass('menu-dropdown__inner--active')
                    }
                })
            })
            $('.screen__back').on('click', function () {
                $('.menu-dropdown__inner').removeClass('menu-dropdown__inner--active')
                $('.screen--start').removeClass('screen--inactive')
            })
            $('.screen__link').on('click', function () {
                $('body').removeClass('body--static')
                $('.menu-dropdown').removeClass('menu-dropdown--active')
            })
            $('.aside-menu .main-menu__item .main-menu__link').on('click', function () {
                $('body').removeClass('body--static')
                $('.menu-dropdown').removeClass('menu-dropdown--active')
            })
        }
        mobileMenu()
        // scroll to id
        function scrollToId() {
            var scroll = $('a.main-menu__link--scroll')
            if (!scroll.length) return
            scroll.mPageScroll2id({
                highlightClass: 'main-menu__link--highlighted',
            })
        }
        scrollToId()
        // header bar
        $(window).on('scroll', function () {
            const lower = $('.header-common .header__lower')
            const scroll = $(window).scrollTop()
            if (scroll >= 1) {
                lower.addClass('header__lower--fixed')
            }
            else {
                lower.removeClass('header__lower--fixed')
            }
        })
        // alert close
        $('.alert__close').on('click', function () {
            $(this).parent('.alert').fadeOut(300)
        })
        // scroll to id
        function scrollTo() {
            const scrollTo = $('a.anchor[href^="#"]')
            if (!scrollTo.length) return
            scrollTo.on("click", function (e) {
                const anchor = $(this)
                $('html, body').stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top
                }, 600)
                e.preventDefault()
            })
        }
        scrollTo()
        // accordion
        function accordion() {
            const accordion = $('.accordion')
            if (!accordion.length) return
            const close = $('.accordion .accordion__close')
            close.on('click', function () {
                $(this).toggleClass('accordion__close--active').parents().children('.accordion__text-block').stop().slideToggle(300)
            })
        }
        accordion()
        // counter
        function counter() {
            const counter = $('.js-counter')
            if (!counter.length) return
            counter.counterUp({
                delay: 10,
                time: 800,
            })
        }
        counter()

        // tabs
        function tabs() {
            const tabs = $('.tabs')
            if (!tabs.length) return
            tabs.responsiveTabs({
                startCollapsed: 'false',
            })
        }
        tabs()
        // video trigger
        function videoTrigger() {
            const trigger = $('.video-trigger')
            if (!trigger.length) return
            trigger.fancybox()
        }
        videoTrigger()
        // video trigger
        function photoTrigger() {
            const trigger = $('.photo-trigger')
            if (!trigger.length) return
            trigger.fancybox()
        }
        photoTrigger()
        // masonry gallery
        function masonryGallery() {
            const masonryGallery = $('.gallery-masonry')
            if (!masonryGallery.length) return
            masonryGallery.isotope({
                itemSelector: '.gal-item',
                percentPosition: true,
            })
            const filter = $('.filter-panel__item')
            filter.on('click', function () {
                const filterValue = $(this).attr('data-filter')
                masonryGallery.isotope({
                    filter: filterValue,
                })
            })
            filter.on('click', function () {
                filter.removeClass('filter-panel__item--active')
                $(this).addClass('filter-panel__item--active')
            })
        }
        masonryGallery()

        // nice select
        function select() {
            const select = $('.form__select')
            if (!select.length) return
            select.niceSelect()
        }
        select()
        // SLIDERS
        // promo slider
        function promoSlider() {
            const slider = $('.promo-slider')
            if (!slider.length) return
            const status = $('.promo-slider__count')
            $('.promo-slider--style-2').on('init afterChange', function (event, slick, currentSlide, nextSlide) {
                let i = (currentSlide ? currentSlide : 0) + 1
                status.text(i + '/' + slick.slideCount)
            })
            slider.slick({
                adaptiveHeight: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 6000,
                speed: 1200,
                arrows: false,
                dots: true,
                appendDots: $('.promo-slider__nav'),
            })
        }
        promoSlider()
        // testimonials-1
        function testimonialsSlider() {
            const testimonials = $('.testimonials-slider')
            if (!testimonials.length) return
            const testimonialsOne = $('.testimonials-slider--style-1')
            testimonialsOne.slick({
                arrows: false,
                dots: true,
                appendDots: $('.testimonials--style-1__dots'),
                adaptiveHeight: true,
            })
            const testimonialsTwo = $('.testimonials-slider--style-2')
            testimonialsTwo.slick({
                arrows: false,
                dots: true,
                fade: true,
                appendDots: $('.testimonials--style-2__dots'),
                adaptiveHeight: true,
            })
            const testimonialsThree = $('.testimonials-slider--style-3')
            testimonialsThree.slick({
                arrows: false,
                dots: true,
                fade: true,
                appendDots: $('.testimonials--style-3__dots'),
                adaptiveHeight: true,
            })
        }
        testimonialsSlider()
        // logos slider
        function logosSlider() {
            const slider = $('.logos-slider')
            if (!slider.length) return
            slider.slick({
                arrows: false,
                dots: true,
                appendDots: $('.logos-slider__dots'),
                slidesToShow: 5,
                slidesToScroll: 4,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }]
            })
        }
        logosSlider()
        // dual slider
        function dualSlider() {
            const slider = $('.main-slider')
            if (!slider.length) return
            slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: '.nav-slider',
                fade: true,
            })
            const navSlider = $('.nav-slider')
            navSlider.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.main-slider',
                focusOnSelect: true,
                arrows: false,
            })
        }
        dualSlider()
        // related slider
        function relatedSlider() {
            const relatedSlider = $('.related-slider')
            if (!relatedSlider.length) return
            relatedSlider.slick({
                slidesToShow: 4,
                slidesToScroll: 2,
                arrows: false,
                dots: true,
                appendDots: $('.related-slider__dots'),
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        relatedSlider()
        // donations slider
        function donationSlider() {
            const slider = $('.donation-slider')
            if (!slider.length) return
            slider.slick({
                slidesToShow: 2,
                arrows: false,
                dots: true,
                appendDots: $('.donation-slider__dots'),
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        donationSlider()
        function donationSlider2() {
            const slider = $('.donation-slider2')
            if (!slider.length) return
            slider.slick({
                slidesToShow: 2,
                arrows: false,
                dots: true,
                appendDots: $('.donation-slider__dots2'),
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        donationSlider2()
        // destination slider
        function destSlider() {
            const slider = $('.destination-slider')
            if (!slider.length) return
            slider.slick({
                arrows: false,
                dots: true,
                appendDots: $('.destination-slider__dots'),
                slidesToShow: 4,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        destSlider()
        // blogs slider
        function blogsSlider() {
            const slider = $('.blogs-slider')
            if (!slider.length) return
            slider.slick({
                arrows: false,
                dots: true,
                appendDots: $('.blogs-slider__dots'),
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        blogsSlider()
        // fishes slider
        function fishesSlider() {
            const slider = $('.fishes-slider')
            if (!slider.length) return
            slider.slick({
                arrows: false,
                dots: true,
                appendDots: $('.fishes-slider__dots'),
                slidesToShow: 5,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 1830,
                    settings: {
                        slidesToShow: 4,
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        fishesSlider()
        // pages slider
        function pagesSlider() {
            const slider = $('.pages-slider')
            if (!slider.length) return
            const dots = $('.pages-slider__dots')
            slider.slick({
                slidesToShow: 2,
                arrows: false,
                dots: true,
                appendDots: dots,
                adaptiveHeight: true,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }]
            })
        }
        pagesSlider()
    })
}(jQuery))
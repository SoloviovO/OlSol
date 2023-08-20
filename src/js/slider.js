import $ from 'jquery';

$(function () {
  $('.slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 2,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    waitForAnimate: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          initialSlide: 1,
          centerMode: false,
        },
      },
    ],
  });
  $('.slider-small').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 800,
    autoplay: true,
    waitForAnimate: false,
    draggable: false,
    swipe: false,
  });
});

//= require ./all_nosearch
//= require ./app/_search

$(function() {
  $('.theme-switch').on('click', function (e) {
    $('body').toggleClass('dark');
  });

  $('.header__sidebar-toggler').on('click', function() {
    $('.page').toggleClass('show-sidebar')
  })
})



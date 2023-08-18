//= require ./lib/_energize
//= require ./app/_copy
//= require ./app/_toc
//= require ./app/_lang

function adjustLanguageSelectorWidth() {
  const elem = $('.dark-box > .lang-selector');
  elem.width(elem.parent().width());
}

$(function() {
  setupLanguages($('body').data('languages'));
  $(window).resize(function() {
    adjustLanguageSelectorWidth();
  });
  adjustLanguageSelectorWidth();
});

window.onpopstate = function() {
  activateLanguage(getLanguageFromQueryString());
};

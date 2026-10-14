// Кыргызча / Русский. По умолчанию кыргызский; выбор запоминается на устройстве.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var fromUrl = /[?&]lang=(ky|ru)/.exec(location.search);
  set((fromUrl && fromUrl[1]) || saved || 'ky');

  function set(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.content;
    var btns = document.querySelectorAll('.lang button');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].dataset.lang === lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang button');
    if (b) set(b.dataset.lang);
  });
  document.addEventListener('DOMContentLoaded', function () { set(root.getAttribute('data-lang')); });
})();

// Видео: до нажатия — только обложка, плеер YouTube грузится по клику
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('.yt');
  if (!b) return;
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.id + '?autoplay=1&rel=0';
  f.title = b.getAttribute('aria-label') || 'Видео';
  f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  f.allowFullscreen = true;
  b.replaceWith(f);
});

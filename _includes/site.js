// 全站脚本。无依赖，无 jQuery。
(function () {
  'use strict';

  /* ---------------- 主题切换 ---------------- */
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------------- 长文目录 ---------------- */
  var toc = document.getElementById('toc');
  var article = document.querySelector('.prose');

  if (toc && article) {
    // 正文章节标题在这些文章里是 h1（Markdown 用了 #），必须一并纳入
    var heads = article.querySelectorAll('h1[id], h2[id], h3[id]');
    if (heads.length >= 3) {
      var list = document.createElement('ul');
      var sub = null;

      Array.prototype.forEach.call(heads, function (h) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);

        var top = article.querySelector('h1[id]') ? 'H1' : 'H2';
        if (h.tagName !== top) {
          if (!sub) {
            sub = document.createElement('ul');
            var last = list.lastElementChild;
            (last || list).appendChild(sub);
          }
          sub.appendChild(li);
        } else {
          sub = null;
          list.appendChild(li);
        }
      });

      toc.querySelector('nav').appendChild(list);
      toc.hidden = false;
    }
  }

  /* ---------------- 宽表格横向滚动 ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.prose table'), function (t) {
    if (t.parentNode.classList.contains('table-scroll')) return;
    var box = document.createElement('div');
    box.className = 'table-scroll';
    t.parentNode.insertBefore(box, t);
    box.appendChild(t);
  });
})();

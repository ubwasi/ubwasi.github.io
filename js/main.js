(function () {
  'use strict';
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var tagsHTML = function (a) { return (a || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join(''); };

  /* ---------- toast ---------- */
  var toastEl = $('#toast'), toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------- theme ---------- */
  $('#themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    var m = $('meta[name="theme-color"]'); if (m) m.content = next === 'dark' ? '#0b1224' : '#f6f8fe';
  });

  /* ---------- mobile menu ---------- */
  var burger = $('#burger'), links = $('#links');
  function closeMenu() { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- scroll: nav state, progress, back-to-top ---------- */
  var nav = $('#nav'), bar = $('#progress'), toTop = $('#toTop');
  function onScroll() {
    var h = document.documentElement, y = h.scrollTop || document.body.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 700);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', function () { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ---------- active nav link ---------- */
  var navLinks = $$('a', links);
  var secObs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(function (s) { secObs.observe(s); });

  /* ---------- typing effect ---------- */
  var words = ['Flutter Developer', 'Mobile Application Developer', 'MVVM & Clean Architecture', 'Firebase & REST APIs'];
  var typed = $('#typed');
  if (reduce) { typed.textContent = words[0]; }
  else {
    var wi = 0, ci = 0, del = false;
    (function tick() {
      var w = words[wi]; typed.textContent = w.slice(0, ci);
      if (!del && ci === w.length) { del = true; return setTimeout(tick, 1500); }
      if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
      ci += del ? -1 : 1;
      setTimeout(tick, del ? 38 : 80);
    })();
  }

  /* ---------- social icons ---------- */
  var ICONS = {
    github: '<svg viewBox="0 0 24 24"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.45 6.6 2.01 12.06 2.01a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.9-9.89 9.9zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.46z"/></svg>'
  };
  var LABEL = { github: 'GitHub', linkedin: 'LinkedIn', facebook: 'Facebook', whatsapp: 'WhatsApp' };
  var socialHTML = Object.keys(ICONS).filter(function (k) { return S.socials && S.socials[k]; }).map(function (k) {
    return '<a href="' + esc(S.socials[k]) + '" target="_blank" rel="noopener" aria-label="' + LABEL[k] + '" title="' + LABEL[k] + '">' + ICONS[k] + '</a>';
  }).join('');
  $$('[data-socials]').forEach(function (el) { el.innerHTML = socialHTML; });

  /* ---------- resume viewer modal ---------- */
  var resumeModal = $('#resumeModal');
  var resumeFrame = $('#resumeFrame');
  var resumeDlBtn = $('#resumeDlBtn');
  var resumeExtBtn = $('#resumeExtBtn');
  var cvFile = S.cvFile || 'assets/Uzzal_Biswas_CV.pdf';

  if (resumeDlBtn) resumeDlBtn.setAttribute('href', cvFile);
  if (resumeExtBtn) resumeExtBtn.setAttribute('href', cvFile);

  function openResume() {
    if (!resumeModal) return;
    if (resumeFrame && (!resumeFrame.getAttribute('src') || resumeFrame.getAttribute('src') === 'about:blank')) {
      resumeFrame.setAttribute('src', cvFile);
    }
    if (typeof resumeModal.showModal === 'function') {
      resumeModal.showModal();
    } else {
      resumeModal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    if (!resumeModal) return;
    if (typeof resumeModal.close === 'function') {
      resumeModal.close();
    } else {
      resumeModal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  }

  var cvBtn = $('#cvBtn');
  if (cvBtn) {
    cvBtn.removeAttribute('download');
    cvBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openResume();
    });
  }

  var resumeModalClose = $('#resumeModalClose');
  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', function (e) {
      if (e.target === resumeModal) closeResume();
    });
    resumeModal.addEventListener('close', function () {
      document.body.style.overflow = '';
    });
    resumeModal.addEventListener('cancel', function () {
      document.body.style.overflow = '';
    });
  }

  $$('[data-open-resume]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openResume();
    });
  });

  /* ---------- marquee + chips ---------- */
  var tr = $('#track');
  if (tr) { var one = (S.core || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join(''); tr.innerHTML = one + one; }
  function fill(id, html) { var el = $(id); if (el) el.innerHTML = html; }
  fill('#chips', tagsHTML(S.core));
  fill('#soft', tagsHTML(S.soft));
  fill('#extra', tagsHTML(S.extra));

  /* ---------- skill cards ---------- */
  fill('#skillCards', (S.skillCards || []).map(function (c, i) {
    return '<article class="card rv d' + (i % 4) + '"><div class="ico">' + esc(c.icon) + '</div>' +
      '<h3>' + esc(c.title) + '</h3><span class="lvl lvl-' + esc(String(c.level).toLowerCase()) + '">' + esc(c.level) + '</span>' +
      '<p>' + esc(c.text) + '</p></article>';
  }).join(''));

  /* ---------- dot ratings ---------- */
  function dotsHTML(list) {
    return (list || []).map(function (l) {
      var d = ''; for (var i = 0; i < 5; i++) d += '<i class="' + (i < l.dots ? 'on' : '') + '" style="--k:' + i + '"></i>';
      return '<div class="dl"><span>' + esc(l.name) + '</span><div class="dots">' + d + '</div></div>';
    }).join('');
  }
  fill('#langs', dotsHTML(S.programming));
  fill('#spoken', dotsHTML(S.spoken));

  /* ---------- timelines ---------- */
  function timelineHTML(items, bullets) {
    return (items || []).map(function (j, i) {
      var body = '';
      if (j.points) body = '<ul>' + j.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>';
      else if (j.note) body = '<p class="muted">' + esc(j.note) + '</p>';
      return '<div class="job rv d' + (i % 3) + '"><div class="job-top"><div><h3>' + esc(j.role || j.title) + '</h3>' +
        '<div class="company">' + esc(j.org) + '</div></div><span class="date">' + esc(j.date) + '</span></div>' + body + '</div>';
    }).join('');
  }
  fill('#expList', timelineHTML(S.experience));
  fill('#eduList', timelineHTML(S.education));

  /* ---------- projects + filters ---------- */
  var grid = $('#projectGrid'), projects = S.projects || [];
  function metaHTML(p) {
    return '<span class="sub">' + esc(p.subtitle || '') + '</span>';
  }
  fill('#filters', (S.filters || []).map(function (f, i) {
    return '<button class="' + (i === 0 ? 'on' : '') + '" data-f="' + esc(f.key) + '" role="tab" aria-selected="' + (i === 0) + '">' + esc(f.label) + '</button>';
  }).join(''));

  if (grid) {
    grid.innerHTML = projects.map(function (p, i) {
      return '<button class="card proj rv d' + (i % 3) + '" data-cat="' + esc(p.cat) + '" data-i="' + i + '" aria-label="Open ' + esc(p.title) + '">' +
        '<div class="thumb ' + esc(p.color || 'blue') + '">' + (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : '<span class="emo">' + esc(p.emoji || '📱') + '</span>') +
        (p.date ? '<em class="badge">' + esc(p.date) + '</em>' : '') + '</div>' +
        '<div class="proj-body"><div class="pmeta">' + metaHTML(p) + '</div><h3>' + esc(p.title) + '</h3><p>' + esc(p.short) + '</p>' +
        '<div class="tags">' + tagsHTML(p.tags) + '</div>' +
        '<span class="more">View details <span aria-hidden="true">→</span></span></div></button>';
    }).join('');
  }

  var filterBox = $('#filters');
  if (filterBox) filterBox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    $$('button', filterBox).forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
    b.classList.add('on'); b.setAttribute('aria-selected', 'true');
    var f = b.dataset.f, n = 0;
    $$('.proj', grid).forEach(function (c) {
      var show = f === 'all' || c.dataset.cat === f;
      c.classList.toggle('hide', !show);
      if (show) {
        c.classList.add('in'); c.style.setProperty('--n', n++);
        c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
      }
    });
  });

  /* ---------- project modal ---------- */
  var modal = $('#modal'), mBody = $('#modalBody');
  function openProject(i) {
    var p = projects[i]; if (!p) return;
    var btns = '';
    if (p.live) btns += '<a class="btn btn-primary btn-sm" href="' + esc(p.live) + '" target="_blank" rel="noopener">Live demo ↗</a>';
    if (p.code) btns += '<a class="btn btn-primary btn-sm" href="' + esc(p.code) + '" target="_blank" rel="noopener">View on GitHub ↗</a>';
    btns += '<a class="btn btn-ghost btn-sm" href="#contact" data-close>Discuss a similar project</a>';
    var hl = (p.highlights && p.highlights.length) ? '<ul class="hl">' + p.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' : '';
    mBody.innerHTML = '<div class="thumb ' + esc(p.color || 'blue') + '">' + (p.image ? '<img src="' + esc(p.image) + '" alt="">' : '<span class="emo">' + esc(p.emoji || '📱') + '</span>') + '</div>' +
      '<div class="modal-in"><h3>' + esc(p.title) + '</h3><div class="role-l">' + esc(p.role || '') + (p.date ? ' · ' + esc(p.date) : '') + '</div>' +
      '<p>' + esc(p.description) + '</p>' + hl + '<div class="tags">' + tagsHTML(p.tags) + '</div>' +
      '<div class="modal-act">' + btns + '</div></div>';
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  }
  function closeModal() { if (modal.close) modal.close(); else modal.removeAttribute('open'); }
  if (grid) grid.addEventListener('click', function (e) {
    var c = e.target.closest('.proj'); if (c) openProject(+c.dataset.i);
  });
  $('#modalX').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.hasAttribute('data-close')) closeModal();
  });

  /* ---------- copy buttons ---------- */
  $$('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy;
      function done() {
        var old = b.textContent; b.textContent = 'Copied ✓'; b.classList.add('done'); toast('Copied: ' + text);
        setTimeout(function () { b.textContent = old; b.classList.remove('done'); }, 1800);
      }
      function fallback() {
        var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); done(); } catch (e) { toast('Press Ctrl+C to copy'); }
        t.remove();
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  });

  /* ---------- reveal on scroll + counters ---------- */
  function runCounters(root) {
    $$('[data-count]', root).forEach(function (el) {
      var to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), start = null;
      if (reduce) { el.textContent = to.toFixed(dec); return; }
      (function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1500, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target; t.classList.add('in'); runCounters(t);
      io.unobserve(t);
    });
  }, { threshold: .12 });
  $$('.rv').forEach(function (el) { io.observe(el); });

  /* ---------- pointer effects (desktop) ---------- */
  if (fine && !reduce) {
    var glow = $('#glow');
    addEventListener('pointermove', function (e) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });

    $$('.card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
        var rx = ((y / r.height) - .5) * -6, ry = ((x / r.width) - .5) * 6;
        c.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });

    var tilt = $('#tilt');
    if (tilt) {
      tilt.addEventListener('pointermove', function (e) {
        var r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        tilt.style.transform = 'perspective(900px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
      });
      tilt.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
    }

    // magnetic buttons
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22) + 'px,' + ((e.clientY - r.top - r.height / 2) * .32) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- particle network background ---------- */
  var cv = $('#bg');
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), W, H, pts = [], mouse = { x: -999, y: -999 }, running = true;
    var size = function () {
      var dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = []; var n = Math.min(60, Math.floor(W / 24));
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 });
    };
    size(); addEventListener('resize', size);
    addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) draw(); });
    var draw = function () {
      if (!running) return;
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      var dot = light ? '31,122,224' : '59,157,255', ln = light ? '91,75,219' : '124,108,255';
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.fillStyle = 'rgba(' + dot + ',.55)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, 6.3); ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) { ctx.strokeStyle = 'rgba(' + ln + ',' + (.2 * (1 - d / 130)) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (md < 160) { ctx.strokeStyle = 'rgba(' + dot + ',' + (.35 * (1 - md / 160)) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ---------- contact form ---------- */
  var form = $('#form'), note = $('#formNote'), sendBtn = $('#sendBtn');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setNote(msg, kind) { note.textContent = msg; note.className = 'form-note ' + (kind || ''); }

  async function deliver(d) {
    var c = S.contact || {};
    if (c.apiUrl) {
      var r = await fetch(c.apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      var j = {}; try { j = await r.json(); } catch (e) {}
      if (!r.ok || j.ok === false) throw new Error(j.error || 'Server error');
      return 'sent';
    }
    if (c.web3formsKey) {
      var r2 = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: c.web3formsKey, name: d.name, email: d.email, subject: d.subject || 'New message from portfolio', message: d.message, from_name: 'Portfolio website' })
      });
      var j2 = await r2.json();
      if (!j2.success) throw new Error(j2.message || 'Could not send');
      return 'sent';
    }
    var body = 'Name: ' + d.name + '\nEmail: ' + d.email + '\n\n' + d.message;
    location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent(d.subject || 'Message from portfolio') + '&body=' + encodeURIComponent(body);
    return 'mailto';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var f = form.elements;
    if (f.botcheck.value) return;
    var d = { name: f.name.value.trim(), email: f.email.value.trim(), subject: f.subject.value.trim(), message: f.message.value.trim() };
    var bad = [];
    if (d.name.length < 2) bad.push(f.name);
    if (!EMAIL_RE.test(d.email)) bad.push(f.email);
    if (d.message.length < 10) bad.push(f.message);
    [f.name, f.email, f.message].forEach(function (x) { x.classList.toggle('invalid', bad.indexOf(x) > -1); });
    if (bad.length) { bad[0].focus(); setNote('Please fill in your name, a valid email and a message (10+ characters).', 'err'); return; }

    var label = $('span', sendBtn).textContent;
    sendBtn.disabled = true; $('span', sendBtn).textContent = 'Sending...';
    setNote('');
    try {
      var res = await deliver(d);
      if (res === 'sent') { form.reset(); setNote('Thank you, ' + d.name.split(' ')[0] + '! Your message was sent. I will reply soon.', 'ok'); toast('Message sent ✓'); }
      else { setNote('Your email app should open with the message ready to send.', 'ok'); }
    } catch (err) {
      setNote('Sorry, sending failed. Please email me at ' + S.email + ' or try again.', 'err');
    } finally {
      sendBtn.disabled = false; $('span', sendBtn).textContent = label;
    }
  });
  $$('input,textarea', form).forEach(function (x) { x.addEventListener('input', function () { x.classList.remove('invalid'); }); });

  /* ---------- page loader ---------- */
  var loader = $('#loader');
  function hideLoader() { if (loader) { loader.classList.add('done'); setTimeout(function () { loader.remove(); }, 700); } }
  if (document.readyState === 'complete') setTimeout(hideLoader, 350);
  else addEventListener('load', function () { setTimeout(hideLoader, 350); });

  $('#yr').textContent = new Date().getFullYear();
})();

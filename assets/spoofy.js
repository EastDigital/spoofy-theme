/* Spoofy storefront behaviour. No dependencies; everything degrades to plain
   links and form posts when JavaScript is unavailable. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(message, linkText, linkUrl) {
    var el = $('.sp-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'sp-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = '';
    var span = document.createElement('span');
    span.textContent = message;
    el.appendChild(span);
    if (linkText && linkUrl) {
      var a = document.createElement('a');
      a.href = linkUrl;
      a.textContent = linkText;
      el.appendChild(a);
    }
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 5000);
  }

  function routes() {
    var r = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    return r;
  }

  function refreshCartCount() {
    return fetch(routes() + 'cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        $$('[data-sp-cart-count], hdt-cart-count').forEach(function (el) {
          el.textContent = cart.item_count;
          el.hidden = false;
        });
        return cart;
      })
      .catch(function () {});
  }

  /* ---------- Ajax add to cart (cards + product page) ---------- */
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form.matches || !form.matches('form[data-sp-add]')) return;
    if (!window.fetch || !window.FormData) return;
    event.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    var errorEl = form.querySelector('[data-sp-error]');
    if (errorEl) errorEl.hidden = true;
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    fetch(routes() + 'cart/add.js', {
      method: 'POST',
      headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.data.description || res.data.message || 'Could not add to cart');
        refreshCartCount();
        /* Ask the base theme to re-render its cart drawer and counters */
        try { document.dispatchEvent(new CustomEvent('cart:reload')); } catch (e) {}
        toast(form.getAttribute('data-sp-added') || 'Added to cart', form.getAttribute('data-sp-view') || 'View cart', routes() + 'cart');
      })
      .catch(function (err) {
        if (errorEl) { errorEl.textContent = err.message; errorEl.hidden = false; }
        else toast(err.message);
      })
      .then(function () {
        if (btn) { btn.removeAttribute('aria-busy'); btn.disabled = btn.hasAttribute('data-sp-soldout'); }
      });
  });

  /* ---------- Header: mobile drawer + search toggle ---------- */
  function initHeader() {
    var drawer = $('[data-sp-drawer]');
    var lastFocus;
    function setDrawer(open) {
      if (!drawer) return;
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.documentElement.style.overflow = open ? 'hidden' : '';
      $$('[data-sp-drawer-open]').forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
      if (open) {
        lastFocus = document.activeElement;
        var first = $('[data-sp-drawer-close]', drawer);
        if (first) first.focus();
      } else if (lastFocus) {
        lastFocus.focus();
      }
    }
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target : e.target.parentNode;
      if (!t || !t.closest) return;
      if (t.closest('[data-sp-drawer-open]')) { e.preventDefault(); setDrawer(true); }
      else if (t.closest('[data-sp-drawer-close]')) { e.preventDefault(); setDrawer(false); }
      var searchBtn = t.closest('[data-sp-search-toggle]');
      if (searchBtn) {
        var panel = $('[data-sp-search]');
        if (!panel) return;
        e.preventDefault();
        var open = !panel.classList.contains('is-open');
        panel.classList.toggle('is-open', open);
        searchBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) { var input = $('input[type="search"]', panel); if (input) input.focus(); }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (drawer && drawer.classList.contains('is-open')) setDrawer(false);
      var panel = $('[data-sp-search].is-open');
      if (panel) {
        panel.classList.remove('is-open');
        var b = $('[data-sp-search-toggle]');
        if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); }
      }
    });
  }

  /* ---------- Rails (carousels) ---------- */
  function initRails(root) {
    $$('[data-sp-rail]', root).forEach(function (rail) {
      if (rail.dataset.spReady) return;
      rail.dataset.spReady = '1';
      var track = $('[data-sp-rail-track]', rail);
      if (!track) return;
      $$('[data-sp-rail-btn]', rail).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var dir = btn.getAttribute('data-sp-rail-btn') === 'prev' ? -1 : 1;
          track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
        });
      });
    });
  }

  /* ---------- Collection: sort + filters ---------- */
  function initCollection() {
    var sort = $('[data-sp-sort]');
    if (sort) {
      sort.addEventListener('change', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('sort_by', sort.value);
        url.searchParams.delete('page');
        window.location.href = url.toString();
      });
    }
    var toggle = $('[data-sp-filters-toggle]');
    var filters = $('[data-sp-filters]');
    if (toggle && filters) {
      toggle.addEventListener('click', function () {
        var open = !filters.classList.contains('is-open');
        filters.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }

  /* ---------- Product page ---------- */
  function money(cents, format) {
    var value = (cents / 100).toFixed(2);
    var parts = value.split('.');
    var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var withDecimals = whole + '.' + parts[1];
    return (format || '₹{{amount}}')
      .replace(/\{\{\s*amount\s*\}\}/, withDecimals)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, whole)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, whole.replace(/,/g, '.') + ',' + parts[1])
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, whole.replace(/,/g, '.'));
  }

  function initProduct() {
    var root = $('[data-sp-product]');
    if (!root) return;
    var dataEl = $('[data-sp-product-json]', root);
    var data = {};
    try { data = JSON.parse(dataEl.textContent); } catch (e) {}
    var variants = data.variants || [];
    var format = data.money_format;
    var strings = data.strings || {};
    var stage = $('[data-sp-stage]', root);

    function showMedia(id) {
      if (!id) return;
      var thumb = $('[data-sp-thumb="' + id + '"]', root);
      if (!thumb) return;
      $$('[data-sp-thumb]', root).forEach(function (t) { t.setAttribute('aria-current', t === thumb ? 'true' : 'false'); });
      var img = $('img', stage);
      if (img) {
        img.src = thumb.getAttribute('data-src');
        img.srcset = thumb.getAttribute('data-srcset') || '';
        img.alt = thumb.getAttribute('data-alt') || '';
      }
    }
    $$('[data-sp-thumb]', root).forEach(function (t) {
      t.addEventListener('click', function () { showMedia(t.getAttribute('data-sp-thumb')); });
    });

    function currentVariant() {
      var groups = $$('[data-sp-option]', root);
      if (!groups.length) return variants[0];
      var chosen = groups.map(function (g) {
        var c = $('input:checked', g);
        return c ? c.value : null;
      });
      return variants.filter(function (v) {
        return chosen.every(function (val, i) { return v.options[i] === val; });
      })[0];
    }

    function render(variant) {
      var idInputs = $$('[data-sp-variant-id]');
      var buttons = $$('[data-sp-buy-btn]');
      var priceEls = $$('[data-sp-price]');
      var stock = $('[data-sp-stock]', root);
      if (!variant) {
        buttons.forEach(function (b) { b.disabled = true; b.setAttribute('data-sp-soldout', ''); $('[data-sp-btn-label]', b).textContent = strings.unavailable || 'Unavailable'; });
        return;
      }
      idInputs.forEach(function (i) { i.value = variant.id; });
      buttons.forEach(function (b) {
        b.disabled = !variant.available;
        if (variant.available) b.removeAttribute('data-sp-soldout'); else b.setAttribute('data-sp-soldout', '');
        $('[data-sp-btn-label]', b).textContent = variant.available ? (strings.add || 'Add to cart') : (strings.soldout || 'Sold out');
      });
      priceEls.forEach(function (el) {
        var onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
        var html = '';
        if (onSale) {
          html += '<span class="sp-vh">' + (strings.sale || 'Sale price') + '</span><span class="sp-price__now sp-price__now--sale">' + money(variant.price, format) + '</span>';
          html += '<span class="sp-vh">' + (strings.regular || 'Regular price') + '</span><s class="sp-price__compare">' + money(variant.compare_at_price, format) + '</s>';
          if (el.hasAttribute('data-sp-price-save')) {
            var pct = Math.round((variant.compare_at_price - variant.price) * 100 / variant.compare_at_price);
            html += '<span class="sp-price__save">' + (strings.save || 'Save') + ' ' + pct + '%</span>';
          }
        } else {
          html += '<span class="sp-price__now">' + money(variant.price, format) + '</span>';
        }
        el.innerHTML = html;
      });
      if (stock) {
        stock.textContent = variant.available ? (strings.instock || 'In stock') : (strings.soldout || 'Sold out');
        stock.classList.toggle('sp-stock--out', !variant.available);
      }
      if (variant.featured_media_id) showMedia(String(variant.featured_media_id));
      if (window.history && window.history.replaceState && variants.length > 1) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      }
    }

    $$('[data-sp-option] input', root).forEach(function (input) {
      input.addEventListener('change', function () { render(currentVariant()); });
    });

    $$('[data-sp-qty]', root).forEach(function (wrap) {
      var input = $('input', wrap);
      wrap.addEventListener('click', function (e) {
        var b = e.target.closest('[data-sp-qty-step]');
        if (!b) return;
        var next = (parseInt(input.value, 10) || 1) + parseInt(b.getAttribute('data-sp-qty-step'), 10);
        input.value = Math.max(1, next);
      });
    });

    /* Sticky buy bar on small screens: shows once the main button scrolls away */
    var sticky = $('[data-sp-stickybuy]');
    var mainBtn = $('[data-sp-buy-btn]', root);
    if (sticky && mainBtn && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var e = entries[0];
        sticky.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0);
      }).observe(mainBtn);
    }
  }

  /* ---------- Product recommendations ---------- */
  function initRecommendations() {
    $$('[data-sp-recs]').forEach(function (holder) {
      var url = holder.getAttribute('data-url');
      if (!url || !window.fetch) return;
      fetch(url)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var fresh = doc.querySelector('[data-sp-recs]');
          if (fresh && fresh.querySelector('.sp-card')) {
            holder.innerHTML = fresh.innerHTML;
            holder.hidden = false;
            initRails(holder);
          }
        })
        .catch(function () {});
    });
  }

  function init() {
    initHeader();
    initRails(document);
    initCollection();
    initProduct();
    initRecommendations();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* Theme editor: re-run when a section is re-rendered */
  document.addEventListener('shopify:section:load', function (e) {
    initRails(e.target);
  });
})();

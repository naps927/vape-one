/* =========================================================
   Vape One Shop — logique de la boutique
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = {
    lang: 'fr',
    cat: 'all',
    q: '',
    sort: 'pop',
    cart: load('vapeone.cart', {})
  };

  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* navigation privée */ }
  }

  /* ---------------- langue ---------------- */
  const t = key => (I18N[state.lang][key] !== undefined ? I18N[state.lang][key] : key);
  const L = obj => obj[state.lang] || obj.fr;                       // produit / catégorie
  const money = n => new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(n)
    + ' ' + (state.lang === 'ar' ? SHOP.currencyAr : SHOP.currency);

  function setLang(lang, rerender = true) {
    state.lang = I18N[lang] ? lang : 'fr';
    save('vapeone.lang', state.lang);

    const dict = I18N[state.lang];
    document.documentElement.lang = dict.htmlLang;
    document.documentElement.dir = dict.dir;
    document.title = dict.docTitle;

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$('#langSwitch button, #ageLang button').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === state.lang));

    const adr = $('#shopAddress'), tel = $('#footPhone');
    if (adr) adr.textContent = state.lang === 'ar' ? SHOP.addressAr : SHOP.address;
    if (tel) tel.textContent = SHOP.phoneDisplay;

    if (SHOP.loyalty) {
      const r1 = $('#loyaltyRatio'), r2 = $('#loyaltyReward');
      if (r1) r1.textContent = L(SHOP.loyalty.ratio);
      if (r2) r2.textContent = L(SHOP.loyalty.reward);
    }

    if (rerender) { renderChips(); renderGrid(); renderCart(); renderFootCats(); captionGallery(); }
  }

  /* ---------------- visuels produits ---------------- */
  function art(p, id) {
    const [c1, c2] = p.colors;
    const g = 'g' + id;
    const defs = `<defs>
      <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <linearGradient id="${g}s" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity=".5"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient></defs>`;

    /* Crown Bar 15K : dessin dédié, au plus près de l'appareil */
    if (p.art === 'crownbar') {
      return `<svg viewBox="0 0 170 300" xmlns="http://www.w3.org/2000/svg">${defs}
        <defs>
          <linearGradient id="${g}red" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#8f0f18"/><stop offset=".45" stop-color="#e8232f"/>
            <stop offset="1" stop-color="#a3121c"/>
          </linearGradient>
          <linearGradient id="${g}blk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#0e0e12"/><stop offset=".5" stop-color="#33343c"/>
            <stop offset="1" stop-color="#111116"/>
          </linearGradient>
          <linearGradient id="${g}chr" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#7c8494"/><stop offset=".5" stop-color="#eef1f6"/>
            <stop offset="1" stop-color="#79808f"/>
          </linearGradient>
        </defs>
        <!-- embout -->
        <path d="M74 12 h22 a7 7 0 0 1 7 7 v20 h-36 v-20 a7 7 0 0 1 7 -7z" fill="#17171c"/>
        <rect x="61" y="36" width="48" height="16" rx="7" fill="#1c1c22"/>
        <!-- corps -->
        <rect x="34" y="48" width="102" height="240" rx="26" fill="url(#${g}blk)"/>
        <!-- panneaux latéraux rouges -->
        <path d="M40 92 h26 v150 h-26 a6 6 0 0 1 -6 -6 v-138 a6 6 0 0 1 6 -6z" fill="url(#${g}red)"/>
        <path d="M104 92 h26 a6 6 0 0 1 6 6 v138 a6 6 0 0 1 -6 6 h-26z" fill="url(#${g}red)"/>
        <!-- liserés chromés -->
        <rect x="66" y="78" width="38" height="6" rx="3" fill="url(#${g}chr)"/>
        <rect x="66" y="248" width="38" height="6" rx="3" fill="url(#${g}chr)"/>
        <path d="M66 84 h6 v164 h-6z" fill="url(#${g}chr)" opacity=".85"/>
        <path d="M98 84 h6 v164 h-6z" fill="url(#${g}chr)" opacity=".85"/>
        <!-- façade + écran -->
        <rect x="70" y="92" width="30" height="150" rx="10" fill="#0b0b0f"/>
        <path d="M85 108 l7 5 -3 8 h-8 l-3 -8z" fill="#e8e9ef" opacity=".85"/>
        <text x="85" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="8"
              fill="#e8e9ef" opacity=".8" letter-spacing="1"
              transform="rotate(-90 85 150)">AL FAKHER</text>
        <rect x="74" y="176" width="22" height="26" rx="4" fill="#05050a"/>
        <rect x="77" y="181" width="4" height="9" rx="1" fill="#3ddc7f"/>
        <rect x="83" y="181" width="4" height="9" rx="1" fill="#3ddc7f"/>
        <rect x="89" y="181" width="4" height="9" rx="1" fill="#1f5f3d"/>
        <text x="85" y="199" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="9"
              fill="#7ef0ff">15K</text>
        <!-- socle -->
        <rect x="46" y="262" width="78" height="24" rx="12" fill="#0b0b0f"/>
      </svg>`;
    }

    if (p.category === 'jetable') {
      return `<svg viewBox="0 0 160 260" xmlns="http://www.w3.org/2000/svg">${defs}
        <rect x="46" y="18" width="68" height="224" rx="26" fill="url(#${g})"/>
        <rect x="46" y="18" width="68" height="224" rx="26" fill="url(#${g}s)" opacity=".32"/>
        <rect x="62" y="4" width="36" height="26" rx="11" fill="#1b1e27"/>
        <rect x="60" y="60" width="40" height="52" rx="10" fill="#0d0f16" opacity=".22"/>
        <text x="80" y="94" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="17"
              fill="#fff" opacity=".92">${p.puffs ? (p.puffs / 1000) + 'K' : 'VO'}</text>
        <text x="80" y="172" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="11"
              fill="#fff" opacity=".78" letter-spacing="1">VAPE ONE</text>
      </svg>`;
    }
    if (p.category === 'rechargeable') {
      return `<svg viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg">${defs}
        <rect x="52" y="96" width="76" height="146" rx="16" fill="url(#${g})"/>
        <rect x="52" y="96" width="76" height="146" rx="16" fill="url(#${g}s)" opacity=".28"/>
        <rect x="66" y="116" width="48" height="34" rx="7" fill="#0b0d13" opacity=".55"/>
        <circle cx="90" cy="178" r="13" fill="#0b0d13" opacity=".45"/>
        <rect x="68" y="44" width="44" height="56" rx="8" fill="#cfd4de"/>
        <rect x="64" y="70" width="52" height="10" fill="#aab1bf"/>
        <rect x="76" y="18" width="28" height="34" rx="9" fill="#2b3038"/>
        <ellipse cx="90" cy="20" rx="14" ry="6" fill="#1b1e27"/>
      </svg>`;
    }
    if (p.category === 'eliquide') {
      return `<svg viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg">${defs}
        <rect x="56" y="76" width="68" height="164" rx="18" fill="url(#${g})"/>
        <rect x="56" y="76" width="68" height="164" rx="18" fill="url(#${g}s)" opacity=".26"/>
        <rect x="64" y="124" width="52" height="70" rx="8" fill="#0b0d13" opacity=".35"/>
        <text x="90" y="166" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="17"
              fill="#fff" opacity=".9">${p.nic || 0}mg</text>
        <rect x="74" y="44" width="32" height="36" rx="6" fill="#e7eaf1"/>
        <rect x="70" y="28" width="40" height="20" rx="7" fill="#2b3038"/>
      </svg>`;
    }
    if (p.category === 'pod') {
      return `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">${defs}
        <rect x="42" y="66" width="52" height="128" rx="14" fill="url(#${g})"/>
        <rect x="42" y="66" width="52" height="128" rx="14" fill="url(#${g}s)" opacity=".3"/>
        <rect x="56" y="48" width="24" height="24" rx="8" fill="#2b3038"/>
        <rect x="106" y="82" width="52" height="112" rx="14" fill="url(#${g})" opacity=".82"/>
        <rect x="120" y="64" width="24" height="24" rx="8" fill="#2b3038"/>
        <rect x="52" y="104" width="32" height="60" rx="7" fill="#0b0d13" opacity=".28"/>
        <rect x="116" y="118" width="32" height="54" rx="7" fill="#0b0d13" opacity=".28"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">${defs}
      <rect x="34" y="52" width="152" height="98" rx="26" fill="url(#${g})"/>
      <rect x="34" y="52" width="152" height="98" rx="26" fill="url(#${g}s)" opacity=".26"/>
      <rect x="34" y="94" width="152" height="10" fill="#0b0d13" opacity=".32"/>
      <circle cx="110" cy="99" r="16" fill="#0b0d13" opacity=".38"/>
      <circle cx="110" cy="99" r="7" fill="#e7eaf1" opacity=".8"/>
    </svg>`;
  }

  /* Visuel d'un produit : photo si elle existe, sinon dessin généré.
     Si le fichier image manque, la carte bascule seule sur le dessin. */
  function media(p, id) {
    if (!p.image) return art(p, id);
    const cls = p.fit === 'cover' ? 'ph ph-cover' : 'ph';
    return `<img class="${cls}" src="${p.image}" alt="${esc(L(p).name)}" loading="lazy"
              onerror="this.parentNode.classList.add('img-failed')">${art(p, id)}`;
  }
  const mediaClass = p => (p.image ? ' has-img' : '');

  /* ---------------- catalogue ---------------- */
  const find = id => PRODUCTS.find(p => p.id === id);
  const catLabel = id => {
    const c = CATEGORIES.find(c => c.id === id);
    return c ? L(c) : id;
  };

  function visible() {
    const q = state.q.trim().toLowerCase();
    const list = PRODUCTS.filter(p => {
      const okCat = state.cat === 'all' || p.category === state.cat;
      if (!okCat) return false;
      if (!q) return true;
      const hay = [p.fr.name, p.fr.flavor, p.fr.notes.join(' '),
                   p.ar.name, p.ar.flavor, p.ar.notes.join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
    const order = { jetable: 0, rechargeable: 1, eliquide: 2, pod: 3, accessoire: 4 };
    const sorters = {
      pop:  (a, b) => (order[a.category] - order[b.category]) || (b.price - a.price),
      asc:  (a, b) => a.price - b.price,
      desc: (a, b) => b.price - a.price,
      name: (a, b) => L(a).name.localeCompare(L(b).name, state.lang)
    };
    return list.sort(sorters[state.sort]);
  }

  function card(p, i) {
    const tx = L(p);
    const out = p.stock === 0;
    const badgeText = state.lang === 'ar' && p.badge ? (BADGES[p.badge] || p.badge) : p.badge;
    const off = p.oldPrice && p.oldPrice > p.price
      ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

    const tags = [];
    if (out) tags.push(`<span class="badge out">${t('cat.outOfStock')}</span>`);
    if (off) tags.push(`<span class="badge promo">${t('cat.promo')} −${off}%</span>`);
    if (p.badge) tags.push(`<span class="badge ${p.badge === 'Nouveau' ? 'alt' : p.badge === 'Expert' ? 'blue' : ''}">${esc(badgeText)}</span>`);
    const badge = tags.length ? `<div class="badges">${tags.join('')}</div>` : '';

    const specs = [
      p.puffs ? p.puffs.toLocaleString('fr-FR') + ' ' + t('cat.puffs') : null,
      (p.nic !== null && p.nic !== undefined) ? p.nic + ' mg/ml' : null,
      tx.notes[0]
    ].filter(Boolean).map(s => `<span class="spec">${esc(s)}</span>`).join('');

    return `<article class="card">
      ${badge}
      <div class="card-media${mediaClass(p)}" style="--glow:${p.colors[0]}33" data-open="${p.id}">
        ${media(p, 'c' + i)}
        <span class="quickview">${t('cat.viewSheet')}</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${esc(catLabel(p.category))}</span>
        <h3 class="card-title">${esc(tx.name)}</h3>
        <p class="card-flavor">${esc(tx.flavor)}</p>
        <div class="specs">${specs}</div>
        <div class="card-foot">
          <span class="price">${money(p.price)}${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ''}</span>
          <button class="add-btn" data-add="${p.id}" ${out ? 'disabled' : ''} aria-label="+">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  function renderChips() {
    $('#chips').innerHTML = CATEGORIES.map(c =>
      `<button class="chip" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">${esc(L(c))}</button>`
    ).join('');
  }

  function renderFootCats() {
    $('#footCats').innerHTML = CATEGORIES.filter(c => c.id !== 'all')
      .map(c => `<li><a href="#boutique" data-goto="${c.id}">${esc(L(c))}</a></li>`).join('');
  }

  function renderGrid() {
    const list = visible();
    $('#grid').innerHTML = list.length
      ? list.map(card).join('')
      : `<div class="empty"><strong>${t('cat.emptyT')}</strong>${t('cat.emptyS')}</div>`;
    $('#catNote').textContent = t('catdesc.' + state.cat);
    $('#resultLine').textContent =
      `${list.length} ${t('cat.products')} · ${catLabel(state.cat)}${state.q ? ' · « ' + state.q + ' »' : ''}`;
    $$('.chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)));
  }

  /* Galerie de la boutique : chaque photo introuvable disparaît d'elle-même.
     Si aucune n'est disponible, on garde la carte Google Maps. */
  function renderGallery() {
    const g = $('#shopGallery');
    const map = $('#mapCard');
    const list = (SHOP.photos || []).filter(p => p && p.src);

    const fallback = () => { g.hidden = true; map.hidden = false; };
    if (!list.length) return fallback();

    g.innerHTML = list.map((ph, i) => `
      <figure class="shot${i === 0 ? ' shot-main' : ''}">
        <img src="${ph.src}" alt="" ${i ? 'loading="lazy"' : ''} data-i="${i}"
             ${ph.pos ? `style="object-position:${ph.pos}"` : ''}>
        <figcaption></figcaption>
      </figure>`).join('');

    $$('#shopGallery img').forEach(img => {
      img.addEventListener('error', () => {
        img.closest('figure').remove();
        if (!$$('#shopGallery figure').length) fallback();
      });
    });
    captionGallery();
  }

  /* Réseaux sociaux : icônes et rendu, alimentés par SHOP.socials */
  const SOCIAL_ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
    facebook:  '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    tiktok:    '<path d="M15 3v9.5a4 4 0 1 1-3-3.9"/><path d="M15 6a5 5 0 0 0 5 4"/>',
    whatsapp:  '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-9A8.4 8.4 0 1 1 21 11.5z"/>'
  };
  const svgIcon = (type, size) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SOCIAL_ICONS[type] || ''}</svg>`;

  const activeSocials = () => (SHOP.socials || []).filter(s => s && s.url);

  function renderSocials() {
    const list = activeSocials();

    /* boutons détaillés dans la section « La boutique » */
    const follow = $('#follow');
    if (follow) {
      follow.innerHTML = list.map(s =>
        `<a class="follow-btn ${s.type}" href="${s.url}" target="_blank" rel="noopener">
           ${svgIcon(s.type, 17)}<span>${esc(s.label || s.type)}</span>
         </a>`).join('');
      $('.follow-title').hidden = !list.length;
      follow.hidden = !list.length;
    }

    /* icônes du pied de page, WhatsApp en premier */
    const foot = $('#footSocials');
    if (foot) {
      foot.innerHTML =
        `<a href="#" data-wa="direct" aria-label="WhatsApp">${svgIcon('whatsapp', 17)}</a>` +
        list.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.type)}">${svgIcon(s.type, 17)}</a>`).join('');
    }
  }

  /* Visionneuse : agrandit la photo cliquée, navigation clavier et tactile. */
  const lb = { i: 0, list: [] };

  function openLightbox(index) {
    lb.list = $$('#shopGallery figure').map(f => {
      const img = f.querySelector('img');
      return { src: img.src, caption: f.querySelector('figcaption').textContent };
    });
    if (!lb.list.length) return;
    lb.i = (index + lb.list.length) % lb.list.length;
    showLightbox();
    $('#lightbox').classList.add('open');
    document.body.classList.add('is-locked');
  }

  function showLightbox() {
    const item = lb.list[lb.i];
    $('#lbImg').src = item.src;
    $('#lbImg').alt = item.caption;
    $('#lbCaption').textContent = item.caption;
    $('#lbCount').textContent = (lb.i + 1) + ' / ' + lb.list.length;
    const solo = lb.list.length < 2;
    $('#lbPrev').hidden = solo;
    $('#lbNext').hidden = solo;
  }

  function stepLightbox(d) {
    if (lb.list.length < 2) return;
    lb.i = (lb.i + d + lb.list.length) % lb.list.length;
    showLightbox();
  }

  function closeLightbox() {
    $('#lightbox').classList.remove('open');
    if (!$('#drawer').classList.contains('open') && !$('#modal').classList.contains('open'))
      document.body.classList.remove('is-locked');
  }

  function captionGallery() {
    const list = (SHOP.photos || []).filter(p => p && p.src);
    $$('#shopGallery figure').forEach(f => {
      const i = +f.querySelector('img').dataset.i;
      f.querySelector('figcaption').textContent = list[i] ? (list[i][state.lang] || list[i].fr) : '';
    });
  }

  /* ---------------- panier ---------------- */
  function lines() {
    return Object.entries(state.cart)
      .map(([id, qty]) => ({ p: find(id), qty }))
      .filter(l => l.p && l.qty > 0);
  }
  const subtotal = () => lines().reduce((s, l) => s + l.p.price * l.qty, 0);
  const count    = () => lines().reduce((s, l) => s + l.qty, 0);
  const shipping = () => { const s = subtotal(); return s === 0 || s >= SHOP.freeShipping ? 0 : SHOP.shipCost; };

  function addToCart(id) {
    const p = find(id);
    if (!p || p.stock === 0) return;
    state.cart[id] = Math.min((state.cart[id] || 0) + 1, p.stock);
    persist();
    toast(`${L(p).name} — ${t('toast.added')}`);
  }
  function setQty(id, qty) {
    const p = find(id);
    if (!p) return;
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(qty, p.stock);
    persist();
  }
  function persist() { save('vapeone.cart', state.cart); renderCart(); }

  function renderCart() {
    const ls = lines();
    const n = count();
    const badge = $('#cartCount');
    badge.textContent = n;
    badge.dataset.empty = String(n === 0);

    $('#cartItems').innerHTML = ls.length ? ls.map((l, i) => `
      <div class="cart-item">
        <span class="thumb${mediaClass(l.p)}">${media(l.p, 'k' + i)}</span>
        <div>
          <div class="ci-name">${esc(L(l.p).name)}</div>
          <div class="ci-meta">${money(l.p.price)}</div>
          <div class="qty">
            <button data-dec="${l.p.id}" aria-label="-">−</button>
            <span>${l.qty}</span>
            <button data-inc="${l.p.id}" aria-label="+">+</button>
          </div>
        </div>
        <div class="ci-right">
          <span class="ci-price">${money(l.p.price * l.qty)}</span>
          <button class="ci-remove" data-del="${l.p.id}">${t('cart.remove')}</button>
        </div>
      </div>`).join('')
      : `<div class="cart-empty">
           <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
           <p>${t('cart.empty')}</p>
         </div>`;

    const sub = subtotal(), ship = shipping();
    $('#subTotal').textContent = money(sub);
    $('#shipCost').textContent = sub === 0 ? '—' : (ship === 0 ? t('cart.free') : money(ship));
    $('#grandTotal').textContent = money(sub + ship);

    $('#shipFill').style.width = Math.min(100, (sub / SHOP.freeShipping) * 100) + '%';
    $('#shipMsg').textContent = sub >= SHOP.freeShipping
      ? t('cart.freeReached')
      : t('cart.freeLeft').replace('{x}', money(SHOP.freeShipping - sub));
  }

  /* ---------------- WhatsApp ---------------- */
  function waLink(text) {
    return 'https://wa.me/' + SHOP.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function orderMessage() {
    const ls = lines();
    if (!ls.length) return t('wa.direct');
    const sub = subtotal(), ship = shipping();
    const body = ls.map(l => `• ${L(l.p).name} × ${l.qty} — ${money(l.p.price * l.qty)}`).join('\n');
    return [
      t('wa.hello'), '', body, '',
      `${t('wa.subtotal')} : ${money(sub)}`,
      `${t('wa.ship')} : ${ship === 0 ? t('wa.free') : money(ship)}`,
      `${t('wa.total')} : ${money(sub + ship)}`, '',
      t('wa.footer')
    ].join('\n');
  }

  function openWa(kind) {
    if (!SHOP.whatsapp || /^2126000/.test(SHOP.whatsapp)) { toast(t('toast.noNumber')); return; }
    const text = kind === 'cart' ? orderMessage() : t('wa.direct');
    toast(t('toast.wa'));
    window.open(waLink(text), '_blank', 'noopener');
  }

  /* Numéro de téléphone : marocain ou international.
     Renvoie le numéro au format +indicatif, ou null s'il est invalide. */
  function normalizePhone(raw) {
    let v = String(raw).replace(/[\s.\-()–—]/g, '');
    if (v.startsWith('00')) v = '+' + v.slice(2);

    const international = v.startsWith('+');
    const chiffres = v.replace(/\D/g, '');

    if (international) return /^[1-9]\d{7,14}$/.test(chiffres) ? '+' + chiffres : null;
    /* format local marocain : 0 suivi de 9 chiffres */
    if (/^0[5-8]\d{8}$/.test(chiffres)) return '+212' + chiffres.slice(1);
    return null;
  }

  /* ---------------- carte de fidélité ---------------- */
  /* Aucune donnée n'est stockée par le site : le formulaire compose un message
     WhatsApp que le client envoie lui-même à la boutique. */
  function fidelitySubmit(e) {
    e.preventDefault();
    const nom   = $('#fidName').value.trim();
    const tel   = $('#fidPhone').value.trim();
    const optin = $('#fidOptin').checked;
    const ok    = $('#fidConsent').checked;
    const err   = $('#fidError');

    const showError = msg => { err.textContent = msg; err.hidden = false; };
    err.hidden = true;

    if (nom.length < 2) return showError(t('fid.errName'));

    const numero = normalizePhone(tel);
    if (!numero) return showError(t('fid.errPhone'));

    /* e-mail facultatif : contrôlé seulement s'il est renseigné */
    const mail = $('#fidMail') ? $('#fidMail').value.trim() : '';
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) return showError(t('fid.errMail'));

    if (!ok) return showError(t('fid.errConsent'));

    const sep = state.lang === 'ar' ? ': ' : ' : ';
    const message = [
      t('wa.fidHello'), '',
      t('wa.fidName') + sep + nom,
      t('wa.fidPhone') + sep + numero,
      mail ? t('wa.fidMail') + sep + mail : null,
      t('wa.fidOptin') + sep + (optin ? t('wa.yes') : t('wa.no'))
    ].filter(Boolean).join('\n');

    toast(t('fid.ok'));
    window.open(waLink(message), '_blank', 'noopener');
    e.target.reset();
  }

  /* ---------------- fiche produit ---------------- */
  function openModal(id) {
    const p = find(id);
    if (!p) return;
    const tx = L(p);

    $('#modalMedia').innerHTML = media(p, 'm1');
    $('#modalMedia').classList.toggle('has-img', !!p.image);
    $('#modalMedia').classList.remove('img-failed');
    $('#modalMedia').style.background =
      `radial-gradient(closest-side at 50% 55%, ${p.colors[0]}2e, #0c0d12 75%)`;

    const cls = p.stock === 0 ? 'out' : p.stock < 20 ? 'low' : '';
    const txt = p.stock === 0 ? t('pd.out')
              : p.stock < 20 ? t('pd.low').replace('{n}', p.stock)
              : t('pd.inStock');

    $('#modalBody').innerHTML = `
      <span class="card-cat">${esc(catLabel(p.category))}</span>
      <h3 class="display">${esc(tx.name)}</h3>
      <p class="desc">${esc(tx.desc)}</p>
      <div class="note-list">${tx.notes.map(n => `<span>${esc(n)}</span>`).join('')}</div>
      <div class="specs">
        ${p.puffs ? `<span class="spec">${p.puffs.toLocaleString('fr-FR')} ${t('cat.puffs')}</span>` : ''}
        ${(p.nic !== null && p.nic !== undefined) ? `<span class="spec">${p.nic} mg/ml</span>` : ''}
        <span class="spec">${esc(tx.flavor)}</span>
      </div>
      <p class="stock-line ${cls}">${txt}</p>
      <div class="modal-buy">
        <span class="price">${money(p.price)}${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ''}</span>
        <button class="btn btn-primary" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${t('pd.add')}</button>
      </div>
      <p class="mini-note">${t('pd.legal')}</p>`;
    open($('#modal'));
  }

  /* ---------------- ouverture / fermeture ---------------- */
  function open(el) {
    el.classList.add('open');
    $('#overlay').classList.add('open');
    document.body.classList.add('is-locked');
  }
  function closeAll() {
    $('#lightbox').classList.remove('open');
    $('#drawer').classList.remove('open');
    $('#modal').classList.remove('open');
    $('#overlay').classList.remove('open');
    document.body.classList.remove('is-locked');
  }

  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2ec27e" stroke-width="2.4" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg><span>${esc(msg)}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.classList.add('leaving'); setTimeout(() => el.remove(), 220); }, 2600);
  }

  /* ---------------- contrôle d'âge ---------------- */
  function ageGate() {
    const gate = $('#agegate');
    if (load('vapeone.age', null) === true) return;
    gate.hidden = false;
    document.body.classList.add('is-locked');

    $('#ageYes').addEventListener('click', () => {
      save('vapeone.age', true);
      gate.hidden = true;
      document.body.classList.remove('is-locked');
    });
    $('#ageNo').addEventListener('click', () => {
      $('#ageDenied').hidden = false;
      $('#ageYes').disabled = true;
      $('#ageNo').disabled = true;
    });
  }

  /* ---------------- événements ---------------- */
  function wire() {
    document.addEventListener('click', e => {
      const tg = e.target;

      const lang = tg.closest('[data-lang]');
      if (lang) { setLang(lang.dataset.lang); return; }

      const wa = tg.closest('[data-wa]');
      if (wa) { e.preventDefault(); openWa(wa.dataset.wa); return; }

      const chip = tg.closest('[data-cat]');
      if (chip) { state.cat = chip.dataset.cat; renderGrid(); return; }

      const add = tg.closest('[data-add]');
      if (add) { addToCart(add.dataset.add); return; }

      const openP = tg.closest('[data-open]');
      if (openP) { openModal(openP.dataset.open); return; }

      const goto = tg.closest('[data-goto]');
      if (goto) {
        state.cat = goto.dataset.goto;
        state.q = ''; $('#search').value = '';
        renderGrid();
        $('#boutique').scrollIntoView({ behavior: 'smooth' });
        $('#mainNav').classList.remove('open');
        return;
      }

      const inc = tg.closest('[data-inc]');
      if (inc) { setQty(inc.dataset.inc, (state.cart[inc.dataset.inc] || 0) + 1); return; }
      const dec = tg.closest('[data-dec]');
      if (dec) { setQty(dec.dataset.dec, (state.cart[dec.dataset.dec] || 0) - 1); return; }
      const del = tg.closest('[data-del]');
      if (del) { setQty(del.dataset.del, 0); return; }

      const shot = tg.closest('#shopGallery .shot');
      if (shot) { openLightbox($$('#shopGallery .shot').indexOf(shot)); return; }
      if (tg.closest('#lbPrev')) { stepLightbox(-1); return; }
      if (tg.closest('#lbNext')) { stepLightbox(1); return; }
      if (tg.closest('#lbClose') || tg.id === 'lightbox') { closeLightbox(); return; }

      if (tg.closest('#openCart')) { open($('#drawer')); return; }
      if (tg.closest('#closeCart') || tg.closest('#closeModal') || tg.id === 'overlay') { closeAll(); return; }

      if (tg.closest('#burger')) {
        const nav = $('#mainNav');
        nav.classList.toggle('open');
        $('#burger').setAttribute('aria-expanded', String(nav.classList.contains('open')));
        return;
      }
      if (tg.closest('.main-nav a')) $('#mainNav').classList.remove('open');
    });

    document.addEventListener('keydown', e => {
      const lbOpen = $('#lightbox').classList.contains('open');
      if (e.key === 'Escape') { lbOpen ? closeLightbox() : closeAll(); return; }
      if (!lbOpen) return;
      if (e.key === 'ArrowRight') stepLightbox(state.lang === 'ar' ? -1 : 1);
      if (e.key === 'ArrowLeft')  stepLightbox(state.lang === 'ar' ? 1 : -1);
    });

    /* balayage tactile */
    let x0 = null;
    $('#lightbox').addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    $('#lightbox').addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) stepLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    let timer;
    $('#search').addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => { state.q = e.target.value; renderGrid(); }, 160);
    });
    $('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });

    const fid = $('#fidForm');
    if (fid) fid.addEventListener('submit', fidelitySubmit);
  }

  /* ---------------- démarrage ---------------- */
  function init() {
    /* Chaque accès est protégé : si un élément manque (page plus ancienne que
       le script, en cache par exemple), la boutique continue de fonctionner. */
    const set = (sel, prop, val) => { const el = $(sel); if (el) el[prop] = val; };

    set('#year', 'textContent', new Date().getFullYear());
    set('#statRefs', 'textContent', PRODUCTS.length);
    const kit = PRODUCTS.find(p => p.category === 'rechargeable');
    const section = $('#rechargeable');
    if (!section) { /* section absente */ }
    else if (kit) {
      const bv = $('#bannerVisual');
      if (bv) { bv.innerHTML = media(kit, 'banner'); bv.classList.toggle('has-img', !!kit.image); }
    } else {
      section.hidden = true;
      const lien = $('.main-nav a[href="#rechargeable"]');
      if (lien) lien.remove();
    }

    set('#waNumber', 'textContent', SHOP.phoneDisplay);
    set('#waNumber', 'href', waLink(''));
    set('#shopPhone', 'textContent', SHOP.phoneDisplay);
    set('#shopPhone', 'href', 'tel:' + SHOP.phoneDisplay.replace(/\s/g, ''));
    set('#shopMail', 'textContent', SHOP.email);
    set('#shopMail', 'href', 'mailto:' + SHOP.email);
    set('#mapsBtn', 'href', SHOP.mapsUrl);
    set('#mapCard', 'href', SHOP.mapsUrl);
    renderSocials();

    if (SHOP.loyalty) {
      set('#loyaltyRatio', 'textContent', L(SHOP.loyalty.ratio));
      set('#loyaltyReward', 'textContent', L(SHOP.loyalty.reward));
    }

    renderGallery();
    renderFootCats();
    setLang(load('vapeone.lang', 'fr'));
    wire();
    ageGate();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

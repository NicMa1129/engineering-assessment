const win = window;

win.flex = function (baseFontSize, fontscale) {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;
  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;

  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    dpr = 1;
  }

  let metaEl = doc.querySelector('meta[name="viewport"]');

  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no');
  }
  let scale = 1 / dpr;

  scale = scale > 1 ? 1 : scale;
  metaEl.setAttribute('content',
    (`width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},viewport-fit=cover`)
  );

  window.scale = scale;
  doc.documentElement.style.fontSize = (`${_baseFontSize / 2 * dpr * _fontscale}px`);
};

win.flex(100, 1);

// Re-calc root font-size when page is resized
win.addEventListener('resize', () => { win.flex(100, 1); });

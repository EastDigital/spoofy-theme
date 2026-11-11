/**
 * fetchCache
 * hasInFetchCache
 * normalizeSectionId
 * fetchConfig
 * debounce
 * throttle
 * formatMoney
 * $4 $$4 $id4
 * matchMediaQuery
 * onMediaQueryChange
 * createImg
 * renderSrcset
 * requestIdleCallback
 * waitForEvent
 */

// In-memory cache Map
const genericCache = new Map();

/**
 * Fetch with in-memory cache and custom options.
 * @param {string} url - The URL to fetch.
 * @param {string} prefix
 * @param {object} [options={}] - Fetch options (method, headers, body, etc).
 * @returns {Promise<Response>} - Cached or fetched Response.
 */
export async function fetchCache(url, prefix = '', options = {}) {
  // console.log(genericCache)
  // Use JSON.stringify of both URL and options to uniquely cache
  const cacheKey = url + prefix;
  if (genericCache.has(cacheKey)) {
    const { body, headers } = genericCache.get(cacheKey);
    return Promise.resolve(new Response(body, { headers }));
  }

  const res = await fetch(url, options);
  if (res.status === 200) {
    const clone = res.clone();

    const body = await clone.text(); // safe for most content types
    const headersObj = {};
    for (const [key, value] of clone.headers.entries()) {
      headersObj[key] = value;
    }

    genericCache.set(cacheKey, { body, headers: headersObj });
  }
  return res;
}

export function hasInFetchCache(urlPrefix) {
  return genericCache.has(urlPrefix)
}

// const SECTION_ID_PREFIX = 'shopify-section-';
/**
 * Builds a section selector
 * @param {string} sectionId - The section ID
 * @returns {string} The section selector
 */
// export function buildSectionSelector(sectionId) {
//   return `${SECTION_ID_PREFIX}${sectionId}`;
// }

/**
 * Normalizes a section ID
 * @param {string} sectionId - The section ID
 * @returns {string} The normalized section ID
 */
// export function normalizeSectionId(sectionId) {
//   return sectionId.replace(new RegExp(`^${SECTION_ID_PREFIX}`), '');
// }

/**
 * Creates a fetch configuration object
 * @param {string} [type] The type of response to expect
 * @param {Object} [config] The config of the request
 * @param {FetchConfig['body']} [config.body] The body of the request
 * @param {FetchConfig['headers']} [config.headers] The headers of the request
 * @returns {RequestInit} The fetch configuration object
 */
export function fetchConfig(type = 'json', config = {}) {
  /** @type {Headers} */
  const headers = { 'Content-Type': 'application/json', Accept: `application/${type}`, ...config.headers };

  if (type === 'javascript') {
    headers['X-Requested-With'] = 'XMLHttpRequest';
    delete headers['Content-Type'];
  }

  return {
    method: 'POST',
    headers: /** @type {HeadersInit} */ (headers),
    body: config.body,
  };
}

/**
 * Creates a debounced function that delays calling the provided function (fn)
 * until after wait milliseconds have elapsed since the last time
 * the debounced function was invoked. The returned function has a .cancel()
 * method to cancel any pending calls.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} fn The function to debounce
 * @param {number} wait The time (in milliseconds) to wait before calling fn
 * @returns {T & { cancel(): void }} A debounced version of fn with a .cancel() method
 */
export function debounce(fn, wait) {
  /** @type {number | undefined} */
  let timeout;

  /** @param {...any} args */
  function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  }

  // Add the .cancel method:
  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return /** @type {T & { cancel(): void }} */ (debounced);
}

/**
 * Creates a throttled function that calls the provided function (fn) at most once per every wait milliseconds
 *
 * @template {(...args: any[]) => any} T
 * @param {T} fn The function to throttle
 * @param {number} delay The time (in milliseconds) to wait before calling fn
 * @returns {T & { cancel(): void }} A throttled version of fn with a .cancel() method
 */
export function throttle(callback) {
  let requestId = null;
  let lastArgs = null;

  const throttled = function (...args) {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        callback.apply(this, lastArgs);
        requestId = null;
        lastArgs = null;
      });
    }
  };

  throttled.cancel = () => {
    if (requestId !== null) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  };

  return throttled;
}
// export function throttleWithDelay(fn, delay) {
//   let lastCall = 0;

//   /** @param {...any} args */
//   function throttled(...args) {
//     const now = performance.now();
//     // If the time since the last call exceeds the delay, execute the callback
//     if (now - lastCall >= delay) {
//       lastCall = now;
//       fn.apply(this, args);
//     }
//   }

//   throttled.cancel = () => {
//     lastCall = performance.now();
//   };

//   return /** @type {T & { cancel(): void }} */ (throttled);
// }

/**
 * Format a money value
 * @param {string} cents The cents to format
 * @returns {string} The formatted value
 */

const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
function defaultTo(value2, defaultValue) {
  return value2 == null || value2 !== value2 ? defaultValue : value2;
}
function formatWithDelimiters(number, precision, thousands, decimal) {
  precision = defaultTo(precision, 2);
  thousands = defaultTo(thousands, ",");
  decimal = defaultTo(decimal, ".");
  if (isNaN(number) || number == null) {
    return 0;
  }
  number = (number / 100).toFixed(precision);
  let parts = number.split("."), dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands), centsAmount = parts[1] ? decimal + parts[1] : "";
  return dollarsAmount + centsAmount;
}
export function formatMoney(cents, format = "") {
  if (typeof cents === "string") {
    cents = cents.replace(".", "");
  }
  const formatString = format || window.themeHDN.settings.moneyFormat;
  let value = "";
  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_space_separator":
      value = formatWithDelimiters(cents, 2, " ", ".");
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_with_apostrophe_separator":
      value = formatWithDelimiters(cents, 2, "'", ".");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    case "amount_no_decimals_with_space_separator":
      value = formatWithDelimiters(cents, 0, " ");
      break;
    case "amount_no_decimals_with_apostrophe_separator":
      value = formatWithDelimiters(cents, 0, "'");
      break;
  }
  if (formatString.indexOf("with_comma_separator") !== -1) {
    return formatString.replace(placeholderRegex, value);
  } else {
    return formatString.replace(placeholderRegex, value);
  }
}

// Selector
export function $4(selector, container = document) {
	return container.querySelector(selector);
};
export function $id4(selector) {
  return document.getElementById(selector);
}
export function $$4(selector, container = document) {
  return [...container.querySelectorAll(selector)];
}

/**
 * Map of predefined media queries
 */
const predefinedMediaQueries = {
  mobile: 'screen and (max-width: 767px)',
  tablet: 'screen and (min-width: 768px) and (max-width: 1149px)',
  hover: 'screen and (hover: hover) and (pointer: fine)',
  motion: '(prefers-reduced-motion: no-preference)',
  //motionReduce: '(prefers-reduced-motion: reduce)',
};
/**
 * Check whether a media query matches the current environment
 *
 * @param {string} type - Either a predefined key (e.g. "mobile") or a raw media query string.
 * @returns {boolean} - true if it matches, false otherwise
 */
export function matchMediaQuery(type) {
  return window.matchMedia(predefinedMediaQueries[type] || type).matches;
}
/**
 * Add a listener to media query changes
 *
 * @param {string} type - Predefined key or raw media query string
 * @param {(event: MediaQueryListEvent) => void} callback - Handler function
 * @returns {MediaQueryList} - The MediaQueryList object so you can manage/remove later if needed
 */
// export function onMediaQueryChange(type, callback) {
//   const mql = window.matchMedia(predefinedMediaQueries[type] || type);
//   mql.addEventListener('change', callback);
//   return mql;
// }
// onMediaQueryChange('mobile', (e) => {
//   console.log('Mobile media query changed:', e.matches);
// });

/**
 * Create an <img> element with given width and height
 * @param {Object} imgObj
 * @returns {HTMLImageElement}
 */
export function createImg(imgObj = {}) {
  const img = new Image(),
  attrs = imgObj.attrs || {},
  {alt, src} = imgObj;
  for (const key in attrs) {
    img.setAttribute(key, attrs[key]);
  }
  img.alt = alt || "";
  img.src = src;
  img.srcset = renderSrcset(src, JSON.parse(attrs['data-widths']));

  if (imgObj.onload) {
    img.addEventListener("load", function() {
      const parentImage = img.parentElement || img;
      parentImage.removeAttribute('loading');
      parentImage.setAttribute('loaded', '');
    }, {once : true});
  }
  return img;
}
/**
 * Ensure the image src starts with 'https://'
 * @param {string} src - Original image URL
 * @returns {string} Normalized image URL
 */
function normalizeImageSrc(src) {
  if (/^https?:\/\//.test(src)) {
    return src;
  }
  return `https://${src.replace(/^\/+/, '')}`;
}
export function renderSrcset(baseSrc, widths) {
  const url = new URL(normalizeImageSrc(baseSrc)),
      maxWidth = parseInt( url.searchParams.get("width") || widths[widths.length - 1]);
  return widths
    .filter((w) => w <= maxWidth)
    .map((w) => {
      url.searchParams.set('width', w);
      return `${url.toString()} ${w}w`;
    })
    .join(', ');
}

/**
 * Request an idle callback or fallback to setTimeout
 * @returns {function} The requestIdleCallback function
 */
export const requestIdleCallback =
  typeof window.requestIdleCallback == 'function' ? window.requestIdleCallback : setTimeout;

/**
 * Wait for a specific event on a DOM element, then resolve with the event object.
 *
 * @param {string|Element} target - CSS selector or DOM element
 * @param {string} eventName - Event name (e.g. 'click', 'mouseover', 'submit')
 * @returns {Promise<Event>} Resolves when the event is triggered
 */
// export function waitForEvent(target, eventName) {
//   return new Promise((resolve, reject) => {
//     const el = typeof target === 'string' ? document.querySelector(target) : target;
//     if (!el) {
//       reject(new Error(`Element not found: ${target}`));
//       return;
//     }

//     const handler = (event) => {
//       el.removeEventListener(eventName, handler); // Auto-remove after 1 trigger
//       resolve(event);
//     };

//     el.addEventListener(eventName, handler);
//   });
// }
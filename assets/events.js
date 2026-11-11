export class ThemeEvents {

  /** @static @constant {string} Event triggered when a dialog is opening */
  static dialogOpening = 'dialog:opening';
  /** @static @constant {string} Event triggered when a dialog is opened */
  static dialogOpen = 'dialog:open';
  /** @static @constant {string} Event triggered when a dialog is closing */
  static dialogClosing = 'dialog:closing';
  /** @static @constant {string} Event triggered when a dialog is closed */
  static dialogClose = 'dialog:close';


  /** @static @constant {string} Event triggered when a countdown is start */
  static CountdownStart = 'countdown:start';
  /** @static @constant {string} Event triggered when a countdown is end */
  static CountdownEnd = 'countdown:end';

  /** @static @constant {string} Event triggered when a variant is selected */
  static variantSelected = 'variant:selected';
  /** @static @constant {string} Event triggered when a variant is changed */
  static variantUpdate = 'variant:update';

  /** @static @constant {string} Event triggered when the cart items or quantities are updated */
  static cartUpdate = 'cart:update';
  /** @static @constant {string} Event triggered when want the cart reload */
  static cartReload = 'cart:reload';
  /** @static @constant {string} Event triggered when cart count is changed */
  static cartCount = 'cart:count:update';
  /** @static @constant {string} Event triggered when a cart update fails */
  static cartError = 'cart:error';
  /** @static @constant {string} Event triggered when a discount is applied */
  static discountUpdate = 'discount:update';
  /** @static @constant {string} Event triggered when currency need update */
  static currencyUpdate = 'currency:update';
  /** @static @constant {string} Event triggered when cart drawer update */
  static cartDrawerRender = 'cart:drawer:render';
  /** @static @constant {string} Event triggered when cart main update */
  static cartMainRender = 'cart:main:render';

  /** @static @constant {string} Event triggered when changing collection filters */
  static filterUpdate = 'filter:update';
  /** @static @constant {string} Event triggered when a media (video, 3d model) is loaded */
  static mediaStartedPlaying = 'media:started-playing';
  /** @static @constant {string} Event triggered when a zoom dialog media is selected */
  static zoomMediaSelected = 'zoom-media:selected';
  // Event triggered when quantity-selector value is changed
  static quantitySelectorUpdate = 'quantity-selector:update';
  /** @static @constant {string} Event triggered when a predictive search is expanded */
  static megaMenuHover = 'megaMenu:hover';
}
export class CartCountEvent extends Event {
  /**
   * Creates a new CartCountEvent
   * @param {Object} detail - The event detail
   * @param {number} detail.item_count - The updated item count
   */
  constructor(item_count) {
    super(ThemeEvents.cartCount, { bubbles: false });
    this.detail = { item_count };
  }
}

/**
 * Event class for cart updates
 * @extends {Event}
 */
export class CartUpdateEvent extends Event {
  /**
   * Creates a new CartUpdateEvent
   * @param {Object} resource - The new cart object
   * @param {string} sourceId - The id of the element the action was triggered from
   * @param {Object} [data] - Additional event data
   * @param {boolean} [data.didError] - Whether the cart operation failed
   * @param {string} [data.source] - The source of the cart update
   * @param {string} [data.productId] - The id of the product card that was updated
   * @param {number} [data.itemCount] - The number of items in the cart
   * @param {string} [data.variantId] - The id of the product variant that was updated
   * @param {Record<string, string>} [data.sections] - The sections affected by the cart operation
   */
  constructor(resource, sourceId, cartData, actionAfterATC, source, data) {
    super(ThemeEvents.cartUpdate, { bubbles: true });
    this.detail = {
      resource,
      sourceId,
      cartData,
      actionAfterATC,
      source,
      data: {
        ...data,
      },
    };
  }
}

/**
 * Event class for cart additions
 * @extends {Event}
 */
export class CartAddEvent extends Event {
  /**
   * Creates a new CartAddEvent
   * @param {Object} [resource] - The new cart object
   * @param {string} [sourceId] - The id of the element the action was triggered from
   * @param {Object} [data] - Additional event data
   * @param {boolean} [data.didError] - Whether the cart operation failed
   * @param {string} [data.source] - The source of the cart update
   * @param {string} [data.productId] - The id of the product card that was updated
   * @param {number} [data.itemCount] - The number of items in the cart
   * @param {string} [data.variantId] - The id of the product variant that was added
   * @param {Record<string, string>} [data.sections] - The sections affected by the cart operation
   */
  constructor(resource, sourceId, cartData, actionAfterATC, source, data) {
    super(CartAddEvent.eventName, { bubbles: true });
    this.detail = {
      resource,
      sourceId,
      cartData,
      actionAfterATC,
      source,
      data: {
        ...data,
      },
    };
  }

  static eventName = ThemeEvents.cartUpdate;
}

/**
 * Event class for quantity-selector updates
 * @extends {Event}
 */
export class QuantitySelectorUpdateEvent extends Event {
  /**
   * Creates a new QuantitySelectorUpdateEvent
   * @param {number} quantity - Quantity value
   * @param {number} [line] - The id of the updated cart line
   */
  constructor(quantity, line) {
    super(ThemeEvents.quantitySelectorUpdate, { bubbles: true });
    this.detail = {
      quantity,
      line,
    };
  }
}

/**
 * Event class for cart errors
 * @extends {Event}
 */
export class CartErrorEvent extends Event {
  /**
   * Creates a new CartErrorEvent
   * @param {string} sourceId - The id of the element the action was triggered from
   * @param {string} message - A message from the server response
   */
  constructor(sourceId, message) {
    super(ThemeEvents.cartError, { bubbles: true });
    this.detail = {
      sourceId,
      data: {
        message,
      },
    };
  }
}
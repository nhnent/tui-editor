/**
 * @fileoverview Implements popup code block languages
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import inArray from 'tui-code-snippet/array/inArray';
import toArray from 'tui-code-snippet/collection/toArray';
import extend from 'tui-code-snippet/object/extend';
import css from 'tui-code-snippet/domUtil/css';
import addClass from 'tui-code-snippet/domUtil/addClass';
import removeClass from 'tui-code-snippet/domUtil/removeClass';
import matches from 'tui-code-snippet/domUtil/matches';

import LayerPopup from './layerpopup';

const BUTTON_CLASS_PREFIX = 'te-popup-code-block-lang-';

/**
 * Class Popup code block languages select list
 * @param {LayerPopupOption} options - layer popup option
 * @ignore
 */
class PopupCodeBlockLanguages extends LayerPopup {
  constructor(options) {
    const popupButtonsHTML = [];
    const { languages } = options;

    languages.forEach(lang =>
      popupButtonsHTML.push(
        `<button type="button" class="${BUTTON_CLASS_PREFIX}${lang}" data-lang="${lang}">${lang}</button>`
      )
    );

    options = extend(
      {
        header: false,
        className: 'te-popup-code-block-languages',
        content: popupButtonsHTML.join('')
      },
      options
    );
    super(options);
  }

  /**
   * init instance.
   * store properties & prepare before initialize DOM
   * @param {LayerPopupOption} options - layer popup options
   * @private
   * @override
   */
  _initInstance(options) {
    super._initInstance(options);

    this._onSelectedLanguage = null;
    this._onDismissed = null;
    this._currentButton = null;
    this._buttons = null;
    this._languages = options.languages;

    this.eventManager = options.eventManager;
  }

  /**
   * initialize DOM, render popup
   * @private
   * @override
   */
  _initDOM(options) {
    super._initDOM(options);

    css(this.el, 'zIndex', 10000);

    this._buttons = toArray(this.el.querySelectorAll('button'));
    this._activateButtonByIndex(0);
  }

  /**
   * bind DOM events
   * @private
   * @override
   */
  _initDOMEvent() {
    super._initDOMEvent();

    const handler = event => {
      const language = event.target.getAttribute('data-lang');

      if (this._onSelectedLanguage) {
        this._onSelectedLanguage(language);
      }
      this.hide();
    };

    this._languages.forEach(lang => this.on(`mousedown .${BUTTON_CLASS_PREFIX}${lang}`, handler));
  }

  /**
   * bind editor events
   * @private
   * @override
   */
  _initEditorEvent() {
    super._initEditorEvent();

    this.eventManager.listen('openPopupCodeBlockLanguages', data => {
      this.show(data.callback);
      const elementStyle = this.el.style;

      elementStyle.top = `${data.offset.top}px`;
      elementStyle.left = `${data.offset.left}px`;

      this.setCurrentLanguage(data.language);

      return this;
    });
    this.eventManager.listen('focus', () => this.hide());
    this.eventManager.listen('mousedown', () => this.hide());
    this.eventManager.listen('closeAllPopup', () => this.hide());
    this.eventManager.listen('closePopupCodeBlockLanguages', () => this.hide());
    this.eventManager.listen('scroll', () => this.hide());
  }

  /**
   * activate an item by index
   * @param {number} index - item index
   * @private
   */
  _activateButtonByIndex(index) {
    if (this._currentButton) {
      removeClass(this._currentButton, 'active');
    }

    if (this._buttons.length) {
      this._currentButton = this._buttons[index];
      addClass(this._currentButton, 'active');
      this._currentButton.scrollIntoView();
    }
  }

  /**
   * move to prev language
   */
  prev() {
    let index = inArray(this._currentButton, this._buttons) - 1;

    if (index < 0) {
      index = this._buttons.length - 1;
    }
    this._activateButtonByIndex(index);
  }

  /**
   * move to next language
   */
  next() {
    let index = inArray(this._currentButton, this._buttons) + 1;

    if (index >= this._buttons.length) {
      index = 0;
    }
    this._activateButtonByIndex(index);
  }

  /**
   * current language
   * @returns {string} language
   */
  getCurrentLanguage() {
    const language = this._currentButton.getAttribute('data-lang');

    return language;
  }

  /**
   * set current language
   * @param {string} language - current language
   */
  setCurrentLanguage(language) {
    const item = this._buttons.filter(button =>
      matches(button, `.${BUTTON_CLASS_PREFIX}${language}`)
    );

    if (item.length > 0) {
      const index = inArray(item[0], this._buttons);

      this._activateButtonByIndex(index);
    }
  }

  /**
   * show popup
   * @param {object} callback - to be called on language selected & dismissed
   * @override
   */
  show(callback) {
    this._onSelectedLanguage = callback.selected;
    this._onDismissed = callback.dismissed;
    super.show();
  }

  /**
   * hide popup
   * @override
   */
  hide() {
    if (this._onDismissed) {
      this._onDismissed();
    }
    this._onSelectedLanguage = null;
    this._onDismissed = null;
    super.hide();
  }
}

export default PopupCodeBlockLanguages;

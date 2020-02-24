/**
 * @fileoverview Implements tooltip
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import css from 'tui-code-snippet/domUtil/css';
import domUtils from '../domUtils';

const TOOLTIP_CONTENT = '<div class="arrow"></div><span class="text"></span></span>';

/**
 * Class Tooltip
 * @ignore
 */
class Tooltip {
  constructor() {
    this.el = this.createTooltipElement();

    document.body.appendChild(this.el);

    this.hide();
  }

  createTooltipElement() {
    const wrapper = document.createElement('div');

    wrapper.className = 'tui-tooltip';
    wrapper.innerHTML = TOOLTIP_CONTENT;

    return wrapper;
  }

  /**
   * show tooltop
   * @param {HTMLElement} target - target element to bind
   * @param {String} text - text to show
   */
  show(target, text) {
    const { top, left } = domUtils.getOffset(target);

    css(this.el, {
      top: `${top + domUtils.getHeight(target) + 13}px`, // below the button
      left: `${left + 3}px`
    });

    this.el.querySelector('.text').innerHTML = text;

    this.el.style.display = 'block';
  }

  hide() {
    this.el.style.display = 'none';
  }

  remove() {
    domUtils.remove(this.el);
  }
}

export default new Tooltip();

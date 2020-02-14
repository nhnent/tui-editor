/**
 * @fileoverview Implements preview
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import LazyRunner from './lazyRunner';
import { empty } from './utils/dom';

/**
 * Class Preview
 * @param {HTMLElement} el - Container element for preview
 * @param {EventManager} eventManager -  Event manager instance
 * @param {Convertor} convertor - Convertor instance
 * @param {boolean} isViewer - whether viewer mode or not
 * @param {Number} delayTime - lazyRunner delay time
 * @ignore
 */
class Preview {
  constructor(el, eventManager, convertor, isViewer, delayTime = 800) {
    this.eventManager = eventManager;
    this.convertor = convertor;
    this.el = el;
    this.isViewer = !!isViewer;

    this._initContentSection();

    this.lazyRunner = new LazyRunner();

    this.lazyRunner.registerLazyRunFunction('refresh', this.refresh, delayTime, this);
  }

  /**
   * Initialize content selection
   * @private
   */
  _initContentSection() {
    const el = document.createElement('div');

    el.className = 'tui-editor-contents';

    this._previewContent = el;
    this.el.appendChild(this._previewContent);
  }

  /**
   * Refresh rendering
   * @param {string} markdown Markdown text
   */
  refresh(markdown) {
    this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
  }

  /**
   * get html string
   * @returns {string} - html preview string
   */
  getHTML() {
    return this._previewContent.innerHTML;
  }

  /**
   * set html string
   * @param {string} html - html preview string
   */
  setHTML(html) {
    this._previewContent.innerHTML = html;
  }

  /**
   * Render HTML on preview
   * @param {string} html HTML string
   */
  render(html) {
    const { _previewContent } = this;

    html = this.eventManager.emit('previewBeforeHook', html) || html;

    empty(_previewContent);
    _previewContent.innerHTML = html;
  }

  /**
   * Set preview height
   * @param {number} height - Height for preview container
   */
  setHeight(height) {
    this.el.style.height = `${height}px`;
  }

  /**
   * set min height
   * @param {number} minHeight - min height
   */
  setMinHeight(minHeight) {
    this.el.style.minHeight = `${minHeight}px`;
  }

  /**
   * Is Preview visible
   * @returns {boolean} result
   */
  isVisible() {
    return this.el.style.display !== 'none';
  }
}

export default Preview;

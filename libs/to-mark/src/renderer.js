/**
 * @fileoverview Implements Renderer
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';


/**
 * Empty Space Regex
 * @type {Regex}
 */
var leadSpaceRx = /^\u0020/;
var trailSpaceRx = /.+\u0020$/;

/**
 * forEachOwnProperties
 * iterate properties of object
 * from https://github.com/nhnent/fe.code-snippet/blob/master/src/collection.js
 * @param {object} obj object to iterate
 * @param {function} iteratee callback function
 * @param {*} [context] context of callback
 */
function forEachOwnProperties(obj, iteratee, context) {
    var key;

    context = context || null;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (iteratee.call(context, obj[key], key, obj) === false) {
                break;
            }
        }
    }
}

/**
 * Renderer
 * @exports Renderer
 * @constructor
 * @param {object} rules rules to add
 * @class
 */
function Renderer(rules) {
    this.rules = {};

    if (rules) {
        this.addRules(rules);
    }
}

/**
 * addRule
 * Add rule
 * @param {string} selectorString rule selector
 * @param {function} converter converter function
 */
Renderer.prototype.addRule = function(selectorString, converter) {
    var selectors = selectorString.split(', '),
        selector = selectors.pop();

    while (selector) {
        this._setConverterWithSelector(selector, converter);
        selector = selectors.pop();
    }
};

/**
 * addRules
 * Add rules using object
 * @param {object} rules key(rule selector), value(converter function)
 */
Renderer.prototype.addRules = function(rules) {
    var self = this;

    forEachOwnProperties(rules, function(converter, selectorString) {
        self.addRule(selectorString, converter);
    });
};

/**
 * getSpaceControlled
 * remove flanked space of dom node
 * @param {string} content text content
 * @param {DOMElement} node current node
 * @return {string} result
 */
Renderer.prototype.getSpaceControlled = function(content, node) {
    var lead = '',
        trail = '',
        text;

    if (node.nodeType === 3) {
        if (node.previousSibling) {
            text = node.previousSibling.innerHTML || node.previousSibling.nodeValue;

            if (trailSpaceRx.test(text) || leadSpaceRx.test(node.innerHTML || node.nodeValue)) {
                lead = ' ';
            }
        }

        if (node.nextSibling) {
            text = node.nextSibling.innerHTML || node.nextSibling.nodeValue;
            if (leadSpaceRx.test(text) || trailSpaceRx.test(node.innerHTML || node.nodeValue)) {
                trail = ' ';
            }
        }
    }

    return lead + content + trail;
};

/**
 * convert
 * convert dom node to markdown using dom node and subContent
 * @param {DOMElement} node node to convert
 * @param {stirng} subContent child nodes converted text
 * @return {string} converted text
 */
Renderer.prototype.convert = function(node, subContent) {
    var result,
        converter = this._getConverter(node);

    if (converter) {
        result = converter.call(this, node, subContent);
    }

    return result || subContent;
};

/**
 * _getConverter
 * get converter function for node
 * @private
 * @param {DOMElement} node node
 * @return {function} converter function
 */
Renderer.prototype._getConverter = function (node) {
    var rulePointer = this.rules,
        converter;

    while (node && rulePointer) {
        rulePointer = this._getNextRule(rulePointer, this._getRuleNameFromNode(node));
        node = this._getPrevNode(node);

        if (rulePointer && rulePointer.converter) {
            converter = rulePointer.converter;
        }
    }

    return converter;
};

/**
 * _getNextRule
 * Get next rule object
 * @private
 * @param {object} ruleObj rule object
 * @param {string} ruleName rule tag name to find
 * @return {object} rule Object
 */
Renderer.prototype._getNextRule = function(ruleObj, ruleName) {
    return ruleObj[ruleName];
};

/**
 * _getRuleNameFromNode
 * Get proper rule tag name from node
 * @private
 * @param {DOMElement} node node
 * @return {string} rule tag name
 */
Renderer.prototype._getRuleNameFromNode = function(node) {
    return node.tagName || 'TEXT_NODE';
};

/**
 * _getPrevNode
 * Get node's available parent node
 * @private
 * @param {DOMElement} node node
 * @return {DOMElement|undefined} result
 */
Renderer.prototype._getPrevNode = function(node) {
    var parentNode = node.parentNode;

    if (parentNode && !parentNode.__htmlRootByToMark) {
        return parentNode;
    }
};

/**
 * _setConverterWithSelector
 * Set converter for selector
 * @private
 * @param {string} selectors rule selector
 * @param {function} converter converter function
 */
Renderer.prototype._setConverterWithSelector = function(selectors, converter) {
    var rulePointer = this.rules;

    this._eachSelector(selectors, function(ruleElem) {
        if (!rulePointer[ruleElem]) {
            rulePointer[ruleElem] = {};
        }

        rulePointer = rulePointer[ruleElem];
    });

    rulePointer.converter = converter;
};

/**
 * _eachSelector
 * Iterate each selectors
 * @private
 * @param {string} selectors rule selectors
 * @param {function} iteratee callback
 */
Renderer.prototype._eachSelector = function(selectors, iteratee) {
    var selectorIndex;

    selectors = selectors.split(' ');
    selectorIndex = selectors.length - 1;

    while (selectorIndex >= 0) {
        iteratee(selectors[selectorIndex]);
        selectorIndex -= 1;
    }
};

/**
 * trim
 * trim text
 * @param {string} text text be trimed
 * @return {string} trimed text
 */
Renderer.prototype.trim = function(text) {
    return text.replace(/^[\u0020\r\n\t]+|[\u0020\r\n\t]+$/g, '');
};

/**
 * Backslash escape to text
 * Apply backslash escape to text
 * @param {string} text text be processed
 * @return {string} processed text
 */
Renderer.prototype.escapeText = function(text) {
    text = text.replace(/[\(\)\*\{\}\[\]\_\`\+\-\.\!#]/g, function(matched){ // eslint-disable-line space-before-blocks
        return '\\' + matched;
    });

    return text;
};

/**
 * Renderer factory
 * return new renderer
 * @param {object} rules rule object, key(rule selector), value(converter function)
 * @return {Renderer} renderer
 */
Renderer.factory = function(rules) {
    return new Renderer(rules);
};

module.exports = Renderer;
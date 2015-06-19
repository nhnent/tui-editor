/**
 * @fileoverview Implements toMark
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var DomRunner = require('./domRunner'),
    toDom = require('./toDom'),
    basicRenderer = require('./renderer.basic'),
    gfmRenderer = require('./renderer.gfm');

var FIND_FIRST_LAST_RETURNS_RX = /^[\n]+|[\n]+$/g;

/**
 * toMark
 * @exports toMark
 * @param {string} htmlStr html string to convert
 * @param {object} options option
 * @return {string} converted markdown text
 */
function toMark(htmlStr, options) {
    var runner,
        renderer = gfmRenderer,
        markdownContent = '';

    if (!htmlStr) {
        return '';
    }

    runner = new DomRunner(toDom(htmlStr));

    while (runner.next()) {
        markdownContent += tracker(runner, renderer);
    }

    return finalize(markdownContent);
}

/**
 * finalize
 * Remove first and last return character
 * @param {string} text text to finalize
 * @return {string} result
 */
function finalize(text) {
    //remove first and last \n
    text = text.replace(FIND_FIRST_LAST_RETURNS_RX, '');
    return text;
}

/**
 * tracker
 * Iterate childNodes and process conversion using recursive call
 * @param {DomRunner} runner dom runner
 * @return {string} processed text
 */
function tracker(runner, renderer) {
    var i,
        t,
        subContent = '',
        content;

    var node = runner.getNode();

    for (i = 0, t = node.childNodes.length; i < t; i += 1) {
        runner.next();
        subContent += tracker(runner, renderer);
    }

    content = renderer.convert(node, subContent);

    return content;
}

module.exports = toMark;

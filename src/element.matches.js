import _ from "./utils";
import $Element from "./element";
import SelectorMatcher from "./selectormatcher";

/**
 * CSS selector matching support
 * @module matches
 */

var hooks = {};

/**
 * Check if the element matches selector
 * @memberOf module:matches
 * @param  {String}   selector  css selector for checking
 * @return {$Element}
 */
$Element.prototype.matches = function(selector) {
    if (!selector || typeof selector !== "string") throw _.makeError("matches");

    var checker = hooks[selector] || SelectorMatcher(selector),
        node = this._._node;

    return node && !!checker(node);
};

// $Element.matches hooks

hooks[":focus"] = (node) => node === document.activeElement;

hooks[":hidden"] = (node) => {
    return node.getAttribute("aria-hidden") === "true" ||
        _.computeStyle(node).display === "none" || !_.docEl.contains(node);
};

hooks[":visible"] = (node) => !hooks[":hidden"](node);

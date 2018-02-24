// import { assert } from '../../utils/helpers';
var SPLIT_PANE_MAIN = 'split-pane-main';
var SPLIT_PANE_SIDE = 'split-pane-side';
var QUERY = {
    'xs': '(min-width: 0px)',
    'sm': '(min-width: 576px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 992px)',
    'xl': '(min-width: 1200px)',
    'never': ''
};
var SplitPane = /** @class */ (function () {
    function SplitPane() {
        this.visible = false;
        /**
         * @input {boolean} If `false`, the split-pane is disabled, ie. the side pane will
         * never be displayed. Default `true`.
         */
        this.enabled = true;
        /**
         * @input {string | boolean} When the split-pane should be shown.
         * Can be a CSS media query expression, or a shortcut expression.
         * Can also be a boolean expression.
         */
        this.when = QUERY['md'];
    }
    SplitPane.prototype["componentDidLoad"] = function () {
        this._styleChildren();
        this._updateQuery();
    };
    SplitPane.prototype["componentDidUnload"] = function () {
        this.rmL && this.rmL();
        this.rmL = null;
    };
    SplitPane.prototype._styleChildren = function () {
        var children = this.ele.children;
        var nu = this.ele.childElementCount;
        var foundMain = false;
        for (var i = 0; i < nu; i++) {
            var child = children[i];
            var isMain = child.hasAttribute('main');
            if (isMain) {
                if (foundMain) {
                    console.warn('split pane can not have more than one main node');
                    return;
                }
                foundMain = true;
            }
            setPaneClass(child, isMain);
        }
        if (!foundMain) {
            console.warn('split pane could not found any main node');
        }
    };
    SplitPane.prototype._updateQuery = function () {
        var _this = this;
        this.rmL && this.rmL();
        this.rmL = null;
        // Check if the split-pane is disabled
        if (!this.enabled) {
            this._setVisible(false);
            return;
        }
        // When query is a boolean
        var query = this.when;
        if (typeof query === 'boolean') {
            this._setVisible(query);
            return;
        }
        // When query is a string, let's find first if it is a shortcut
        var defaultQuery = QUERY[query];
        var mediaQuery = (defaultQuery)
            ? defaultQuery
            : query;
        // Media query is empty or null, we hide it
        if (!mediaQuery || mediaQuery.length === 0) {
            this._setVisible(false);
            return;
        }
        // Listen on media query
        var callback = function (q) { return _this._setVisible(q.matches); };
        var mediaList = window.matchMedia(mediaQuery);
        mediaList.addListener(callback);
        this.rmL = function () { return mediaList.removeListener(callback); };
        this._setVisible(mediaList.matches);
    };
    SplitPane.prototype._setVisible = function (visible) {
        if (this.visible !== visible) {
            this.visible = visible;
            var detail = { splitPane: this };
            this.ionChange.emit(detail);
            this.ionSplitPaneDidChange.emit(detail);
        }
    };
    /**
     * @hidden
     */
    SplitPane.prototype.isVisible = function () {
        return this.visible;
    };
    SplitPane.prototype.isPane = function (element) {
        if (!this.visible) {
            return false;
        }
        return element.parentElement === this.ele
            && element.classList.contains(SPLIT_PANE_SIDE);
    };
    SplitPane.prototype.hostData = function () {
        return {
            class: {
                'split-pane-visible': this.visible
            }
        };
    };
    SplitPane.prototype.render = function () {
        return h(0, 0);
    };
    return SplitPane;
}());
export { SplitPane };
function setPaneClass(ele, isMain) {
    var toAdd;
    var toRemove;
    if (isMain) {
        toAdd = SPLIT_PANE_MAIN;
        toRemove = SPLIT_PANE_SIDE;
    }
    else {
        toAdd = SPLIT_PANE_SIDE;
        toRemove = SPLIT_PANE_MAIN;
    }
    var classList = ele.classList;
    classList.add(toAdd);
    classList.remove(toRemove);
}

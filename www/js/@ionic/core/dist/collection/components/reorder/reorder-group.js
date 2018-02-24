import { reorderArray } from '../../utils/helpers';
import { CSS_PROP } from '../animation-controller/constants';
// const AUTO_SCROLL_MARGIN = 60;
//  const SCROLL_JUMP = 10;
var ITEM_REORDER_ACTIVE = 'reorder-active';
var ReorderIndexes = /** @class */ (function () {
    function ReorderIndexes(from, to) {
        this.from = from;
        this.to = to;
    }
    ReorderIndexes.prototype.applyTo = function (array) {
        reorderArray(array, this);
    };
    return ReorderIndexes;
}());
export { ReorderIndexes };
var ReorderGroup = /** @class */ (function () {
    function ReorderGroup() {
        this.selectedItemEle = null;
        this.cachedHeights = [];
        this._enabled = false;
        this._iconVisible = false;
        this._actived = false;
        this.enabled = false;
    }
    /**
     * @input {string} Which side of the view the ion-reorder should be placed. Default `"end"`.
     */
    ReorderGroup.prototype.enabledChanged = function (enabled) {
        var _this = this;
        if (enabled) {
            this._enabled = true;
            Context.dom.raf(function () {
                _this._iconVisible = true;
            });
        }
        else {
            this._iconVisible = false;
            setTimeout(function () { return _this._enabled = false; }, 400);
        }
    };
    ReorderGroup.prototype["componentDidLoad"] = function () {
        this.containerEle = this.ele.querySelector('ion-gesture');
    };
    ReorderGroup.prototype["componentDidUnload"] = function () {
        this.onDragEnd();
    };
    ReorderGroup.prototype.canStart = function (ev) {
        if (this.selectedItemEle) {
            return false;
        }
        var target = ev.event.target;
        var reorderEle = target.closest('[reorderAnchor]');
        if (!reorderEle) {
            return false;
        }
        var item = findReorderItem(reorderEle, this.containerEle);
        if (!item) {
            console.error('reorder node not found');
            return false;
        }
        ev.data = item;
        return true;
    };
    ReorderGroup.prototype.onDragStart = function (ev) {
        var item = this.selectedItemEle = ev.data;
        var heights = this.cachedHeights;
        heights.length = 0;
        var ele = this.containerEle;
        var children = ele.children;
        if (!children || children.length === 0) {
            return;
        }
        var sum = 0;
        for (var i = 0, ilen = children.length; i < ilen; i++) {
            var child = children[i];
            sum += child.offsetHeight;
            heights.push(sum);
            child.$ionIndex = i;
        }
        this.topOfList = item.getBoundingClientRect().top;
        this._actived = true;
        this.lastYcoord = -100;
        this.lastToIndex = indexForItem(item);
        this.selectedItemHeight = item.offsetHeight;
        item.classList.add(ITEM_REORDER_ACTIVE);
    };
    ReorderGroup.prototype.onDragMove = function (ev) {
        var selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        // ev.event.preventDefault();
        // // Get coordinate
        var posY = ev.deltaY;
        // Scroll if we reach the scroll margins
        // const scrollPosition = this.scroll(posY);
        // Only perform hit test if we moved at least 30px from previous position
        if (Math.abs(posY - this.lastYcoord) > 30) {
            var toIndex = this.itemIndexForDelta(posY);
            if (toIndex !== undefined && (toIndex !== this.lastToIndex)) {
                var fromIndex = indexForItem(selectedItem);
                this.lastToIndex = toIndex;
                this.lastYcoord = posY;
                this._reorderMove(fromIndex, toIndex, this.selectedItemHeight);
            }
        }
        // Update selected item position
        selectedItem.style[CSS_PROP.transformProp] = "translateY(" + posY + "px)";
    };
    ReorderGroup.prototype.onDragEnd = function () {
        var _this = this;
        this._actived = false;
        var selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        // if (ev.event) {
        //   ev.event.preventDefault();
        //   ev.event.stopPropagation();
        // }
        var toIndex = this.lastToIndex;
        var fromIndex = indexForItem(selectedItem);
        var ref = (fromIndex < toIndex)
            ? this.containerEle.children[toIndex + 1]
            : this.containerEle.children[toIndex];
        this.containerEle.insertBefore(this.selectedItemEle, ref);
        var children = this.containerEle.children;
        var len = children.length;
        var transform = CSS_PROP.transformProp;
        for (var i = 0; i < len; i++) {
            children[i].style[transform] = '';
        }
        var reorderInactive = function () {
            _this.selectedItemEle.style.transition = '';
            _this.selectedItemEle.classList.remove(ITEM_REORDER_ACTIVE);
            _this.selectedItemEle = null;
        };
        if (toIndex === fromIndex) {
            selectedItem.style.transition = 'transform 200ms ease-in-out';
            setTimeout(reorderInactive, 200);
        }
        else {
            reorderInactive();
        }
    };
    ReorderGroup.prototype.itemIndexForDelta = function (deltaY) {
        var heights = this.cachedHeights;
        var sum = deltaY + this.topOfList - (this.selectedItemHeight / 2);
        for (var i = 0; i < heights.length; i++) {
            if (heights[i] > sum) {
                return i;
            }
        }
        return null;
    };
    ReorderGroup.prototype._reorderMove = function (fromIndex, toIndex, itemHeight) {
        /********* DOM WRITE ********* */
        var children = this.containerEle.children;
        var transform = CSS_PROP.transformProp;
        for (var i = 0; i < children.length; i++) {
            var style = children[i].style;
            var value = '';
            if (i > fromIndex && i <= toIndex) {
                value = "translateY(" + -itemHeight + "px)";
            }
            else if (i < fromIndex && i >= toIndex) {
                value = "translateY(" + itemHeight + "px)";
            }
            style[transform] = value;
        }
    };
    ReorderGroup.prototype.hostData = function () {
        return {
            class: {
                'reorder-enabled': this._enabled,
                'reorder-list-active': this._actived,
                'reorder-visible': this._iconVisible
            }
        };
    };
    ReorderGroup.prototype.render = function () {
        return (h("ion-gesture", { "p": { "disableScroll": true, "canStart": this.canStart.bind(this), "onStart": this.onDragStart.bind(this), "onMove": this.onDragMove.bind(this), "onEnd": this.onDragEnd.bind(this), "enabled": this.enabled, "gestureName": 'reorder', "gesturePriority": 30, "type": 'pan', "direction": 'y', "threshold": 0, "attachTo": 'parent' } },
            h(0, 0)));
    };
    return ReorderGroup;
}());
export { ReorderGroup };
/**
 * @hidden
 */
function indexForItem(element) {
    return element['$ionIndex'];
}
/**
 * @hidden
 */
function findReorderItem(node, container) {
    var nested = 0;
    var parent;
    while (node && nested < 6) {
        parent = node.parentNode;
        if (parent === container) {
            return node;
        }
        node = parent;
        nested++;
    }
    return null;
}

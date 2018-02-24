var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createThemedClasses } from '../../utils/theme';
var Item = /** @class */ (function () {
    function Item() {
        this.ids = -1;
        this.inputs = [];
        this.itemStyles = Object.create(null);
        // constructor() {
        //   this._setName(elementRef);
        //   this._hasReorder = !!reorder;
        //   this.id = form.nextId().toString();
        //   // auto add "tappable" attribute to ion-item components that have a click listener
        //   if (!(<any>renderer).orgListen) {
        //     (<any>renderer).orgListen = renderer.listen;
        //     renderer.listen = function(renderElement: HTMLElement, name: string, callback: Function): Function {
        //       if (name === 'click' && renderElement.setAttribute) {
        //         renderElement.setAttribute('tappable', '');
        //       }
        //       return (<any>renderer).orgListen(renderElement, name, callback);
        //     };
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // @ContentChild(Label)
        // set contentLabel(label: Label) {
        //   if (label) {
        //     this._label = label;
        //     this.labelId = label.id = ('lbl-' + this.id);
        //     if (label.type) {
        //       this.setElementClass('item-label-' + label.type, true);
        //     }
        //     this._viewLabel = false;
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // @ViewChild(Label)
        // set viewLabel(label: Label) {
        //   if (!this._label) {
        //     this._label = label;
        //   }
        // }
        // /**
        //  * @hidden
        //  */
        // @ContentChildren(Icon)
        // set _icons(icons: QueryList<Icon>) {
        //   icons.forEach(icon => {
        //     icon.setElementClass('item-icon', true);
        //   });
        // }
    }
    Item.prototype.itemStyle = function (ev) {
        ev.stopPropagation();
        var hasChildStyleChange = false;
        var tagName = ev.target.tagName;
        var updatedStyles = ev.detail;
        for (var key in updatedStyles) {
            if (('item-' + key) !== key) {
                Object.defineProperty(updatedStyles, 'item-' + key, Object.getOwnPropertyDescriptor(updatedStyles, key));
                delete updatedStyles[key];
                hasChildStyleChange = true;
            }
        }
        this.itemStyles[tagName] = updatedStyles;
        // returning true tells the renderer to queue an update
        return hasChildStyleChange;
    };
    // TODO? this loads after radio group
    // @Listen('ionRadioDidLoad')
    // protected radioDidLoad(ev: RadioEvent) {
    //   const radio = ev.detail.radio;
    //   // register the input inside of the item
    //   // reset to the item's id instead of the radiogroup id
    //   radio.id = 'rb-' + this.registerInput('radio');
    //   radio.labelId = 'lbl-' + this.id;
    // }
    Item.prototype.getLabelText = function () {
        return this.label ? this.label.getText() : '';
    };
    Item.prototype["componentWillLoad"] = function () {
        this.id = (++itemId).toString();
    };
    Item.prototype["componentDidLoad"] = function () {
        // Add item-button classes to each ion-button in the item
        var buttons = this.el.querySelectorAll('ion-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].itemButton = true;
        }
        this.label = this.el.querySelector('ion-label');
        // if (label) {
        //   this.label = label;
        //   this.labelId = label.id = ('lbl-' + this.id);
        //   if (label.type) {
        //     this.setElementClass('item-label-' + label.type, true);
        //   }
        //   this.viewLabel = false;
        // }
        // if (this._viewLabel && this.inputs.length) {
        //   let labelText = this.getLabelText().trim();
        //   this._viewLabel = (labelText.length > 0);
        // }
        // if (this.inputs.length > 1) {
        //   this.setElementClass('item-multiple-inputs', true);
        // }
    };
    /**
     * @hidden
     */
    Item.prototype.registerInput = function (type) {
        this.inputs.push(type);
        return this.id + '-' + (++this.ids);
    };
    Item.prototype.render = function () {
        var childStyles = {};
        for (var key in this.itemStyles) {
            childStyles = Object.assign(childStyles, this.itemStyles[key]);
        }
        var themedClasses = __assign({}, childStyles, createThemedClasses(this.mode, this.color, 'item'), { 'item-block': true });
        // TODO add support for button items
        var TagType = this.href ? 'a' : 'div';
        return (h(TagType, { "c": themedClasses },
            h(0, { "a": { "name": 'start' } }),
            h("div", { "c": { "item-inner": true } },
                h("div", { "c": { "input-wrapper": true } },
                    h(0, 0)),
                h(0, { "a": { "name": 'end' } })),
            h("div", { "c": { "button-effect": true } })));
    };
    return Item;
}());
export { Item };
var itemId = -1;

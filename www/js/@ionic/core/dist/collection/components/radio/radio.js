var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createThemedClasses } from '../../utils/theme';
var Radio = /** @class */ (function () {
    function Radio() {
        /*
         * @input {boolean} If true, the radio is checked. Default false.
         */
        this.checked = false;
        /*
          * @input {boolean} If true, the user cannot interact with this element. Default false.
          */
        this.disabled = false;
    }
    Radio.prototype["componentWillLoad"] = function () {
        this.emitStyle();
    };
    Radio.prototype["componentDidLoad"] = function () {
        this.ionRadioDidLoad.emit({ radio: this });
    };
    Radio.prototype.colorChanged = function () {
        this.emitStyle();
    };
    Radio.prototype.checkedChanged = function (val) {
        this.ionRadioCheckedDidChange.emit({ radio: this });
        this.ionSelect.emit({ checked: val });
        this.emitStyle();
    };
    Radio.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    Radio.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit(__assign({}, createThemedClasses(_this.mode, _this.color, 'radio'), { 'radio-checked': _this.checked, 'radio-disabled': _this.disabled }));
        });
    };
    Radio.prototype.onSpace = function (ev) {
        this.toggle();
        ev.stopPropagation();
        ev.preventDefault();
    };
    Radio.prototype.toggle = function () {
        this.checked = !this.checked;
        this.ionRadioDidToggle.emit({ radio: this });
    };
    Radio.prototype.hostData = function () {
        return {
            class: {
                'radio-checked': this.checked,
                'radio-disabled': this.disabled
            }
        };
    };
    Radio.prototype.render = function () {
        var _this = this;
        var radioClasses = {
            'radio-icon': true,
            'radio-checked': this.checked
        };
        return [
            h("div", { "c": radioClasses },
                h("div", { "c": { "radio-inner": true } })),
            h("button", { "c": { "radio-cover": true }, "o": { "click": function () { return _this.toggle(); } }, "a": { "aria-checked": this.checked ? 'true' : false, "aria-disabled": this.disabled ? 'true' : false, "aria-labelledby": this.labelId, "role": 'radio' }, "p": { "id": this.id, "tabIndex": 0 } })
        ];
    };
    return Radio;
}());
export { Radio };

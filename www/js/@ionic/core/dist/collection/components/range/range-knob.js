var RangeKnob = /** @class */ (function () {
    function RangeKnob() {
    }
    RangeKnob.prototype.handleKeyBoard = function (ev) {
        var keyCode = ev.keyCode;
        if (keyCode === KEY_LEFT || keyCode === KEY_DOWN) {
            this.ionDecrease.emit({ isIncrease: false, knob: this.knob });
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (keyCode === KEY_RIGHT || keyCode === KEY_UP) {
            this.ionIncrease.emit({ isIncrease: true, knob: this.knob });
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    RangeKnob.prototype.leftPos = function (val) {
        return val * 100 + "%";
    };
    RangeKnob.prototype.hostData = function () {
        return {
            class: {
                'range-knob-pressed': this.pressed,
                'range-knob-min': this.val === this.min || this.val === undefined,
                'range-knob-max': this.val === this.max
            },
            style: {
                'left': this.leftPos(this.ratio)
            },
            attrs: {
                'role': 'slider',
                'tabindex': this.disabled ? -1 : 0,
                'aria-valuemin': this.min,
                'aria-valuemax': this.max,
                'aria-disabled': this.disabled,
                'aria-labelledby': this.labelId,
                'aria-valuenow': this.val
            }
        };
    };
    RangeKnob.prototype.render = function () {
        if (this.pin) {
            return [
                h("div", { "c": { "range-pin": true }, "a": { "role": 'presentation' } }, this.val),
                h("div", { "c": { "range-knob": true }, "a": { "role": 'presentation' } })
            ];
        }
        return h("div", { "c": { "range-knob": true }, "a": { "role": 'presentation' } });
    };
    return RangeKnob;
}());
export { RangeKnob };
export var KEY_LEFT = 37;
export var KEY_UP = 38;
export var KEY_RIGHT = 39;
export var KEY_DOWN = 40;

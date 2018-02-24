import { clamp } from '../../utils/helpers';
var Range = /** @class */ (function () {
    function Range() {
        this.activated = false;
        this.hasFocus = false;
        this._valA = 0;
        this._valB = 0;
        this._ratioA = 0;
        this._ratioB = 0;
        this._ticks = [];
        this.disabled = false;
        this.min = 0;
        this.max = 100;
        this.steps = 1;
        this.dualKnobs = false;
        this.pin = false;
        this.snaps = false;
        this.debounce = 0;
    }
    Range.prototype.fireBlur = function () {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.ionBlur.emit();
            this.emitStyle();
        }
    };
    Range.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    Range.prototype.valueChanged = function (val) {
        this.ionChange.emit({ value: val });
        this.emitStyle();
    };
    Range.prototype["componentWillLoad"] = function () {
        this.inputUpdated();
        this.createTicks();
        this.emitStyle();
    };
    Range.prototype.emitStyle = function () {
        var _this = this;
        clearTimeout(this.styleTmr);
        this.styleTmr = setTimeout(function () {
            _this.ionStyle.emit({
                'range-disabled': _this.disabled
            });
        });
    };
    Range.prototype.fireFocus = function () {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
            this.emitStyle();
        }
    };
    Range.prototype.inputUpdated = function () {
        var val = this.value;
        if (this.dualKnobs) {
            this._valA = val.lower;
            this._valB = val.upper;
            this._ratioA = this.valueToRatio(val.lower);
            this._ratioB = this.valueToRatio(val.upper);
        }
        else {
            this._valA = val;
            this._ratioA = this.valueToRatio(val);
        }
        this.updateBar();
    };
    Range.prototype.updateBar = function () {
        var ratioA = this._ratioA;
        var ratioB = this._ratioB;
        if (this.dualKnobs) {
            this._barL = Math.min(ratioA, ratioB) * 100 + "%";
            this._barR = 100 - Math.max(ratioA, ratioB) * 100 + "%";
        }
        else {
            this._barL = '';
            this._barR = 100 - ratioA * 100 + "%";
        }
        this.updateTicks();
    };
    Range.prototype.createTicks = function () {
        if (this.snaps) {
            for (var value = this.min; value <= this.max; value += this.steps) {
                var ratio = this.valueToRatio(value);
                this._ticks.push({
                    ratio: ratio,
                    left: ratio * 100 + "%"
                });
            }
            this.updateTicks();
        }
    };
    Range.prototype.updateTicks = function () {
        var ticks = this._ticks;
        var ratio = this.ratio;
        if (this.snaps && ticks) {
            if (this.dualKnobs) {
                var upperRatio_1 = this.ratioUpper();
                ticks.forEach(function (t) {
                    t.active = t.ratio >= ratio && t.ratio <= upperRatio_1;
                });
            }
            else {
                ticks.forEach(function (t) {
                    t.active = t.ratio <= ratio;
                });
            }
        }
    };
    Range.prototype.valueToRatio = function (value) {
        value = Math.round((value - this.min) / this.steps) * this.steps;
        value = value / (this.max - this.min);
        return clamp(0, value, 1);
    };
    Range.prototype.ratioToValue = function (ratio) {
        ratio = Math.round((this.max - this.min) * ratio);
        ratio = Math.round(ratio / this.steps) * this.steps + this.min;
        return clamp(this.min, ratio, this.max);
    };
    Range.prototype.inputNormalize = function (val) {
        if (this.dualKnobs) {
            return val;
        }
        else {
            val = parseFloat(val);
            return isNaN(val) ? undefined : val;
        }
    };
    Range.prototype.update = function (current, rect, isPressed) {
        // figure out where the pointer is currently at
        // update the knob being interacted with
        var ratio = clamp(0, (current.x - rect.left) / rect.width, 1);
        var val = this.ratioToValue(ratio);
        if (this.snaps) {
            // snaps the ratio to the current value
            ratio = this.valueToRatio(val);
        }
        // update which knob is pressed
        this._pressed = isPressed;
        var valChanged = false;
        if (this._activeB) {
            // when the pointer down started it was determined
            // that knob B was the one they were interacting with
            this._pressedB = isPressed;
            this._pressedA = false;
            this._ratioB = ratio;
            valChanged = val === this._valB;
            this._valB = val;
        }
        else {
            // interacting with knob A
            this._pressedA = isPressed;
            this._pressedB = false;
            this._ratioA = ratio;
            valChanged = val === this._valA;
            this._valA = val;
        }
        this.updateBar();
        if (valChanged) {
            return false;
        }
        // value has been updated
        var value;
        if (this.dualKnobs) {
            // dual knobs have an lower and upper value
            value = {
                lower: Math.min(this._valA, this._valB),
                upper: Math.max(this._valA, this._valB)
            };
        }
        else {
            // single knob only has one value
            value = this._valA;
        }
        // Update input value
        this.value = value;
        return true;
    };
    Range.prototype.ratio = function () {
        if (this.dualKnobs) {
            return Math.min(this._ratioA, this._ratioB);
        }
        return this._ratioA;
    };
    Range.prototype.ratioUpper = function () {
        if (this.dualKnobs) {
            return Math.max(this._ratioA, this._ratioB);
        }
        return null;
    };
    Range.prototype.keyChng = function (ev) {
        var step = this.steps;
        if (ev.detail.knob === 'knobB') {
            if (!!ev.detail.isIncrease) {
                this._valB += step;
            }
            else {
                this._valB -= step;
            }
            this._valB = clamp(this.min, this._valB, this.max);
            this._ratioB = this.valueToRatio(this._valB);
        }
        else {
            if (!!ev.detail.isIncrease) {
                this._valA += step;
            }
            else {
                this._valA -= step;
            }
            this._valA = clamp(this.min, this._valA, this.max);
            this._ratioA = this.valueToRatio(this._valA);
        }
        this.updateBar();
    };
    Range.prototype.onDragStart = function (detail) {
        if (this.disabled)
            return false;
        this.fireFocus();
        var current = { x: detail.currentX, y: detail.currentY };
        var el = this.rangeEl.querySelector('.range-slider');
        this._rect = el.getBoundingClientRect();
        var rect = this._rect;
        // figure out which knob they started closer to
        var ratio = clamp(0, (current.x - rect.left) / rect.width, 1);
        this._activeB =
            this.dualKnobs &&
                Math.abs(ratio - this._ratioA) > Math.abs(ratio - this._ratioB);
        // update the active knob's position
        this.update(current, rect, true);
        // return true so the pointer events
        // know everything's still valid
        return true;
    };
    Range.prototype.onDragEnd = function (detail) {
        if (this.disabled) {
            return;
        }
        // update the active knob's position
        this.update({ x: detail.currentX, y: detail.currentY }, this._rect, false);
        // trigger ionBlur event
        this.fireBlur();
    };
    Range.prototype.onDragMove = function (detail) {
        if (this.disabled) {
            return;
        }
        var current = { x: detail.currentX, y: detail.currentY };
        // update the active knob's position
        this.update(current, this._rect, true);
    };
    Range.prototype.hostData = function () {
        return {
            class: {
                'range-disabled': this.disabled,
                'range-pressed': this._pressed,
                'range-has-pin': this.pin
            }
        };
    };
    Range.prototype.render = function () {
        return [
            h(0, { "a": { "name": 'range-start' } }),
            h("ion-gesture", { "p": { "disableScroll": true, "onStart": this.onDragStart.bind(this), "onMove": this.onDragMove.bind(this), "onEnd": this.onDragEnd.bind(this), "enabled": !this.disabled, "gestureName": 'range', "gesturePriority": 30, "type": 'pan', "direction": 'x', "threshold": 0 } },
                h("div", { "c": { "range-slider": true } },
                    this._ticks.map(function (t) {
                        return h("div", { "s": { "left": t.left }, "c": { "range-tick": true, "range-tick-active": t.active }, "a": { "role": 'presentation' } });
                    }),
                    h("div", { "c": { "range-bar": true }, "a": { "role": 'presentation' } }),
                    h("div", { "s": { "left": this._barL, "right": this._barR }, "c": { "range-bar": true, "range-bar-active": true }, "a": { "role": 'presentation' } }),
                    h("ion-range-knob", { "c": { "range-knob-handle": true }, "a": { "knob": 'knobA' }, "p": { "pressed": this._pressedA, "ratio": this._ratioA, "val": this._valA, "pin": this.pin, "min": this.min, "max": this.max } }),
                    this.dualKnobs
                        ? h("ion-range-knob", { "c": { "range-knob-handle": true }, "a": { "knob": 'knobB' }, "p": { "pressed": this._pressedB, "ratio": this._ratioB, "val": this._valB, "pin": this.pin, "min": this.min, "max": this.max } })
                        : null)),
            h(0, { "a": { "name": 'range-end' } })
        ];
    };
    return Range;
}());
export { Range };

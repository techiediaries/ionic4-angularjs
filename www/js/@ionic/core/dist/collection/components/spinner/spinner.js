var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createThemedClasses } from '../../utils/theme';
import { SPINNERS } from './spinner-configs';
var Spinner = /** @class */ (function () {
    function Spinner() {
        /**
         * @input {boolean} If true, pause the animation.
         */
        this.paused = false;
    }
    Spinner.prototype.getName = function () {
        var name = this.name || this.config.get('spinner');
        if (!name) {
            // fallback
            if (this.mode === 'md') {
                return 'crescent';
            }
            else if (this.mode === 'wp') {
                return 'circles';
            }
            else {
                return 'lines';
            }
        }
        if (name === 'ios') {
            // deprecation warning, renamed in v4
            console.warn("spinner \"ios\" has been renamed to \"lines\"");
            name = 'lines';
        }
        else if (name === 'ios-small') {
            // deprecation warning, renamed in v4
            console.warn("spinner \"ios-small\" has been renamed to \"lines-sm\"");
            name = 'lines-sm';
        }
        return name;
    };
    Spinner.prototype.hostData = function () {
        var themedClasses = createThemedClasses(this.mode, this.color, "spinner spinner-" + this.getName());
        var spinnerClasses = __assign({}, themedClasses, { 'spinner-paused': this.paused });
        return {
            class: spinnerClasses
        };
    };
    Spinner.prototype.render = function () {
        var name = this.getName();
        var spinner = SPINNERS[name] || SPINNERS['lines'];
        var duration = (typeof this.duration === 'number' && this.duration > 10 ? this.duration : spinner.dur);
        var svgs = [];
        var i = 0;
        var l = 0;
        if (spinner.circles) {
            for (i = 0, l = spinner.circles; i < l; i++) {
                svgs.push(buildCircle(spinner, duration, i, l));
            }
        }
        else if (spinner.lines) {
            for (i = 0, l = spinner.lines; i < l; i++) {
                svgs.push(buildLine(spinner, duration, i, l));
            }
        }
        return svgs;
    };
    return Spinner;
}());
export { Spinner };
function buildCircle(spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return (h("svg", { "n": "http://www.w3.org/2000/svg", "s": data.style, "a": { "viewBox": '0 0 64 64' } },
        h("circle", { "n": "http://www.w3.org/2000/svg", "a": { "transform": 'translate(32,32)', "r": data.r } })));
}
function buildLine(spinner, duration, index, total) {
    var data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return (h("svg", { "n": "http://www.w3.org/2000/svg", "s": data.style, "a": { "viewBox": '0 0 64 64' } },
        h("line", { "n": "http://www.w3.org/2000/svg", "a": { "transform": 'translate(32,32)', "y1": data.y1, "y2": data.y2 } })));
}

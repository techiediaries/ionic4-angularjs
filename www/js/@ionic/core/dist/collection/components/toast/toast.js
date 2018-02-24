import iOSEnterAnimation from './animations/ios.enter';
import iOSLeaveAnimation from './animations/ios.leave';
var Toast = /** @class */ (function () {
    function Toast() {
    }
    Toast.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Toast.prototype._present = function (resolve) {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        this.ionToastWillPresent.emit({ actionSheet: this });
        // get the user's animation fn if one was provided
        var animationBuilder = this.enterAnimation;
        if (!animationBuilder) {
            // user did not provide a custom animation fn
            // decide from the config which animation to use
            animationBuilder = iOSEnterAnimation;
        }
        // build the animation and kick it off
        this.animationCtrl.create(animationBuilder, this.el, this.position).then(function (animation) {
            _this.animation = animation;
            animation.onFinish(function (a) {
                a.destroy();
                _this.ionViewDidEnter();
                resolve();
            }).play();
        });
    };
    Toast.prototype.dismiss = function () {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return new Promise(function (resolve) {
            _this.ionToastWillDismiss.emit({ toast: _this });
            // get the user's animation fn if one was provided
            var animationBuilder = _this.exitAnimation;
            if (!animationBuilder) {
                // user did not provide a custom animation fn
                // decide from the config which animation to use
                animationBuilder = iOSLeaveAnimation;
            }
            // build the animation and kick it off
            _this.animationCtrl.create(animationBuilder, _this.el, _this.position).then(function (animation) {
                _this.animation = animation;
                animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionToastDidDismiss.emit({ toast: _this });
                    Context.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Toast.prototype["componentDidUnload"] = function () {
        this.ionToastDidUnload.emit({ toast: this });
    };
    Toast.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Toast.prototype["componentDidLoad"] = function () {
        this.ionToastDidLoad.emit({ toast: this });
    };
    Toast.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.ionToastDidPresent.emit({ toast: this });
        if (this.duration) {
            setTimeout(function () {
                _this.dismiss();
            }, this.duration);
        }
    };
    Toast.prototype.render = function () {
        var _this = this;
        var userCssClass = 'toast-content';
        if (this.cssClass) {
            userCssClass += ' ' + this.cssClass;
        }
        return (h("div", { "c": this.wrapperClass() },
            h("div", { "c": { "toast-container": true } },
                this.message
                    ? h("div", { "c": { "toast-message": true } }, this.message)
                    : null,
                this.showCloseButton
                    ? h("ion-button", { "c": { "toast-button": true }, "o": { "click": function () { return _this.dismiss(); } }, "a": { "color": 'light' }, "p": { "clear": true } }, this.closeButtonText || 'Close')
                    : null)));
    };
    Toast.prototype.wrapperClass = function () {
        var wrapperClass = !this.position
            ? ['toast-wrapper', 'toast-bottom']
            : ["toast-wrapper", "toast-" + this.position];
        return wrapperClass.reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
    };
    return Toast;
}());
export { Toast };

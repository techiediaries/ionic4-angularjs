import iOSEnterAnimation from './animations/ios.enter';
import iOSLeaveAnimation from './animations/ios.leave';
var ActionSheet = /** @class */ (function () {
    function ActionSheet() {
        this.enableBackdropDismiss = true;
    }
    ActionSheet.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    ActionSheet.prototype._present = function (resolve) {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        this.ionActionSheetWillPresent.emit({ actionSheet: this });
        // get the user's animation fn if one was provided
        var animationBuilder = this.enterAnimation;
        if (!animationBuilder) {
            // user did not provide a custom animation fn
            // decide from the config which animation to use
            animationBuilder = iOSEnterAnimation;
        }
        // build the animation and kick it off
        this.animationCtrl.create(animationBuilder, this.el).then(function (animation) {
            _this.animation = animation;
            animation.onFinish(function (a) {
                a.destroy();
                _this.ionViewDidEnter();
                resolve();
            }).play();
        });
    };
    ActionSheet.prototype.dismiss = function () {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return new Promise(function (resolve) {
            _this.ionActionSheetWillDismiss.emit({ actionSheet: _this });
            // get the user's animation fn if one was provided
            var animationBuilder = _this.exitAnimation;
            if (!animationBuilder) {
                // user did not provide a custom animation fn
                // decide from the config which animation to use
                animationBuilder = iOSLeaveAnimation;
            }
            // build the animation and kick it off
            _this.animationCtrl.create(animationBuilder, _this.el).then(function (animation) {
                _this.animation = animation;
                animation.onFinish(function (a) {
                    a.destroy();
                    _this.ionActionSheetDidDismiss.emit({ actionSheet: _this });
                    Context.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    ActionSheet.prototype["componentDidUnload"] = function () {
        this.ionActionSheetDidUnload.emit({ actionSheet: this });
    };
    ActionSheet.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    ActionSheet.prototype["componentDidLoad"] = function () {
        this.ionActionSheetDidLoad.emit({ actionSheet: this });
    };
    ActionSheet.prototype.ionViewDidEnter = function () {
        this.ionActionSheetDidPresent.emit({ loading: this });
    };
    ActionSheet.prototype.backdropClick = function () {
        if (this.enableBackdropDismiss) {
            // const opts: NavOptions = {
            //   minClickBlockDuration: 400
            // };
            this.dismiss();
        }
    };
    ActionSheet.prototype.click = function (button) {
        var shouldDismiss = true;
        if (button.handler) {
            if (button.handler() === false) {
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            this.dismiss();
        }
    };
    ActionSheet.prototype.render = function () {
        var _this = this;
        var userCssClass = 'action-sheet-content';
        if (this.cssClass) {
            userCssClass += ' ' + this.cssClass;
        }
        var cancelButton;
        var buttons = this.buttons
            .map(function (b) {
            if (typeof b === 'string') {
                b = { text: b };
            }
            if (!b.cssClass) {
                b.cssClass = '';
            }
            if (b.role === 'cancel') {
                cancelButton = b;
                return null;
            }
            return b;
        })
            .filter(function (b) { return b !== null; });
        return [
            h("ion-backdrop", { "c": { "action-sheet-backdrop": true }, "o": { "click": this.backdropClick.bind(this) } }),
            h("div", { "c": { "action-sheet-wrapper": true }, "a": { "role": 'dialog' } },
                h("div", { "c": { "action-sheet-container": true } },
                    h("div", { "c": { "action-sheet-group": true } },
                        this.title
                            ? h("div", { "c": { "action-sheet-title": true } }, this.title)
                            : null,
                        this.subTitle
                            ? h("div", { "c": { "action-sheet-sub-title": true } }, this.subTitle)
                            : null,
                        buttons.map(function (b) {
                            return h("button", { "c": _this.buttonClass(b), "o": { "click": function () { return _this.click(b); } } },
                                h("span", { "c": { "button-inner": true } },
                                    b.icon
                                        ? h("ion-icon", { "c": { "action-sheet-icon": true }, "p": { "name": b.icon } })
                                        : null,
                                    b.text));
                        })),
                    cancelButton
                        ? h("div", { "c": { "action-sheet-group": true } },
                            h("button", { "c": this.buttonClass(cancelButton), "o": { "click": function () { return _this.click(cancelButton); } } },
                                cancelButton.icon
                                    ? h("ion-icon", { "c": { "action-sheet-icon": true }, "p": { "name": cancelButton.icon } })
                                    : null,
                                cancelButton.text))
                        : null))
        ];
    };
    ActionSheet.prototype.buttonClass = function (button) {
        var buttonClass = !button.role
            ? ['action-sheet-button']
            : ["action-sheet-button", "action-sheet-" + button.role];
        return buttonClass.reduce(function (prevValue, cssClass) {
            prevValue[cssClass] = true;
            return prevValue;
        }, {});
    };
    return ActionSheet;
}());
export { ActionSheet };

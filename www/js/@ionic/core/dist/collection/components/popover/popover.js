import { createThemedClasses } from '../../utils/theme';
import iOSEnterAnimation from './animations/ios.enter';
import iOSLeaveAnimation from './animations/ios.leave';
var Popover = /** @class */ (function () {
    function Popover() {
        this.positioned = false;
        this.componentProps = {};
        this.enableBackdropDismiss = true;
        this.showBackdrop = true;
    }
    Popover.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._present(resolve);
        });
    };
    Popover.prototype.positionPopover = function () {
        var props = POPOVER_POSITION_PROPERTIES[this.mode];
        console.debug('Position popover', this.el, this.ev, props);
        // Declare the popover elements
        var contentEl = this.el.querySelector('.popover-content');
        var arrowEl = this.el.querySelector('.popover-arrow');
        // If no event was passed, hide the arrow
        if (!this.ev) {
            arrowEl.style.display = 'none';
        }
        // Set the default transform origin direction
        var origin = {
            y: 'top',
            x: 'left'
        };
        // Popover content width and height
        var popover = {
            width: contentEl.getBoundingClientRect().width,
            height: contentEl.getBoundingClientRect().height
        };
        // Window body width and height
        // TODO need to check if portrait/landscape?
        var body = {
            width: window.screen.width,
            height: window.screen.height
        };
        // If ev was passed, use that for target element
        var targetDim = this.ev && this.ev.target && this.ev.target.getBoundingClientRect();
        // The target is the object that dispatched the event that was passed
        var target = {
            top: (targetDim && 'top' in targetDim) ? targetDim.top : (body.height / 2) - (popover.height / 2),
            left: (targetDim && 'left' in targetDim) ? targetDim.left : (body.width / 2) - (popover.width / 2),
            width: targetDim && targetDim.width || 0,
            height: targetDim && targetDim.height || 0
        };
        // If the popover should be centered to the target
        if (props.centerTarget) {
            target.left = (targetDim && 'left' in targetDim) ? targetDim.left : (body.width / 2);
        }
        // The arrow that shows above the popover on iOS
        var arrowDim = arrowEl.getBoundingClientRect();
        var arrow = {
            width: arrowDim.width,
            height: arrowDim.height
        };
        var arrowCSS = {
            top: target.top + target.height,
            left: target.left + (target.width / 2) - (arrow.width / 2)
        };
        var popoverCSS = {
            top: target.top + target.height + (arrow.height - 1),
            left: target.left
        };
        // If the popover should be centered to the target
        if (props.centerTarget) {
            popoverCSS.left = target.left + (target.width / 2) - (popover.width / 2);
        }
        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < props.padding) {
            popoverCSS.left = props.padding;
        }
        else if (popover.width + props.padding + popoverCSS.left > body.width) {
            popoverCSS.left = body.width - popover.width - props.padding;
            origin.x = 'right';
        }
        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (this.showFromBottom(target, popover, body)) {
            this.el.className = this.el.className + ' popover-bottom';
            origin.y = 'bottom';
            popoverCSS.top = target.top - popover.height;
            if (props.showArrow) {
                arrowCSS.top = target.top - (arrow.height + 1);
                popoverCSS.top = target.top - popover.height - (arrow.height - 1);
            }
            // If the popover exceeds the viewport then cut the bottom off
        }
        else if (this.exceedsViewport(target, popover, body)) {
            contentEl.style.bottom = props.padding + props.unit;
        }
        arrowEl.style.top = arrowCSS.top + 'px';
        arrowEl.style.left = arrowCSS.left + 'px';
        contentEl.style.top = popoverCSS.top + 'px';
        contentEl.style.left = popoverCSS.left + 'px';
        contentEl.style.transformOrigin = origin.y + ' ' + origin.x;
        // Since the transition starts before styling is done we
        // want to wait for the styles to apply before showing the wrapper
        this.positioned = true;
    };
    Popover.prototype.showFromBottom = function (target, popover, body) {
        return target.top + target.height + popover.height > body.height && target.top - popover.height > 0;
    };
    Popover.prototype.exceedsViewport = function (target, popover, body) {
        return target.top + target.height + popover.height > body.height;
    };
    Popover.prototype._present = function (resolve) {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        this.ionPopoverWillPresent.emit({ popover: this });
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
                _this.positionPopover();
                resolve();
            }).play();
        });
    };
    Popover.prototype.dismiss = function () {
        var _this = this;
        if (this.animation) {
            this.animation.destroy();
            this.animation = null;
        }
        return new Promise(function (resolve) {
            _this.ionPopoverWillDismiss.emit({ popover: _this });
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
                    _this.ionPopoverDidDismiss.emit({ popover: _this });
                    Context.dom.write(function () {
                        _this.el.parentNode.removeChild(_this.el);
                    });
                    resolve();
                }).play();
            });
        });
    };
    Popover.prototype["componentDidUnload"] = function () {
        this.ionPopoverDidUnload.emit({ popover: this });
    };
    Popover.prototype.onDismiss = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    };
    Popover.prototype["componentDidLoad"] = function () {
        this.ionPopoverDidLoad.emit({ popover: this });
    };
    Popover.prototype.ionViewDidEnter = function () {
        this.ionPopoverDidPresent.emit({ popover: this });
    };
    Popover.prototype.backdropClick = function () {
        if (this.enableBackdropDismiss) {
            // const opts: NavOptions = {
            //   minClickBlockDuration: 400
            // };
            this.dismiss();
        }
    };
    Popover.prototype.render = function () {
        var ThisComponent = this.component;
        var wrapperClasses = createThemedClasses(this.mode, this.color, 'popover-wrapper');
        var wrapperStyle = this.positioned ? { 'opacity': '1' } : {};
        return [
            h("ion-backdrop", { "c": { "popover-backdrop": true }, "o": { "click": this.backdropClick.bind(this) } }),
            h("div", { "c": wrapperClasses, "s": wrapperStyle },
                h("div", { "c": { "popover-arrow": true } }),
                h("div", { "c": { "popover-content": true } },
                    h("div", { "c": { "popover-viewport": true } },
                        h(ThisComponent, { "p": this.componentProps, "c": this.cssClass }))))
        ];
    };
    return Popover;
}());
export { Popover };
export var POPOVER_POSITION_PROPERTIES = {
    ios: {
        padding: 2,
        unit: '%',
        showArrow: true,
        centerTarget: true
    },
    md: {
        padding: 12,
        unit: 'px',
        showArrow: false,
        centerTarget: false
    },
    wp: {
        padding: 12,
        unit: 'px',
        showArrow: false,
        centerTarget: false
    }
};

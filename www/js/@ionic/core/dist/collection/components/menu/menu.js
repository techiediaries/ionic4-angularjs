import { assert, checkEdgeSide, isRightSide } from '../../utils/helpers';
var Menu = /** @class */ (function () {
    function Menu() {
        this._init = false;
        this._isPane = false;
        this._isAnimating = false;
        this._isOpen = false;
        this._width = null;
        /**
         * @hidden
         */
        this.isRightSide = false;
        /**
         * @input {string} The display type of the menu. Default varies based on the mode,
         * see the `menuType` in the [config](../../config/Config). Available options:
         * `"overlay"`, `"reveal"`, `"push"`.
         */
        this.type = 'overlay';
        /**
         * @input {string} Which side of the view the menu should be placed. Default `"start"`.
         */
        this.side = 'start';
        /**
         * @input {boolean} If true, swiping the menu is enabled. Default `true`.
         */
        this.swipeEnabled = true;
        /**
         * @input {boolean} If true, the menu will persist on child pages.
         */
        this.persistent = false;
        /**
         * @hidden
         */
        this.maxEdgeStart = 50;
    }
    // @PropDidChange('side')
    // sideChanged(side: Side) {
    //   // TODO: const isRTL = this._plt.isRTL;
    //   const isRTL = false;
    //   // this.isRightSide = isRightSide(side, isRTL);
    // }
    Menu.prototype.splitPaneChanged = function (ev) {
        this._isPane = ev.detail.splitPane.isPane(this.el);
        this._updateState();
    };
    Menu.prototype.enabledChanged = function () {
        this._updateState();
    };
    Menu.prototype.swipeEnabledChange = function () {
        this._updateState();
    };
    Menu.prototype["componentWillLoad"] = function () {
        var _this = this;
        return this.lazyMenuCtrl.componentOnReady()
            .then(function (menu) { return _this.menuCtrl = menu; });
    };
    /**
     * @hidden
     */
    Menu.prototype["componentDidLoad"] = function () {
        var _this = this;
        assert(!!this.menuCtrl, 'menucontroller was not initialized');
        this._menuInnerEle = this.el.querySelector('.menu-inner');
        this._backdropEle = this.el.querySelector('.menu-backdrop');
        var contentQuery = (this.content)
            ? '> #' + this.content
            : '[main]';
        var parent = this.el.parentElement;
        var content = this._cntElm = parent.querySelector(contentQuery);
        if (!content || !content.tagName) {
            // requires content element
            return console.error('Menu: must have a "content" element to listen for drag events on.');
        }
        // TODO: make PropDidChange work
        this.isRightSide = isRightSide(this.side, false);
        // add menu's content classes
        content.classList.add('menu-content');
        content.classList.add('menu-content-' + this.type);
        var isEnabled = this.enabled;
        if (isEnabled === true || typeof isEnabled === 'undefined') {
            var menus = this.menuCtrl.getMenus();
            isEnabled = !menus.some(function (m) {
                return m.side === _this.side && m.enabled;
            });
        }
        // register this menu with the app's menu controller
        this.menuCtrl._register(this);
        // mask it as enabled / disabled
        this.enable(isEnabled);
        this._init = true;
    };
    Menu.prototype.hostData = function () {
        return {
            attrs: {
                'role': 'navigation',
                'side': this.getSide(),
                'type': this.type
            },
            class: {
                'menu-enabled': this._canOpen()
            }
        };
    };
    Menu.prototype.getSide = function () {
        return this.isRightSide ? 'right' : 'left';
    };
    Menu.prototype.render = function () {
        return ([
            h("div", { "c": { "menu-inner": true } },
                h(0, 0)),
            h("ion-backdrop", { "c": { "menu-backdrop": true } }),
            h("ion-gesture", { "p": { "canStart": this.canStart.bind(this), "onWillStart": this._swipeWillStart.bind(this), "onStart": this._swipeStart.bind(this), "onMove": this._swipeProgress.bind(this), "onEnd": this._swipeEnd.bind(this), "maxEdgeStart": this.maxEdgeStart, "edge": this.side, "enabled": this._canOpen() && this.swipeEnabled, "gestureName": 'menu-swipe', "gesturePriority": 10, "type": 'pan', "direction": 'x', "threshold": 10, "attachTo": 'body', "disableScroll": true, "block": this._activeBlock } })
        ]);
    };
    /**
     * @hidden
     */
    Menu.prototype.onBackdropClick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.close();
    };
    /**
     * @hidden
     */
    Menu.prototype.prepareAnimation = function () {
        var _this = this;
        var width = this._menuInnerEle.offsetWidth;
        if (width === this._width) {
            return Promise.resolve();
        }
        if (this._animation) {
            this._animation.destroy();
            this._animation = null;
        }
        this._width = width;
        return this.menuCtrl.create(this.type, this).then(function (ani) {
            _this._animation = ani;
        });
    };
    /**
     * @hidden
     */
    Menu.prototype.setOpen = function (shouldOpen, animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        // If the menu is disabled or it is currenly being animated, let's do nothing
        if ((shouldOpen === this._isOpen) || !this._canOpen() || this._isAnimating) {
            return Promise.resolve(this._isOpen);
        }
        this._before();
        return this.prepareAnimation()
            .then(function () { return _this._startAnimation(shouldOpen, animated); })
            .then(function () {
            _this._after(shouldOpen);
            return _this._isOpen;
        });
    };
    Menu.prototype._startAnimation = function (shouldOpen, animated) {
        var done;
        var promise = new Promise(function (resolve) { return done = resolve; });
        var ani = this._animation
            .onFinish(done, { oneTimeCallback: true, clearExistingCallacks: true })
            .reverse(!shouldOpen);
        if (animated) {
            ani.play();
        }
        else {
            ani.syncPlay();
        }
        return promise;
    };
    Menu.prototype._forceClosing = function () {
        assert(this._isOpen, 'menu cannot be closed');
        this._isAnimating = true;
        this._startAnimation(false, false);
        this._after(false);
    };
    Menu.prototype.getWidth = function () {
        return this._width;
    };
    /**
     * @hidden
     */
    Menu.prototype.canSwipe = function () {
        return this.swipeEnabled &&
            !this._isAnimating &&
            this._canOpen();
        // TODO: && this._app.isEnabled();
    };
    /**
     * @hidden
     */
    Menu.prototype.isAnimating = function () {
        return this._isAnimating;
    };
    /**
     * @hidden
     */
    Menu.prototype.isOpen = function () {
        return this._isOpen;
    };
    Menu.prototype._swipeWillStart = function () {
        this._before();
        return this.prepareAnimation();
    };
    Menu.prototype._swipeStart = function () {
        assert(!!this._animation, '_type is undefined');
        if (!this._isAnimating) {
            assert(false, '_isAnimating has to be true');
            return;
        }
        // the cloned animation should not use an easing curve during seek
        this._animation
            .reverse(this._isOpen)
            .progressStart();
    };
    Menu.prototype._swipeProgress = function (slide) {
        assert(!!this._animation, '_type is undefined');
        if (!this._isAnimating) {
            assert(false, '_isAnimating has to be true');
            return;
        }
        var delta = computeDelta(slide.deltaX, this._isOpen, this.isRightSide);
        var stepValue = delta / this._width;
        this._animation.progressStep(stepValue);
    };
    Menu.prototype._swipeEnd = function (slide) {
        var _this = this;
        assert(!!this._animation, '_type is undefined');
        if (!this._isAnimating) {
            assert(false, '_isAnimating has to be true');
            return;
        }
        var isRightSide = this.isRightSide;
        var delta = computeDelta(slide.deltaX, this._isOpen, isRightSide);
        var width = this._width;
        var stepValue = delta / width;
        var velocity = slide.velocityX;
        var z = width / 2;
        var shouldCompleteRight = (velocity >= 0)
            && (velocity > 0.2 || slide.deltaX > z);
        var shouldCompleteLeft = (velocity <= 0)
            && (velocity < -0.2 || slide.deltaX < -z);
        var opening = !this._isOpen;
        var shouldComplete = (opening)
            ? isRightSide ? shouldCompleteLeft : shouldCompleteRight
            : isRightSide ? shouldCompleteRight : shouldCompleteLeft;
        var isOpen = (opening && shouldComplete);
        if (!opening && !shouldComplete) {
            isOpen = true;
        }
        var missing = shouldComplete ? 1 - stepValue : stepValue;
        var missingDistance = missing * width;
        var realDur = 0;
        if (missingDistance > 5) {
            var dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 380);
        }
        this._animation
            .onFinish(function () { return _this._after(isOpen); }, { clearExistingCallacks: true })
            .progressEnd(shouldComplete, stepValue, realDur);
    };
    Menu.prototype._before = function () {
        assert(!this._isAnimating, '_before() should not be called while animating');
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add('show-menu');
        this._backdropEle.classList.add('show-backdrop');
        this.resize();
        this._isAnimating = true;
    };
    Menu.prototype._after = function (isOpen) {
        assert(this._isAnimating, '_before() should be called while animating');
        // TODO: this._app.setEnabled(false, 100);
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this._isOpen = isOpen;
        this._isAnimating = false;
        // add/remove backdrop click listeners
        this._backdropClick(isOpen);
        if (isOpen) {
            // disable swipe to go back gesture
            this._activeBlock = GESTURE_BLOCKER;
            // add css class
            this._cntElm.classList.add('menu-content-open');
            // emit open event
            this.ionOpen.emit({ menu: this });
        }
        else {
            // enable swipe to go back gesture
            this._activeBlock = null;
            // remove css classes
            this.el.classList.remove('show-menu');
            this._cntElm.classList.remove('menu-content-open');
            this._backdropEle.classList.remove('show-menu');
            // emit close event
            this.ionClose.emit({ menu: this });
        }
    };
    /**
     * @hidden
     */
    Menu.prototype.open = function () {
        return this.setOpen(true);
    };
    /**
     * @hidden
     */
    Menu.prototype.close = function () {
        return this.setOpen(false);
    };
    /**
     * @hidden
     */
    Menu.prototype.resize = function () {
        // TODO
        // const content: Content | Nav = this.menuContent
        //   ? this.menuContent
        //   : this.menuNav;
        // content && content.resize();
    };
    Menu.prototype.canStart = function (detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
        }
        else if (this.getMenuController().getOpen()) {
            return false;
        }
        return checkEdgeSide(detail.currentX, this.isRightSide, this.maxEdgeStart);
    };
    /**
     * @hidden
     */
    Menu.prototype.toggle = function () {
        return this.setOpen(!this._isOpen);
    };
    Menu.prototype._canOpen = function () {
        return this.enabled && !this._isPane;
    };
    /**
     * @hidden
     */
    // @PropDidChange('swipeEnabled')
    // @PropDidChange('enabled')
    Menu.prototype._updateState = function () {
        var canOpen = this._canOpen();
        // Close menu inmediately
        if (!canOpen && this._isOpen) {
            assert(this._init, 'menu must be initialized');
            // close if this menu is open, and should not be enabled
            this._forceClosing();
        }
        if (this.enabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        if (!this._init) {
            return;
        }
        if (this._isOpen || (this._isPane && this.enabled)) {
            this.resize();
        }
        assert(!this._isAnimating, 'can not be animating');
    };
    /**
     * @hidden
     */
    Menu.prototype.enable = function (shouldEnable) {
        this.enabled = shouldEnable;
        return this;
    };
    /**
     * @internal
     */
    Menu.prototype.initPane = function () {
        return false;
    };
    /**
     * @hidden
     */
    Menu.prototype.swipeEnable = function (shouldEnable) {
        this.swipeEnabled = shouldEnable;
        return this;
    };
    /**
     * @hidden
     */
    Menu.prototype.getMenuElement = function () {
        return this.el.querySelector('.menu-inner');
    };
    /**
     * @hidden
     */
    Menu.prototype.getContentElement = function () {
        return this._cntElm;
    };
    /**
     * @hidden
     */
    Menu.prototype.getBackdropElement = function () {
        return this._backdropEle;
    };
    /**
     * @hidden
     */
    Menu.prototype.getMenuController = function () {
        return this.menuCtrl;
    };
    Menu.prototype._backdropClick = function (shouldAdd) {
        var onBackdropClick = this.onBackdropClick.bind(this);
        if (shouldAdd && !this._unregBdClick) {
            this._unregBdClick = Context.addListener(this._backdropEle, 'click', onBackdropClick, { capture: true });
            this._unregCntClick = Context.addListener(this._backdropEle, 'click', onBackdropClick, { capture: true });
        }
        else if (!shouldAdd && this._unregBdClick) {
            this._unregBdClick();
            this._unregCntClick();
            this._unregBdClick = this._unregCntClick = null;
        }
    };
    /**
     * @hidden
     */
    Menu.prototype["componentDidUnload"] = function () {
        this._backdropClick(false);
        this.menuCtrl._unregister(this);
        this._animation && this._animation.destroy();
        this.menuCtrl = this._animation = this._cntElm = this._backdropEle = null;
    };
    return Menu;
}());
export { Menu };
function computeDelta(deltaX, isOpen, isRightSide) {
    return Math.max(0, (isOpen !== isRightSide) ? -deltaX : deltaX);
}
var GESTURE_BLOCKER = 'goback-swipe';

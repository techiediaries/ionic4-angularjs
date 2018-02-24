import { STATE_ATTACHED, STATE_DESTROYED, STATE_INITIALIZED, STATE_NEW } from './nav-utils';
import { assert } from '../utils/helpers';
var ViewControllerImpl = /** @class */ (function () {
    function ViewControllerImpl(component, data) {
        this.component = component;
        initializeNewViewController(this, data);
    }
    /**
     * Dismiss the current viewController
     * @param {any} [data] Data that you want to return when the viewController is dismissed.
     * @param {any} [role ]
     * @param {NavOptions} navOptions Options for the dismiss navigation.
     * @returns {any} data Returns the data passed in, if any.
     */
    ViewControllerImpl.prototype.dismiss = function (data, role, navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        this.dismissProxy = {};
        return dismiss(this.nav, this.dismissProxy, data, role, navOptions);
    };
    ViewControllerImpl.prototype.willLeave = function (unload) {
        willLeaveImpl(unload, this);
    };
    ViewControllerImpl.prototype.didLeave = function () {
        didLeaveImpl(this);
    };
    ViewControllerImpl.prototype.willEnter = function () {
        callLifeCycleFunction(this.instance, 'ionViewWillEnter');
    };
    ViewControllerImpl.prototype.didEnter = function () {
        didEnterImpl(this);
    };
    ViewControllerImpl.prototype.willLoad = function () {
        willLoadImpl(this);
    };
    ViewControllerImpl.prototype.didLoad = function () {
        didLoadImpl(this);
    };
    ViewControllerImpl.prototype.willUnload = function () {
        willUnloadImpl(this);
    };
    ViewControllerImpl.prototype.destroy = function (delegate) {
        return destroy(this, delegate);
    };
    ViewControllerImpl.prototype.getTransitionName = function (_direction) {
        // TODO
        return '';
    };
    return ViewControllerImpl;
}());
export { ViewControllerImpl };
export function callLifecycle(instance, methodName) {
    instance && instance[methodName] && instance[methodName]();
}
export function dismiss(navCtrl, dismissProxy, data, role, navOptions) {
    if (navOptions === void 0) { navOptions = {}; }
    if (!navCtrl) {
        assert(this._state === STATE_DESTROYED, 'ViewController does not have a valid _nav');
        return Promise.resolve(false);
    }
    if (this.overlay && !navOptions.minClickBlockDuration) {
        // This is a Modal being dismissed so we need
        // to add the minClickBlockDuration option
        // for UIWebView
        navOptions.minClickBlockDuration = 400;
    }
    dismissProxy.data = data;
    dismissProxy.role = role;
    var options = Object.assign({}, this._leavingOpts, navOptions);
    return navCtrl.removeView(this, options).then(function () { return data; });
}
export function destroy(viewController, delegate) {
    assert(viewController.state !== STATE_DESTROYED, 'view state must be attached');
    return delegate ? delegate.removeViewFromDom(viewController.nav, viewController) : Promise.resolve().then(function () {
        if (viewController.component) {
            // TODO - consider removing classes and styles as thats what we do in ionic-angular
        }
        viewController.id = viewController.data = viewController.element = viewController.instance = viewController.nav = viewController.dismissProxy = null;
        viewController.state = STATE_DESTROYED;
    });
}
export function callLifeCycleFunction(instance, functionName) {
    instance && instance[functionName] && instance[functionName]();
}
export function willLeaveImpl(unload, viewController) {
    callLifeCycleFunction(viewController.instance, 'ionViewWillLeave');
    if (unload && viewController.onWillDismiss) {
        viewController.onWillDismiss(this.dismissProxy.data, this.dismissProxy.proxy);
        viewController.onWillDismiss = null;
    }
}
export function didLeaveImpl(viewController) {
    callLifeCycleFunction(viewController.instance, 'ionViewDidLeave');
    // TODO, maybe need to do something framework specific here... figure this out later
    // for example, disconnecting from change detection
}
export function willEnterImpl(viewController) {
    assert(viewController.state === STATE_ATTACHED, 'view state must be ATTACHED');
    // TODO, maybe need to do something framework specific here... figure this out later
    // for example, connecting to change detection
    callLifeCycleFunction(viewController.instance, 'ionViewWillEnter');
}
export function didEnterImpl(viewController) {
    assert(viewController.state === STATE_ATTACHED, 'view state must be ATTACHED');
    // TODO - navbar didEnter here
    callLifeCycleFunction(viewController.instance, 'ionViewDidEnter');
}
export function willLoadImpl(viewController) {
    assert(viewController.state === STATE_INITIALIZED, 'view state must be INITIALIZED');
    callLifeCycleFunction(viewController.instance, 'ionViewWillLoad');
}
export function willUnloadImpl(viewController) {
    callLifeCycleFunction(viewController.instance, 'ionViewWillUnLoad');
    viewController.onDidDismiss && viewController.onDidDismiss(viewController.dismissProxy.data, viewController.dismissProxy.role);
    viewController.onDidDismiss = viewController.dismissProxy = null;
}
export function didLoadImpl(viewController) {
    assert(viewController.state === STATE_ATTACHED, 'view state must be ATTACHED');
    callLifeCycleFunction(viewController.instance, 'ionViewDidLoad');
}
export function initializeNewViewController(viewController, data) {
    viewController.state = STATE_NEW;
    viewController.data = data || {};
}

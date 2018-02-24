import { isReady } from '../../utils/helpers';
import { insert as insertImpl, insertPages as insertPagesImpl, pop as popImpl, popTo as popToImpl, popToRoot as popToRootImpl, push as pushImpl, remove as removeImpl, removeView as removeViewImpl, setPages as setPagesImpl, setRoot as setRootImpl } from '../../navigation/nav-controller-functions';
var defaultDelegate = null;
var NavControllerImpl = /** @class */ (function () {
    function NavControllerImpl() {
    }
    NavControllerImpl.prototype.push = function (nav, component, data, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return pushImpl(nav, delegate, animation, component, data, opts);
        });
    };
    NavControllerImpl.prototype.pop = function (nav, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return popImpl(nav, delegate, animation, opts);
        });
    };
    NavControllerImpl.prototype.setRoot = function (nav, component, data, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return setRootImpl(nav, delegate, animation, component, data, opts);
        });
    };
    NavControllerImpl.prototype.insert = function (nav, insertIndex, page, params, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return insertImpl(nav, delegate, animation, insertIndex, page, params, opts);
        });
    };
    NavControllerImpl.prototype.insertPages = function (nav, insertIndex, insertPages, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return insertPagesImpl(nav, delegate, animation, insertIndex, insertPages, opts);
        });
    };
    NavControllerImpl.prototype.popToRoot = function (nav, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return popToRootImpl(nav, delegate, animation, opts);
        });
    };
    NavControllerImpl.prototype.popTo = function (nav, indexOrViewCtrl, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return popToImpl(nav, delegate, animation, indexOrViewCtrl, opts);
        });
    };
    NavControllerImpl.prototype.remove = function (nav, startIndex, removeCount, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return removeImpl(nav, delegate, animation, startIndex, removeCount, opts);
        });
    };
    NavControllerImpl.prototype.removeView = function (nav, viewController, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return removeViewImpl(nav, delegate, animation, viewController, opts);
        });
    };
    NavControllerImpl.prototype.setPages = function (nav, componentDataPairs, opts) {
        return hydrateDelegateAndAnimation(this).then(function (_a) {
            var delegate = _a[0], animation = _a[1];
            return setPagesImpl(nav, delegate, animation, componentDataPairs, opts);
        });
    };
    NavControllerImpl.prototype.render = function () {
        return h(0, 0);
    };
    return NavControllerImpl;
}());
export { NavControllerImpl };
export function hydrateDelegateAndAnimation(navController) {
    return Promise.all([hydrateDelegate(navController), hydrateAnimationController(navController.animationCtrl)]);
}
export function hydrateDelegate(navController) {
    if (navController.delegate) {
        return Promise.resolve(navController.delegate);
    }
    // no delegate is set, so fall back to inserting the stencil-ion-nav-delegate
    var element = document.createElement('stencil-ion-nav-delegate');
    document.body.appendChild(element);
    return isReady(element).then(function () {
        defaultDelegate = element;
        return defaultDelegate;
    });
}
export function hydrateAnimationController(animationController) {
    return animationController.create();
}

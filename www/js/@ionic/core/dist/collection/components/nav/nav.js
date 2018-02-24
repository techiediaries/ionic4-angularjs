import { getActiveImpl, getFirstView, getPreviousImpl, getViews, init } from '../../navigation/nav-utils';
import { isReady } from '../../utils/helpers';
var IonNav = /** @class */ (function () {
    function IonNav() {
        init(this);
    }
    IonNav.prototype.componentDidLoad = function () {
        componentDidLoadImpl(this);
    };
    IonNav.prototype.getViews = function () {
        return getViews(this);
    };
    IonNav.prototype.push = function (component, data, opts) {
        return pushImpl(this, component, data, opts);
    };
    IonNav.prototype.pop = function (opts) {
        return popImpl(this, opts);
    };
    IonNav.prototype.setRoot = function (component, data, opts) {
        return setRootImpl(this, component, data, opts);
    };
    IonNav.prototype.insert = function (insertIndex, page, params, opts) {
        return insertImpl(this, insertIndex, page, params, opts);
    };
    IonNav.prototype.insertPages = function (insertIndex, insertPages, opts) {
        return insertPagesImpl(this, insertIndex, insertPages, opts);
    };
    IonNav.prototype.popToRoot = function (opts) {
        return popToRootImpl(this, opts);
    };
    IonNav.prototype.popTo = function (indexOrViewCtrl, opts) {
        return popToImpl(this, indexOrViewCtrl, opts);
    };
    IonNav.prototype.remove = function (startIndex, removeCount, opts) {
        return removeImpl(this, startIndex, removeCount, opts);
    };
    IonNav.prototype.removeView = function (viewController, opts) {
        return removeViewImpl(this, viewController, opts);
    };
    IonNav.prototype.setPages = function (componentDataPairs, opts) {
        return setPagesImpl(this, componentDataPairs, opts);
    };
    IonNav.prototype.getActive = function () {
        return getActiveImpl(this);
    };
    IonNav.prototype.getPrevious = function (view) {
        return getPreviousImpl(this, view);
    };
    IonNav.prototype.canGoBack = function (nav) {
        return nav.views && nav.views.length > 0;
    };
    IonNav.prototype.canSwipeBack = function () {
        return true; // TODO, implement this for real
    };
    IonNav.prototype.getFirstView = function () {
        return getFirstView(this);
    };
    IonNav.prototype.navInitialized = function (event) {
        navInitializedImpl(this, event);
    };
    IonNav.prototype.render = function () {
        return h(0, 0);
    };
    return IonNav;
}());
export { IonNav };
export function componentDidLoadImpl(nav) {
    nav.navInit.emit(nav);
    if (nav.root) {
        nav.setRoot(nav.root);
    }
}
export function pushImpl(nav, component, data, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.push(nav, component, data, opts);
    });
}
export function popImpl(nav, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.pop(nav, opts);
    });
}
export function setRootImpl(nav, component, data, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.setRoot(nav, component, data, opts);
    });
}
export function insertImpl(nav, insertIndex, page, params, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.insert(nav, insertIndex, page, params, opts);
    });
}
export function insertPagesImpl(nav, insertIndex, insertPages, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.insertPages(nav, insertIndex, insertPages, opts);
    });
}
export function popToRootImpl(nav, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.popToRoot(nav, opts);
    });
}
export function popToImpl(nav, indexOrViewCtrl, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.popTo(nav, indexOrViewCtrl, opts);
    });
}
export function removeImpl(nav, startIndex, removeCount, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.remove(nav, startIndex, removeCount, opts);
    });
}
export function removeViewImpl(nav, viewController, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.removeView(nav, viewController, opts);
    });
}
export function setPagesImpl(nav, componentDataPairs, opts) {
    return getNavController(nav).then(function () {
        return nav.navController.setPages(nav, componentDataPairs, opts);
    });
}
export function getNavController(nav) {
    if (nav.navController) {
        return Promise.resolve();
    }
    nav.navController = document.querySelector('ion-nav-controller');
    return isReady(nav.navController);
}
export function navInitializedImpl(potentialParent, event) {
    if (potentialParent.element !== event.target) {
        // set the parent on the child nav that dispatched the event
        event.detail.parent = potentialParent;
        if (!potentialParent.childNavs) {
            potentialParent.childNavs = [];
        }
        potentialParent.childNavs.push(event.detail);
        // kill the event so it doesn't propagate further
        event.stopPropagation();
    }
}

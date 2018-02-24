import { isReady } from '../../utils/helpers';
var rootNavs = new Map();
var IonApp = /** @class */ (function () {
    function IonApp() {
    }
    IonApp.prototype.registerRootNav = function (event) {
        rootNavs.set(event.detail.id, event.detail);
    };
    IonApp.prototype.componentWillLoad = function () {
        componentDidLoadImpl(this);
    };
    IonApp.prototype.getActiveNavs = function (rootNavId) {
        /*const portal = portals.get(PORTAL_MODAL);
        if (portal && portal.views && portal.views.length) {
          return findTopNavs(portal);
        }
        */
        // TODO - figure out if a modal is open, don't use portal
        if (!rootNavs.size) {
            return [];
        }
        if (rootNavId) {
            return findTopNavs(rootNavs.get(rootNavId));
        }
        if (rootNavs.size === 1) {
            return findTopNavs(rootNavs.values().next().value);
        }
        // fallback to just using all root navs
        var activeNavs = [];
        rootNavs.forEach(function (nav) {
            activeNavs = activeNavs.concat(findTopNavs(nav));
        });
        return activeNavs;
    };
    IonApp.prototype.getNavByIdOrName = function (nameOrId) {
        var navs = Array.from(rootNavs.values());
        for (var _i = 0, navs_1 = navs; _i < navs_1.length; _i++) {
            var navContainer = navs_1[_i];
            var match = getNavByIdOrNameImpl(navContainer, nameOrId);
            if (match) {
                return match;
            }
        }
        return null;
    };
    IonApp.prototype.render = function () {
        return ([
            h(0, 0)
        ]);
    };
    return IonApp;
}());
export { IonApp };
export function findTopNavs(nav) {
    var containers = [];
    var childNavs = nav.getActiveChildNavs();
    if (!childNavs || !childNavs.length) {
        containers.push(nav);
    }
    else {
        childNavs.forEach(function (childNav) {
            var topNavs = findTopNavs(childNav);
            containers = containers.concat(topNavs);
        });
    }
    return containers;
}
export function getNavByIdOrNameImpl(nav, id) {
    if (nav.id === id || nav.name === id) {
        return nav;
    }
    for (var _i = 0, _a = nav.getAllChildNavs(); _i < _a.length; _i++) {
        var child = _a[_i];
        var tmp = getNavByIdOrNameImpl(child, id);
        if (tmp) {
            return tmp;
        }
    }
    return null;
}
export function componentDidLoadImpl(app) {
    app.element.classList.add(app.config.get('mode'));
    // TODO add platform classes
    if (app.config.getBoolean('hoverCSS', true)) {
        app.element.classList.add('enable-hover');
    }
    // TODO fire platform ready
}
export function handleBackButtonClick() {
    // if there is a menu controller dom element, hydrate it, otherwise move on
    // TODO ensure ion-menu-controller is the name
    var menuControllerElement = document.querySelector('ion-menu-controller'); // TODO - use menu controller types
    var promise = menuControllerElement ? isReady(menuControllerElement) : Promise.resolve();
    return promise.then(function () {
        // TODO check if the menu is open, close it if so
        console.log('todo');
    });
}

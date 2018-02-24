var StencilNavDelegate = /** @class */ (function () {
    function StencilNavDelegate() {
    }
    StencilNavDelegate.prototype.attachViewToDom = function (nav, enteringView) {
        return new Promise(function (resolve) {
            var usersElement = document.createElement(enteringView.component);
            var ionPage = document.createElement('ion-page');
            enteringView.element = ionPage;
            ionPage.appendChild(usersElement);
            nav.element.appendChild(ionPage);
            ionPage.componentOnReady(function () {
                resolve();
            });
        });
    };
    StencilNavDelegate.prototype.removeViewFromDom = function (nav, leavingView) {
        nav.element.removeChild(leavingView.element);
        return Promise.resolve();
    };
    return StencilNavDelegate;
}());
export { StencilNavDelegate };

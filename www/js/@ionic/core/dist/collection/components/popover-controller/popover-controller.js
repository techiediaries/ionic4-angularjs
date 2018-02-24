var PopoverController = /** @class */ (function () {
    function PopoverController() {
        this.ids = 0;
        this.popoverResolves = {};
        this.popovers = [];
    }
    PopoverController.prototype.create = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-popover component
        var popover = document.createElement('ion-popover');
        var id = this.ids++;
        // give this popover a unique id
        popover.id = "popover-" + id;
        popover.style.zIndex = (10000 + id).toString();
        // convert the passed in popover options into props
        // that get passed down into the new popover
        Object.assign(popover, opts);
        // append the popover element to the document body
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(popover);
        // store the resolve function to be called later up when the popover loads
        return new Promise(function (resolve) {
            _this.popoverResolves[popover.id] = resolve;
        });
    };
    PopoverController.prototype.viewDidLoad = function (ev) {
        var popover = ev.detail.popover;
        var popoverResolve = this.popoverResolves[popover.id];
        if (popoverResolve) {
            popoverResolve(popover);
            delete this.popoverResolves[popover.id];
        }
    };
    PopoverController.prototype.willPresent = function (ev) {
        this.popovers.push(ev.detail.popover);
    };
    PopoverController.prototype.willDismiss = function (ev) {
        var index = this.popovers.indexOf(ev.detail.popover);
        if (index > -1) {
            this.popovers.splice(index, 1);
        }
    };
    PopoverController.prototype.escapeKeyUp = function () {
        var lastPopover = this.popovers[this.popovers.length - 1];
        if (lastPopover) {
            lastPopover.dismiss();
        }
    };
    return PopoverController;
}());
export { PopoverController };

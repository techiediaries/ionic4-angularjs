var ToastController = /** @class */ (function () {
    function ToastController() {
        this.ids = 0;
        this.toastResolves = {};
        this.toasts = [];
    }
    ToastController.prototype.create = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-toast component
        var toast = document.createElement('ion-toast');
        var id = this.ids++;
        // give this toast a unique id
        toast.id = "toast-" + id;
        toast.style.zIndex = (10000 + id).toString();
        // convert the passed in toast options into props
        // that get passed down into the new toast
        Object.assign(toast, opts);
        // append the toast element to the document body
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(toast);
        // store the resolve function to be called later up when the toast loads
        return new Promise(function (resolve) {
            _this.toastResolves[toast.id] = resolve;
        });
    };
    ToastController.prototype.viewDidLoad = function (ev) {
        var toast = ev.detail.toast;
        var toastResolve = this.toastResolves[toast.id];
        if (toastResolve) {
            toastResolve(toast);
            delete this.toastResolves[toast.id];
        }
    };
    ToastController.prototype.willPresent = function (ev) {
        this.toasts.push(ev.detail.toast);
    };
    ToastController.prototype.willDismiss = function (ev) {
        var index = this.toasts.indexOf(ev.detail.toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }
    };
    ToastController.prototype.escapeKeyUp = function () {
        var lastToast = this.toasts[this.toasts.length - 1];
        if (lastToast) {
            lastToast.dismiss();
        }
    };
    return ToastController;
}());
export { ToastController };

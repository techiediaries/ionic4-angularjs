var AlertController = /** @class */ (function () {
    function AlertController() {
        this.ids = 0;
        this.alertResolves = {};
        this.alerts = [];
    }
    AlertController.prototype.create = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-alert component
        var alert = document.createElement('ion-alert');
        var id = this.ids++;
        // give this action sheet a unique id
        alert.id = "alert-" + id;
        alert.style.zIndex = (20000 + id).toString();
        // convert the passed in action sheet options into props
        // that get passed down into the new action sheet
        Object.assign(alert, opts);
        // append the action sheet element to the document body
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(alert);
        // store the resolve function to be called later up when the action sheet loads
        return new Promise(function (resolve) {
            _this.alertResolves[alert.id] = resolve;
        });
    };
    AlertController.prototype.viewDidLoad = function (ev) {
        var alert = ev.detail.alert;
        var alertResolve = this.alertResolves[alert.id];
        if (alertResolve) {
            alertResolve(alert);
            delete this.alertResolves[alert.id];
        }
    };
    AlertController.prototype.willPresent = function (ev) {
        this.alerts.push(ev.detail.alert);
    };
    AlertController.prototype.willDismiss = function (ev) {
        var index = this.alerts.indexOf(ev.detail.alert);
        if (index > -1) {
            this.alerts.splice(index, 1);
        }
    };
    AlertController.prototype.escapeKeyUp = function () {
        var lastAlert = this.alerts[this.alerts.length - 1];
        if (lastAlert) {
            lastAlert.dismiss();
        }
    };
    return AlertController;
}());
export { AlertController };

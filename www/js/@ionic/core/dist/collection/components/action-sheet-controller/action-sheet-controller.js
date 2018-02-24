var ActionSheetController = /** @class */ (function () {
    function ActionSheetController() {
        this.ids = 0;
        this.actionSheetResolves = {};
        this.actionSheets = [];
    }
    ActionSheetController.prototype.create = function (opts) {
        var _this = this;
        // create ionic's wrapping ion-action-sheet component
        var actionSheet = document.createElement('ion-action-sheet');
        var id = this.ids++;
        // give this action sheet a unique id
        actionSheet.id = "action-sheet-" + id;
        actionSheet.style.zIndex = (20000 + id).toString();
        // convert the passed in action sheet options into props
        // that get passed down into the new action sheet
        Object.assign(actionSheet, opts);
        // append the action sheet element to the document body
        var appRoot = document.querySelector('ion-app') || document.body;
        appRoot.appendChild(actionSheet);
        // store the resolve function to be called later up when the action sheet loads
        return new Promise(function (resolve) {
            _this.actionSheetResolves[actionSheet.id] = resolve;
        });
    };
    ActionSheetController.prototype.viewDidLoad = function (ev) {
        var actionSheet = ev.detail.actionSheet;
        var actionSheetResolve = this.actionSheetResolves[actionSheet.id];
        if (actionSheetResolve) {
            actionSheetResolve(actionSheet);
            delete this.actionSheetResolves[actionSheet.id];
        }
    };
    ActionSheetController.prototype.willPresent = function (ev) {
        this.actionSheets.push(ev.detail.actionSheet);
    };
    ActionSheetController.prototype.willDismiss = function (ev) {
        var index = this.actionSheets.indexOf(ev.detail.actionSheet);
        if (index > -1) {
            this.actionSheets.splice(index, 1);
        }
    };
    ActionSheetController.prototype.escapeKeyUp = function () {
        var lastActionSheet = this.actionSheets[this.actionSheets.length - 1];
        if (lastActionSheet) {
            lastActionSheet.dismiss();
        }
    };
    return ActionSheetController;
}());
export { ActionSheetController };

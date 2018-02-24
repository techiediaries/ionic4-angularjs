var IonUtils = /** @class */ (function () {
    function IonUtils() {
    }
    IonUtils.prototype.setTitle = function (newTitle) {
        if (document.title !== newTitle) {
            document.title = newTitle;
        }
    };
    return IonUtils;
}());
export { IonUtils };

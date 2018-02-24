var SelectPopover = /** @class */ (function () {
    function SelectPopover() {
    }
    SelectPopover.prototype.onChange = function (ev) {
        this.value = ev.detail.value;
    };
    // public get value() {
    //   let checkedOption = this.options.find(option => option.checked);
    //   return checkedOption ? checkedOption.value : undefined;
    // }
    SelectPopover.prototype.dismiss = function (value) {
        this.ionDismiss.emit(value);
    };
    SelectPopover.prototype.valueChanged = function (value) {
        var checkedOption = this.options.find(function (option) { return option.value === value; });
        if (checkedOption && checkedOption.handler) {
            checkedOption.handler();
        }
        this.dismiss(value);
    };
    SelectPopover.prototype.render = function () {
        return (h("ion-list", { "a": { "no-lines": this.mode === 'md' } },
            h("ion-radio-group", { "p": { "value": this.value } }, this.options.map(function (option) {
                return h("ion-item", 0,
                    h("ion-label", 0, option.text),
                    h("ion-radio", { "a": { "disabled": option.disabled }, "p": { "checked": option.checked, "value": option.value } }));
            }))));
    };
    return SelectPopover;
}());
export { SelectPopover };

var SelectOption = /** @class */ (function () {
    function SelectOption() {
        /**
         * @input {boolean} If true, the user cannot interact with this element.
         */
        this.disabled = false;
        /**
         * @input {boolean} If true, the element is selected.
         */
        this.selected = false;
    }
    SelectOption.prototype.getText = function () {
        return this.el.textContent || '';
    };
    SelectOption.prototype.render = function () {
        return h(0, 0);
    };
    return SelectOption;
}());
export { SelectOption };

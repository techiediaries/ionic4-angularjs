var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { deepCopy, isCheckedProperty } from '../../utils/helpers';
var Select = /** @class */ (function () {
    function Select() {
        this.texts = [];
        this.options = [];
        /**
         * @input {boolean} If true, the user cannot interact with this element. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * @input {string} The text to display on the cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the ok button. Default: `OK`.
         */
        this.okText = 'OK';
        /**
         * @input {any} Any additional options that the `alert` or `action-sheet` interface can take.
         * See the [AlertController API docs](../../alert/AlertController/#create) and the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) for the
         * create options for each interface.
         */
        this.selectOptions = {};
        /**
         * @input {string} The interface the select should use: `action-sheet`, `popover` or `alert`. Default: `alert`.
         */
        this.interface = 'alert';
    }
    Select.prototype.valueChanged = function () {
        this.optionUpdated();
    };
    Select.prototype["componentDidLoad"] = function () {
        // Get the parent item
        this.item = this.el.closest('ion-item');
        this.setOptions();
    };
    Select.prototype.setOptions = function () {
        var _this = this;
        // Get the options
        var options = this.el.querySelectorAll('ion-select-option');
        Array.from(options).forEach(function (option) {
            if (!option.value) {
                option.value = option.getText();
            }
            _this.options.push(option.$instance);
        });
        var values = this.getValues();
        if (values.length === 0) {
            // there are no values set at this point
            // so check to see who should be selected
            var filtered = this.options.filter(function (o) { return o.selected; }).map(function (o) { return o.value; });
            this.value = filtered;
        }
        else {
            this.optionUpdated();
        }
    };
    /**
     * @hidden
     * Update the select options when the value changes
     */
    Select.prototype.optionUpdated = function () {
        var _this = this;
        this.texts = [];
        if (this.options) {
            this.options.forEach(function (option) {
                // check this option if the option's value is in the values array
                option.selected = _this.getValues().some(function (selectValue) {
                    return isCheckedProperty(selectValue, option.value);
                });
                if (option.selected) {
                    _this.texts.push(option.getText());
                }
            });
        }
        this.text = this.texts.join(', ');
    };
    /**
     * @hidden
     */
    Select.prototype.getValues = function () {
        if (!this.value) {
            return [];
        }
        var values = Array.isArray(this.value) ? this.value : [this.value];
        return values;
    };
    /**
     * Close the select interface.
     */
    Select.prototype.close = function () {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
            return;
        }
        return this.overlay.dismiss();
    };
    /**
     * @hidden
     */
    Select.prototype.getText = function () {
        return (this.multiple ? this.texts : this.texts.join());
    };
    /**
     * @hidden
     */
    Select.prototype.resetInterface = function (ev) {
        var selectInterface = this.interface;
        if (selectInterface === 'action-sheet' && this.options.length > 6) {
            console.warn('Interface cannot be "' + selectInterface + '" with more than 6 options. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn('Interface cannot be "' + selectInterface + '" with a multi-value select. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Interface cannot be "' + selectInterface + '" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        return selectInterface;
    };
    Select.prototype.buildAlert = function (selectOptions) {
        var _this = this;
        console.debug('Build Select: Alert with', selectOptions, this.options);
        // user cannot provide inputs from selectOptions
        // alert inputs must be created by ionic from ion-select-options
        selectOptions.inputs = this.options.map(function (option) {
            return {
                type: (_this.multiple ? 'checkbox' : 'radio'),
                label: option.getText(),
                value: option.value,
                checked: option.selected,
                disabled: option.disabled,
                handler: function (selectedOption) {
                    // Only emit the select event if it is being checked
                    // For multi selects this won't emit when unchecking
                    if (selectedOption.checked) {
                        option.ionSelect.emit(option.value);
                    }
                }
            };
        });
        // If multiple is true use checkboxes, else use radio buttons
        var selectCssClass = 'select-alert ' + this.multiple ? 'multiple-select-alert' : 'single-select-alert';
        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
        // Add an ok button to the alert
        selectOptions.buttons = selectOptions.buttons.concat({
            text: this.okText,
            handler: function (selectedValues) { return _this.value = selectedValues; }
        });
        // create the alert instance from our built up selectOptions
        var alertOptions = __assign({ cssClass: selectCssClass }, selectOptions);
        console.debug('Built Select: Alert with', alertOptions);
        return this.alertCtrl.create(alertOptions);
    };
    Select.prototype.buildActionSheet = function (selectOptions) {
        var _this = this;
        console.debug('Building Select: Action Sheet with', selectOptions, this.options);
        selectOptions.buttons = selectOptions.buttons.concat(this.options.map(function (option) {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.getText(),
                handler: function () {
                    _this.value = option.value;
                    option.ionSelect.emit(option.value);
                }
            };
        }));
        var selectCssClass = 'select-action-sheet';
        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
        var actionSheetOptions = __assign({ cssClass: selectCssClass }, selectOptions);
        console.debug('Built Select: Action Sheet with', actionSheetOptions);
        return this.actionSheetCtrl.create(actionSheetOptions);
    };
    Select.prototype.buildPopover = function (selectOptions) {
        var _this = this;
        console.debug('Building Select: Popover with', selectOptions, this.options);
        selectOptions = this.options.map(function (option) {
            return {
                text: option.getText(),
                checked: option.selected,
                disabled: option.disabled,
                value: option.value,
                handler: function () {
                    _this.value = option.value;
                    option.ionSelect.emit(option.value);
                }
            };
        });
        var selectCssClass = 'select-popover';
        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
        var popoverOptions = {
            component: 'ion-select-popover',
            componentProps: {
                options: selectOptions
            },
            cssClass: selectCssClass,
            ev: event
        };
        console.debug('Built Select: Popover with', popoverOptions);
        return this.popoverCtrl.create(popoverOptions);
    };
    Select.prototype.open = function (ev) {
        var _this = this;
        // the user may have assigned some options specifically for the alert
        var selectOptions = deepCopy(this.selectOptions);
        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        selectOptions.buttons = [{
                text: this.cancelText,
                role: 'cancel',
                handler: function () {
                    _this.ionCancel.emit(_this);
                }
            }];
        // if the selectOptions didn't provide a title then use the label's text
        if (!selectOptions.title && this.item) {
            selectOptions.title = this.item.getLabelText();
        }
        // If the user passed in an invalid interface we need to reset it to alert
        var selectInterface = this.resetInterface(ev);
        var controller;
        if (selectInterface === 'action-sheet') {
            controller = this.buildActionSheet(selectOptions);
        }
        else if (selectInterface === 'popover') {
            controller = this.buildPopover(selectOptions);
        }
        else {
            controller = this.buildAlert(selectOptions);
        }
        controller.then(function (component) {
            component.present();
            // component.onDidDismiss(() => {
            //   this.overlay = undefined;
            // })
            // this.overlay = component;
        });
    };
    Select.prototype.hostData = function () {
        return {
            class: {
                'select-disabled': this.disabled
            }
        };
    };
    Select.prototype.render = function () {
        var addPlaceholderClass = false;
        // If selected text has been passed in, use that first
        var selectText = this.selectedText || this.text;
        if (!selectText && this.placeholder) {
            selectText = this.placeholder;
            addPlaceholderClass = true;
        }
        var selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return [
            h("div", { "c": selectTextClasses }, selectText),
            h("div", { "c": { "select-icon": true } },
                h("div", { "c": { "select-icon-inner": true } })),
            h("button", { "c": { "item-cover": true }, "o": { "click": this.open.bind(this) }, "a": { "aria-haspopup": 'true', "aria-labelledby": this.labelId, "aria-disabled": this.disabled ? 'true' : false }, "p": { "id": this.id } })
        ];
    };
    return Select;
}());
export { Select };

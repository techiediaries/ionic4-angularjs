import { isCheckedProperty } from '../../utils/helpers';
var RadioGroup = /** @class */ (function () {
    function RadioGroup() {
        this.radios = [];
        this.ids = 0;
        /*
         * @input {boolean} If true, the radios can be deselected. Default false.
         */
        this.allowEmptySelection = false;
        /*
         * @input {boolean} If true, the user cannot interact with this element. Default false.
         */
        this.disabled = false;
    }
    RadioGroup.prototype.valueChanged = function () {
        this.update();
        this.ionChange.emit(this);
    };
    RadioGroup.prototype.radioDidLoad = function (ev) {
        var radio = ev.detail.radio;
        this.radios.push(radio);
        radio.id = 'rb-' + this.id + '-' + (++this.ids);
        // if the value is not defined then use its unique id
        radio.value = !radio.value ? radio.id : radio.value;
        if (radio.checked && !this.value) {
            this.value = radio.value;
        }
    };
    RadioGroup.prototype.radioCheckedDidChange = function (ev) {
        var radio = ev.detail.radio;
        // TODO shouldn't be able to set radio checked to false
        // if allowEmptySelection is false
        if (radio.checked && this.value !== radio.value) {
            this.value = radio.checked ? radio.value : '';
        }
    };
    RadioGroup.prototype.radioDidToggle = function (ev) {
        var radio = ev.detail.radio;
        // If the group does not allow empty selection then checked
        // should be true, otherwise leave it as is
        radio.checked = this.allowEmptySelection ? radio.checked : true;
        this.value = radio.checked ? radio.value : '';
    };
    RadioGroup.prototype["componentWillLoad"] = function () {
        this.id = ++radioGroupIds;
        // Get the list header if it exists and set the id
        var header = this.el.querySelector('ion-list-header');
        if (header) {
            if (!header.id) {
                header.id = 'rg-hdr-' + this.id;
            }
            this.headerId = header.id;
        }
    };
    /**
     * @hidden
     */
    RadioGroup.prototype.update = function () {
        var _this = this;
        // loop through each of the radios
        var hasChecked = false;
        this.radios.forEach(function (radio) {
            // Check the radio if the value is the same as the group value
            radio.checked = isCheckedProperty(_this.value, radio.value) && !hasChecked;
            if (radio.checked) {
                // if this button is checked, then set it as
                // the radiogroup's active descendant
                _this.activeId = radio.id;
                hasChecked = true;
            }
        });
    };
    RadioGroup.prototype.hostData = function () {
        return {
            attrs: {
                'role': 'radiogroup',
                'aria-activedescendant': this.activeId,
                'aria-describedby': this.headerId
            }
        };
    };
    RadioGroup.prototype.render = function () {
        return h(0, 0);
    };
    return RadioGroup;
}());
export { RadioGroup };
var radioGroupIds = -1;

import { isArray, isString } from '../../utils/helpers';
var DateTime = /** @class */ (function () {
    function DateTime() {
        this.locale = {};
        /**
         * @input {boolean} If true, the user cannot interact with this element. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * @input {string} The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime picker's columns. See the `pickerFormat` input description for
         * more info. Defaults to `MMM D, YYYY`.
         */
        this.displayFormat = 'MMM D, YYYY';
        /**
         * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
         */
        this.doneText = 'Done';
        /**
         * @input {any} Any additional options that the picker interface can accept.
         * See the [Picker API docs](../../picker/Picker) for the picker options.
         */
        this.pickerOptions = {};
    }
    DateTime.prototype["componentDidLoad"] = function () {
        var _this = this;
        // first see if locale names were provided in the inputs
        // then check to see if they're in the config
        // if neither were provided then it will use default English names
        ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(function (type) {
            // this.locale[type] = convertToArrayOfStrings((this[type] ? this[type] : this.config.get(type), type);
            console.log('this[type]', _this[type]);
            _this.locale[type] = convertToArrayOfStrings(_this[type], type);
        });
        // this.initialize();
    };
    DateTime.prototype.open = function () {
        // TODO check this.isFocus() || this.disabled
        if (this.disabled) {
            return;
        }
        console.debug('datetime, open picker');
        // // the user may have assigned some options specifically for the alert
        // const pickerOptions = deepCopy(this.pickerOptions);
        // // Configure picker under the hood
        // const picker = this._picker = this._pickerCtrl.create(pickerOptions);
        // picker.addButton({
        //   text: this.cancelText,
        //   role: 'cancel',
        //   handler: () => this.ionCancel.emit(this)
        // });
        // picker.addButton({
        //   text: this.doneText,
        //   handler: (data: any) => this.value = data,
        // });
        // picker.ionChange.subscribe(() => {
        //   this.validate();
        //   picker.refresh();
        // });
        // // Update picker status before presenting
        // this.generate();
        // this.validate();
        // // Present picker
        // this._fireFocus();
        // picker.present(pickerOptions);
        // picker.onDidDismiss(() => {
        //   this._fireBlur();
        // });
    };
    DateTime.prototype.hostData = function () {
        return {
            class: {
                'datetime-disabled': this.disabled
            }
        };
    };
    DateTime.prototype.render = function () {
        console.log('rendering', this);
        var addPlaceholderClass = false;
        // If selected text has been passed in, use that first
        var dateTimeText = this.text;
        if (!dateTimeText && this.placeholder) {
            dateTimeText = this.placeholder;
            addPlaceholderClass = true;
        }
        var dateTimeTextClasses = {
            'datetime-text': true,
            'datetime-placeholder': addPlaceholderClass
        };
        return [
            h("div", { "c": dateTimeTextClasses }, dateTimeText),
            h("button", { "c": { "item-cover": true }, "o": { "click": this.open.bind(this) }, "a": { "aria-haspopup": 'true', "aria-labelledby": this.labelId, "aria-disabled": this.disabled ? 'true' : false }, "p": { "id": this.id } })
        ];
    };
    return DateTime;
}());
export { DateTime };
/**
 * @hidden
 * Use to convert a string of comma separated strings or
 * an array of strings, and clean up any user input
 */
function convertToArrayOfStrings(input, type) {
    if (!input) {
        return null;
    }
    if (isString(input)) {
        // convert the string to an array of strings
        // auto remove any [] characters
        input = input.replace(/\[|\]/g, '').split(',');
    }
    var values;
    if (isArray(input)) {
        // trim up each string value
        values = input.map(function (val) { return val.trim(); });
    }
    if (!values || !values.length) {
        console.warn("Invalid \"" + type + "Names\". Must be an array of strings, or a comma separated string.");
    }
    return values;
}
//   _locale: LocaleData = {};
//   /**
//    * @hidden
//    */
//   ngAfterContentInit() {
//     // first see if locale names were provided in the inputs
//     // then check to see if they're in the config
//     // if neither were provided then it will use default English names
//     ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(type => {
//       (<any>this)._locale[type] = convertToArrayOfStrings(isPresent((<any>this)[type]) ? (<any>this)[type] : this._config.get(type), type);
//     });
//     this._initialize();
//   }
//   /**
//    * @hidden
//    */
//   _inputNormalize(val: any): DateTimeData {
//     updateDate(this._value, val);
//     return this._value;
//   }
//   /**
//    * @hidden
//    */
//   _inputUpdated() {
//     this.updateText();
//   }
//   /**
//    * @hidden
//    */
//   _inputShouldChange(): boolean {
//     return true;
//   }
//   /**
//    * @hidden
//    */
//   _inputNgModelEvent(): any {
//     return convertDataToISO(this.value);
//   }
//   @HostListener('click', ['$event'])
//   _click(ev: UIEvent) {
//     // do not continue if the click event came from a form submit
//     if (ev.detail === 0) {
//       return;
//     }
//     ev.preventDefault();
//     ev.stopPropagation();
//     this.open();
//   }
//   /**
//    * @hidden
//    */
//   generate() {
//     const picker = this._picker;
//     // if a picker format wasn't provided, then fallback
//     // to use the display format
//     let template = this.pickerFormat || this.displayFormat || DEFAULT_FORMAT;
//     if (isPresent(template)) {
//       // make sure we've got up to date sizing information
//       this.calcMinMax();
//       // does not support selecting by day name
//       // automaticallly remove any day name formats
//       template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
//       if (template.indexOf('D') === -1) {
//         // there is not a day in the template
//         // replace the day name with a numeric one if it exists
//         template = template.replace('{~}', 'D');
//       }
//       // make sure no day name replacer is left in the string
//       template = template.replace(/{~}/g, '');
//       // parse apart the given template into an array of "formats"
//       parseTemplate(template).forEach(format => {
//         // loop through each format in the template
//         // create a new picker column to build up with data
//         let key = convertFormatToKey(format);
//         let values: any[];
//         // first see if they have exact values to use for this input
//         if (isPresent((<any>this)[key + 'Values'])) {
//           // user provide exact values for this date part
//           values = convertToArrayOfNumbers((<any>this)[key + 'Values'], key);
//         } else {
//           // use the default date part values
//           values = dateValueRange(format, this._min, this._max);
//         }
//         const column: PickerColumn = {
//           name: key,
//           selectedIndex: 0,
//           options: values.map(val => {
//             return {
//               value: val,
//               text: renderTextFormat(format, val, null, this._locale),
//             };
//           })
//         };
//         // cool, we've loaded up the columns with options
//         // preselect the option for this column
//         const optValue = getValueFromFormat(this.getValue(), format);
//         const selectedIndex = column.options.findIndex(opt => opt.value === optValue);
//         if (selectedIndex >= 0) {
//           // set the select index for this column's options
//           column.selectedIndex = selectedIndex;
//         }
//         // add our newly created column to the picker
//         picker.addColumn(column);
//       });
//       // Normalize min/max
//       const min = <any>this._min;
//       const max = <any>this._max;
//       const columns = this._picker.getColumns();
//       ['month', 'day', 'hour', 'minute']
//         .filter(name => !columns.find(column => column.name === name))
//         .forEach(name => {
//           min[name] = 0;
//           max[name] = 0;
//         });
//       this.divyColumns();
//     }
//   }
//   /**
//    * @hidden
//    */
//   validateColumn(name: string, index: number, min: number, max: number, lowerBounds: number[], upperBounds: number[]): number {
//     assert(lowerBounds.length === 5, 'lowerBounds length must be 5');
//     assert(upperBounds.length === 5, 'upperBounds length must be 5');
//     const column = this._picker.getColumn(name);
//     if (!column) {
//       return 0;
//     }
//     const lb = lowerBounds.slice();
//     const ub = upperBounds.slice();
//     const options = column.options;
//     let indexMin = options.length - 1;
//     let indexMax = 0;
//     for (var i = 0; i < options.length; i++) {
//       var opt = options[i];
//       var value = opt.value;
//       lb[index] = opt.value;
//       ub[index] = opt.value;
//       var disabled = opt.disabled = (
//         value < lowerBounds[index] ||
//         value > upperBounds[index] ||
//         dateSortValue(ub[0], ub[1], ub[2], ub[3], ub[4]) < min ||
//         dateSortValue(lb[0], lb[1], lb[2], lb[3], lb[4]) > max
//       );
//       if (!disabled) {
//         indexMin = Math.min(indexMin, i);
//         indexMax = Math.max(indexMax, i);
//       }
//     }
//     let selectedIndex = column.selectedIndex = clamp(indexMin, column.selectedIndex, indexMax);
//     opt = column.options[selectedIndex];
//     if (opt) {
//       return opt.value;
//     }
//     return 0;
//   }
//   /**
//    * @private
//    */
//   validate() {
//     const today = new Date();
//     const minCompareVal = dateDataSortValue(this._min);
//     const maxCompareVal = dateDataSortValue(this._max);
//     const yearCol = this._picker.getColumn('year');
//     assert(minCompareVal <= maxCompareVal, 'invalid min/max value');
//     let selectedYear: number = today.getFullYear();
//     if (yearCol) {
//       // default to the first value if the current year doesn't exist in the options
//       if (!yearCol.options.find(col => col.value === today.getFullYear())) {
//         selectedYear = yearCol.options[0].value;
//       }
//       var yearOpt = yearCol.options[yearCol.selectedIndex];
//       if (yearOpt) {
//         // they have a selected year value
//         selectedYear = yearOpt.value;
//       }
//     }
//     const selectedMonth = this.validateColumn(
//       'month', 1,
//       minCompareVal, maxCompareVal,
//       [selectedYear, 0, 0, 0, 0],
//       [selectedYear, 12, 31, 23, 59]
//     );
//     const numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
//     const selectedDay = this.validateColumn(
//       'day', 2,
//       minCompareVal, maxCompareVal,
//       [selectedYear, selectedMonth, 0, 0, 0],
//       [selectedYear, selectedMonth, numDaysInMonth, 23, 59]
//     );
//     const selectedHour = this.validateColumn(
//       'hour', 3,
//       minCompareVal, maxCompareVal,
//       [selectedYear, selectedMonth, selectedDay, 0, 0],
//       [selectedYear, selectedMonth, selectedDay, 23, 59]
//     );
//     this.validateColumn(
//       'minute', 4,
//       minCompareVal, maxCompareVal,
//       [selectedYear, selectedMonth, selectedDay, selectedHour, 0],
//       [selectedYear, selectedMonth, selectedDay, selectedHour, 59]
//     );
//   }
//   /**
//    * @hidden
//    */
//   divyColumns() {
//     const pickerColumns = this._picker.getColumns();
//     let columnsWidth: number[] = [];
//     let col: PickerColumn;
//     let width: number;
//     for (var i = 0; i < pickerColumns.length; i++) {
//       col = pickerColumns[i];
//       columnsWidth.push(0);
//       for (var j = 0; j < col.options.length; j++) {
//         width = col.options[j].text.length;
//         if (width > columnsWidth[i]) {
//           columnsWidth[i] = width;
//         }
//       }
//     }
//     if (columnsWidth.length === 2) {
//       width = Math.max(columnsWidth[0], columnsWidth[1]);
//       pickerColumns[0].align = 'right';
//       pickerColumns[1].align = 'left';
//       pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = `${width * 17}px`;
//     } else if (columnsWidth.length === 3) {
//       width = Math.max(columnsWidth[0], columnsWidth[2]);
//       pickerColumns[0].align = 'right';
//       pickerColumns[1].columnWidth = `${columnsWidth[1] * 17}px`;
//       pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = `${width * 17}px`;
//       pickerColumns[2].align = 'left';
//     }
//   }
//   /**
//    * @hidden
//    */
//   updateText() {
//     // create the text of the formatted data
//     const template = this.displayFormat || this.pickerFormat || DEFAULT_FORMAT;
//     this._text = renderDateTime(template, this.getValue(), this._locale);
//   }
//   /**
//    * @hidden
//    */
//   getValue(): DateTimeData {
//     return this._value;
//   }
//   /**
//    * @hidden
//    */
//   hasValue(): boolean {
//     const val = this._value;
//     return isPresent(val)
//       && isObject(val)
//       && Object.keys(val).length > 0;
//   }
//   /**
//    * @hidden
//    */
//   calcMinMax(now?: Date) {
//     const todaysYear = (now || new Date()).getFullYear();
//     if (isPresent(this.yearValues)) {
//       var years = convertToArrayOfNumbers(this.yearValues, 'year');
//       if (isBlank(this.min)) {
//         this.min = Math.min.apply(Math, years);
//       }
//       if (isBlank(this.max)) {
//         this.max = Math.max.apply(Math, years);
//       }
//     } else {
//       if (isBlank(this.min)) {
//         this.min = (todaysYear - 100).toString();
//       }
//       if (isBlank(this.max)) {
//         this.max = todaysYear.toString();
//       }
//     }
//     const min = this._min = parseDate(this.min);
//     const max = this._max = parseDate(this.max);
//     min.year = min.year || todaysYear;
//     max.year = max.year || todaysYear;
//     min.month = min.month || 1;
//     max.month = max.month || 12;
//     min.day = min.day || 1;
//     max.day = max.day || 31;
//     min.hour = min.hour || 0;
//     max.hour = max.hour || 23;
//     min.minute = min.minute || 0;
//     max.minute = max.minute || 59;
//     min.second = min.second || 0;
//     max.second = max.second || 59;
//     // Ensure min/max constraits
//     if (min.year > max.year) {
//       console.error('min.year > max.year');
//       min.year = max.year - 100;
//     }
//     if (min.year === max.year) {
//       if (min.month > max.month) {
//         console.error('min.month > max.month');
//         min.month = 1;
//       } else if (min.month === max.month && min.day > max.day) {
//         console.error('min.day > max.day');
//         min.day = 1;
//       }
//     }
//   }
// }
// /**
//  * @hidden
//  * Use to convert a string of comma separated numbers or
//  * an array of numbers, and clean up any user input
//  */
// function convertToArrayOfNumbers(input: any, type: string): number[] {
//   if (isString(input)) {
//     // convert the string to an array of strings
//     // auto remove any whitespace and [] characters
//     input = input.replace(/\[|\]|\s/g, '').split(',');
//   }
//   let values: number[];
//   if (isArray(input)) {
//     // ensure each value is an actual number in the returned array
//     values = input
//       .map((num: any) => parseInt(num, 10))
//       .filter(isFinite);
//   }
//   if (!values || !values.length) {
//     console.warn(`Invalid "${type}Values". Must be an array of numbers, or a comma separated string of numbers.`);
//   }
//   return values;
// }
// const DEFAULT_FORMAT = 'MMM D, YYYY';

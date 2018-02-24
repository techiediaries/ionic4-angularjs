import { focusOutActiveElement, getDocument, getWindow, hasFocusedTextInput } from '../../utils/helpers';
import { KEY_TAB } from './keys';
var v2KeyboardWillShowHandler = null;
var v2KeyboardWillHideHandler = null;
var v2KeyboardDidShowHandler = null;
var v2KeyboardDidHideHandler = null;
var v1keyboardHide = null;
var v1keyboardShow = null;
var timeoutValue = null;
var IonKeyboardController = /** @class */ (function () {
    function IonKeyboardController() {
    }
    IonKeyboardController.prototype.componentDidLoad = function () {
        componentDidLoadImpl(this);
    };
    IonKeyboardController.prototype.isOpen = function () {
        return hasFocusedTextInput();
    };
    IonKeyboardController.prototype.onClose = function (callback, pollingInterval, maxPollingChecks) {
        if (pollingInterval === void 0) { pollingInterval = KEYBOARD_CLOSE_POLLING; }
        if (maxPollingChecks === void 0) { maxPollingChecks = KEYBOARD_POLLING_CHECKS_MAX; }
        return onCloseImpl(this, callback, pollingInterval, maxPollingChecks);
    };
    return IonKeyboardController;
}());
export { IonKeyboardController };
export function onCloseImpl(keyboardController, callback, pollingInterval, maxPollingChecks) {
    var numChecks = 0;
    var promise = callback ? null : new Promise(function (resolve) {
        callback = resolve;
    });
    var checkKeyBoard = function () {
        if (!keyboardController.isOpen() || numChecks > maxPollingChecks) {
            setTimeout(function () {
                callback();
            }, 400);
        }
        else {
            setTimeout(checkKeyBoard, pollingInterval);
        }
        numChecks++;
    };
    setTimeout(checkKeyBoard, pollingInterval);
    return promise;
}
export function componentDidLoadImpl(keyboardController) {
    focusOutline(getDocument(), keyboardController.config.get('focusOutline'), keyboardController);
    if (keyboardController.config.getBoolean('keyboardResizes', false)) {
        listenV2(getWindow(), keyboardController);
    }
    else {
        listenV1(getWindow(), keyboardController);
    }
}
export function listenV2(win, keyboardController) {
    v2KeyboardWillShowHandler = function () {
        keyboardController.keyboardWillShow.emit();
    };
    win.addEventListener('keyboardWillShow', v2KeyboardWillShowHandler);
    v2KeyboardWillHideHandler = function () {
        keyboardController.keyboardWillHide.emit();
    };
    win.addEventListener('keyboardWillHide', v2KeyboardWillHideHandler);
    v2KeyboardDidShowHandler = function () {
        keyboardController.keyboardDidShow.emit();
    };
    win.addEventListener('keyboardDidShow', v2KeyboardDidShowHandler);
    v2KeyboardDidHideHandler = function () {
        keyboardController.keyboardDidHide.emit();
    };
    win.addEventListener('keyboardDidHide', v2KeyboardDidHideHandler);
}
export function listenV1(win, keyboardController) {
    v1keyboardHide = function () {
        blurActiveInput(true, keyboardController);
    };
    win.addEventListener('native.keyboardhide', v1keyboardHide);
    v1keyboardShow = function () {
        blurActiveInput(false, keyboardController);
    };
    win.addEventListener('native.keyboardshow', v1keyboardShow);
}
export function blurActiveInput(shouldBlur, keyboardController) {
    clearTimeout(timeoutValue);
    if (shouldBlur) {
        timeoutValue = setTimeout(function () {
            if (keyboardController.isOpen()) {
                focusOutActiveElement();
            }
        }, 80);
    }
}
export function focusOutline(doc, value, keyboardController) {
    /* Focus Outline
    * --------------------------------------------------
    * By default, when a keydown event happens from a tab key, then
    * the 'focus-outline' css class is added to the body element
    * so focusable elements have an outline. On a mousedown or
    * touchstart event, then the 'focus-outline' css class is removed.
    *
    * Config default overrides:
    * focusOutline: true     - Always add the focus-outline
    * focusOutline: false    - Do not add the focus-outline
    */
    var isKeyInputEnabled = false;
    var cssClass = function () {
        keyboardController.dom.write(function () {
            doc.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
        });
    };
    if (value === true) {
        isKeyInputEnabled = true;
        return cssClass();
    }
    else if (value === false) {
        return;
    }
    var keyDownHandler = function (event) {
        if (!isKeyInputEnabled && event.keyCode === KEY_TAB) {
            isKeyInputEnabled = true;
            enableKeyInput();
        }
    };
    var pointerDown = function () {
        isKeyInputEnabled = false;
        enableKeyInput();
    };
    var enableKeyInput = function () {
        cssClass();
        doc.removeEventListener('mousedown', pointerDown);
        doc.removeEventListener('touchstart', pointerDown);
        if (isKeyInputEnabled) {
            doc.addEventListener('mousedown', pointerDown);
            doc.addEventListener('touchstart', pointerDown);
        }
    };
    doc.addEventListener('keydown', keyDownHandler);
}
var KEYBOARD_CLOSE_POLLING = 150;
var KEYBOARD_POLLING_CHECKS_MAX = 100;

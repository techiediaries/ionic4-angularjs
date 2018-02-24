import { EventEmitter } from '@stencil/core';
import { KeyboardController } from './keyboard-interfaces';
import { Config } from '../..';
export declare class IonKeyboardController implements KeyboardController {
    config: Config;
    domController: any;
    keyboardWillShow: EventEmitter;
    keyboardDidShow: EventEmitter;
    keyboardWillHide: EventEmitter;
    keyboardDidHide: EventEmitter;
    componentDidLoad(): void;
    isOpen(): boolean;
    onClose(callback: Function, pollingInterval?: number, maxPollingChecks?: number): Promise<any>;
}
export declare function onCloseImpl(keyboardController: KeyboardController, callback: Function, pollingInterval: number, maxPollingChecks: number): Promise<any>;
export declare function componentDidLoadImpl(keyboardController: KeyboardController): void;
export declare function listenV2(win: Window, keyboardController: KeyboardController): void;
export declare function listenV1(win: Window, keyboardController: KeyboardController): void;
export declare function blurActiveInput(shouldBlur: boolean, keyboardController: KeyboardController): void;
export declare function focusOutline(doc: Document, value: boolean, keyboardController: KeyboardController): void;

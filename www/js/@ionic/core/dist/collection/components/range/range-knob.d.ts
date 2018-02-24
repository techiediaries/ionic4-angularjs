import { EventEmitter } from '@stencil/core';
export declare class RangeKnob {
    pressed: boolean;
    pin: boolean;
    min: number;
    max: number;
    val: number;
    disabled: boolean;
    labelId: string;
    knob: string;
    ratio: number;
    ionIncrease: EventEmitter;
    ionDecrease: EventEmitter;
    handleKeyBoard(ev: KeyboardEvent): void;
    leftPos(val: number): string;
    hostData(): {
        class: {
            'range-knob-pressed': boolean;
            'range-knob-min': boolean;
            'range-knob-max': boolean;
        };
        style: {
            'left': string;
        };
        attrs: {
            'role': string;
            'tabindex': number;
            'aria-valuemin': number;
            'aria-valuemax': number;
            'aria-disabled': boolean;
            'aria-labelledby': string;
            'aria-valuenow': number;
        };
    };
    render(): JSX.Element;
}
export declare const KEY_LEFT = 37;
export declare const KEY_UP = 38;
export declare const KEY_RIGHT = 39;
export declare const KEY_DOWN = 40;

import { EventEmitter } from '@stencil/core';
import { BaseInputComponent, GestureDetail } from '../../index';
export declare class Range implements BaseInputComponent {
    activated: boolean;
    hasFocus: boolean;
    id: string;
    labelId: string;
    startX: number;
    styleTmr: any;
    rangeEl: HTMLElement;
    _barL: string;
    _barR: string;
    _valA: number;
    _valB: number;
    _ratioA: number;
    _ratioB: number;
    _ticks: any[];
    _activeB: boolean;
    _rect: ClientRect;
    _pressed: boolean;
    _pressedA: boolean;
    _pressedB: boolean;
    ionChange: EventEmitter;
    ionStyle: EventEmitter;
    ionFocus: EventEmitter;
    ionBlur: EventEmitter;
    color: string;
    mode: string;
    value: any;
    disabled: boolean;
    min: number;
    max: number;
    steps: number;
    dualKnobs: boolean;
    pin: boolean;
    snaps: boolean;
    debounce: number;
    fireBlur(): void;
    disabledChanged(): void;
    valueChanged(val: boolean): void;
    ionViewWillLoad(): void;
    private emitStyle();
    fireFocus(): void;
    inputUpdated(): void;
    updateBar(): void;
    createTicks(): void;
    updateTicks(): void;
    valueToRatio(value: number): number;
    ratioToValue(ratio: number): number;
    inputNormalize(val: any): any;
    update(current: {
        x?: number;
        y?: number;
    }, rect: ClientRect, isPressed: boolean): boolean;
    ratio(): number;
    ratioUpper(): number;
    keyChng(ev: RangeEvent): void;
    onDragStart(detail: GestureDetail): boolean;
    onDragEnd(detail: GestureDetail): void;
    onDragMove(detail: GestureDetail): void;
    hostData(): {
        class: {
            'range-disabled': boolean;
            'range-pressed': boolean;
            'range-has-pin': boolean;
        };
    };
    render(): JSX.Element[];
}
export interface RangeEvent {
    detail: {
        isIncrease: boolean;
        knob: string;
    };
}

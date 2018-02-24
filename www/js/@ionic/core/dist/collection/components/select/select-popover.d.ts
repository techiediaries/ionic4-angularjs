import { EventEmitter } from '@stencil/core';
export interface SelectPopoverOption {
    text: string;
    value: string;
    disabled: boolean;
    checked: boolean;
    handler?: Function;
}
export declare class SelectPopover {
    mode: string;
    color: string;
    ionDismiss: EventEmitter;
    options: SelectPopoverOption[];
    value: string;
    onChange(ev: CustomEvent): void;
    dismiss(value: any): void;
    valueChanged(value: string): void;
    render(): JSX.Element;
}

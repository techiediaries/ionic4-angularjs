import { EventEmitter } from '@stencil/core';
export declare class SelectOption {
    el: HTMLElement;
    ionSelect: EventEmitter;
    /**
     * @input {boolean} If true, the user cannot interact with this element.
     */
    disabled: boolean;
    /**
     * @input {boolean} If true, the element is selected.
     */
    selected: boolean;
    /**
     * @input {string} The text value of the option.
     */
    value: string;
    getText(): string;
    render(): JSX.Element;
}

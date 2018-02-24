import { EventEmitter } from '@stencil/core';
/**
 * @description
 * A radio button is a button that can be either checked or unchecked. A user can tap
 * the button to check or uncheck it. It can also be checked from the template using
 * the `checked` property.
 *
 * Use an element with a `radio-group` attribute to group a set of radio buttons. When
 * radio buttons are inside a [radio group](../RadioGroup), exactly one radio button
 * in the group can be checked at any time. If a radio button is not placed in a group,
 * they will all have the ability to be checked at the same time.
 *
 * See the [Angular Forms Docs](https://angular.io/docs/ts/latest/guide/forms.html) for
 * more information on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="relationship">
 *   <ion-item>
 *     <ion-label>Friends</ion-label>
 *     <ion-radio value="friends" checked></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Family</ion-label>
 *     <ion-radio value="family"></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Enemies</ion-label>
 *     <ion-radio value="enemies" [disabled]="isDisabled"></ion-radio>
 *   </ion-item>
 * </ion-list>
 * ```
 * @demo /docs/demos/src/radio/
 * @see {@link /docs/components#radio Radio Component Docs}
 * @see {@link ../RadioGroup RadioGroup API Docs}
 */
export declare class Radio {
    mode: string;
    color: string;
    labelId: string;
    styleTmr: any;
    el: HTMLElement;
    id: string;
    activated: boolean;
    /**
     * @output {EventEmitter} Emitted when the radio loads.
     */
    ionRadioDidLoad: EventEmitter;
    /**
     * @output {EventEmitter} Emitted when the radio unloads.
     */
    ionRadioDidUnload: EventEmitter;
    /**
     * @output {EventEmitter} Emitted when the radio is toggled.
     */
    ionRadioDidToggle: EventEmitter;
    /**
     * @output {EventEmitter} Emitted when the radio checked property is changed.
     */
    ionRadioCheckedDidChange: EventEmitter;
    /**
     * @output {EventEmitter} Emitted when the styles of the radio change.
     */
    ionStyle: EventEmitter;
    /**
     * @output {EventEmitter} Emitted when the radio is selected.
     */
    ionSelect: EventEmitter;
    checked: boolean;
    disabled: boolean;
    /**
     * @input {string} the value of the radio.
     */
    value: string;
    ionViewWillLoad(): void;
    ionViewDidLoad(): void;
    colorChanged(): void;
    checkedChanged(val: boolean): void;
    disabledChanged(): void;
    private emitStyle();
    onSpace(ev: KeyboardEvent): void;
    toggle(): void;
    hostData(): {
        class: {
            'radio-checked': boolean;
            'radio-disabled': boolean;
        };
    };
    render(): JSX.Element[];
}
export interface RadioEvent extends Event {
    detail: {
        radio: Radio;
    };
}

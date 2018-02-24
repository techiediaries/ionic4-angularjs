import { EventEmitter } from '@stencil/core';
import { Radio, RadioEvent } from './radio';
/**
 * @name RadioGroup
 * @description
 * A radio group is a group of [radio buttons](../RadioButton). It allows
 * a user to select at most one radio button from a set. Checking one radio
 * button that belongs to a radio group unchecks any previous checked
 * radio button within the same group.
 *
 * See the [Angular Forms Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more information on forms and inputs.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="autoManufacturers">
 *
 *   <ion-list-header>
 *     Auto Manufacturers
 *   </ion-list-header>
 *
 *   <ion-item>
 *     <ion-label>Cord</ion-label>
 *     <ion-radio value="cord"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Duesenberg</ion-label>
 *     <ion-radio value="duesenberg"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Hudson</ion-label>
 *     <ion-radio value="hudson"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Packard</ion-label>
 *     <ion-radio value="packard"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Studebaker</ion-label>
 *     <ion-radio value="studebaker"></ion-radio>
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 * @demo /docs/demos/src/radio/
 * @see {@link /docs/components#radio Radio Component Docs}
 * @see {@link ../RadioButton RadioButton API Docs}
*/
export declare class RadioGroup {
    radios: Radio[];
    id: number;
    ids: number;
    el: HTMLElement;
    activeId: string;
    headerId: string;
    /**
     * @output {any} Emitted when the selected button has changed.
     */
    ionChange: EventEmitter;
    allowEmptySelection: boolean;
    disabled: boolean;
    /**
     * @input {string} the value of the radio.
     */
    value: string;
    valueChanged(): void;
    protected radioDidLoad(ev: RadioEvent): void;
    protected radioCheckedDidChange(ev: RadioEvent): void;
    protected radioDidToggle(ev: RadioEvent): void;
    ionViewWillLoad(): void;
    /**
     * @hidden
     */
    update(): void;
    hostData(): {
        attrs: {
            'role': string;
            'aria-activedescendant': string;
            'aria-describedby': string;
        };
    };
    render(): JSX.Element;
}

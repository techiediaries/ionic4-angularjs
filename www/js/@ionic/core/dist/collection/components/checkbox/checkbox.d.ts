import { EventEmitter } from '@stencil/core';
/**
 * @name Checkbox
 * @module ionic
 *
 * @description
 * placed in an `ion-item` or used as a stand-alone checkbox.
 *
 * See the [Angular Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 *
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-checkbox [(ngModel)]="sausage" disabled="true"></ion-checkbox>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-checkbox [(ngModel)]="mushrooms"></ion-checkbox>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * @advanced
 *
 * ```html
 *
 * <!-- Call function when state changes -->
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Cucumber</ion-label>
 *      <ion-checkbox [(ngModel)]="cucumber" (ionChange)="updateCucumber()"></ion-checkbox>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * ```ts
 * @Component({
 *   templateUrl: 'main.html'
 * })
 * class SaladPage {
 *   cucumber: boolean;
 *
 *   updateCucumber() {
 *     console.log('Cucumbers new state:' + this.cucumber);
 *   }
 * }
 * ```
 *
 * @demo /docs/demos/src/checkbox/
 * @see {@link /docs/components#checkbox Checkbox Component Docs}
 */
export declare class Checkbox {
    id: string;
    labelId: string;
    styleTmr: any;
    ionChange: EventEmitter;
    ionStyle: EventEmitter;
    checked: boolean;
    disabled: boolean;
    /**
     * @input {string} the value of the checkbox.
     */
    value: string;
    ionViewWillLoad(): void;
    checkedChanged(val: boolean): void;
    disabledChanged(): void;
    private emitStyle();
    onSpace(ev: KeyboardEvent): void;
    toggle(): void;
    hostData(): {
        class: {
            'checkbox-checked': boolean;
            'checkbox-disabled': boolean;
        };
    };
    render(): JSX.Element[];
}

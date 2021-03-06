import { EventEmitter } from '@stencil/core';
import { Side } from '../../utils/helpers';
/**
 * @name ItemOptions
 * @description
 * The option buttons for an `ion-item-sliding`. These buttons can be placed either on the left or right side.
 * You can combine the `(ionSwipe)` event plus the `expandable` directive to create a full swipe action for the item.
 *
 * @usage
 *
 * ```html
 * <ion-item-sliding>
 *   <ion-item>
 *     Item 1
 *   </ion-item>
 *   <ion-item-options side="right" (ionSwipe)="saveItem(item)">
 *     <ion-item-option expandable (click)="saveItem(item)">
 *       <ion-icon name="star"></ion-icon>
 *     </ion-item-option>
 *   </ion-item-options>
 * </ion-item-sliding>
 *```
 */
export declare class ItemOptions {
    private el;
    /**
     * @input {string} The side the option button should be on. Defaults to `"right"`.
     * If you have multiple `ion-item-options`, a side must be provided for each.
     */
    side: Side;
    /**
     * @output {event} Emitted when the item has been fully swiped.
     */
    ionSwipe: EventEmitter;
    /**
     * @hidden
     */
    isRightSide(): boolean;
    /**
     * @hidden
     */
    width(): number;
    render(): JSX.Element;
}

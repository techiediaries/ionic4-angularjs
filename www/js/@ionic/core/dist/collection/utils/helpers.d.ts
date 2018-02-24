export declare function clamp(min: number, n: number, max: number): number;
export declare function isDef(v: any): boolean;
export declare function isUndef(v: any): boolean;
export declare function isArray(v: any): v is Array<any>;
export declare function isObject(v: any): v is Object;
export declare function isBoolean(v: any): v is (boolean);
export declare function isString(v: any): v is (string);
export declare function isNumber(v: any): v is (number);
export declare function isFunction(v: any): v is (Function);
export declare function isStringOrNumber(v: any): v is (string | number);
/** @hidden */
export declare function isCheckedProperty(a: any, b: any): boolean;
export declare function assert(bool: boolean, msg: string): void;
export declare function toDashCase(str: string): string;
export declare function noop(): void;
export declare function pointerCoordX(ev: any): number;
export declare function updateDetail(ev: any, detail: any): void;
export declare function pointerCoordY(ev: any): number;
export declare type ElementRef = 'child' | 'parent' | 'body' | 'document' | 'window';
export declare function getElementReference(elm: any, ref: ElementRef): any;
export declare function getParentElement(elm: any): any;
export declare function applyStyles(elm: HTMLElement, styles: {
    [styleProp: string]: string | number;
}): void;
export declare function getToolbarHeight(toolbarTagName: string, pageChildren: HTMLElement[], mode: string, iosHeight: string, defaultHeight: string): string;
/** @hidden */
export declare type Side = 'left' | 'right' | 'start' | 'end';
export declare function checkEdgeSide(posX: number, isRightSide: boolean, maxEdgeStart: number): boolean;
/**
 * @hidden
 * Given a side, return if it should be on the right
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 * @param defaultRight whether the default side is right
 */
export declare function isRightSide(side: Side, isRTL: boolean, defaultRight?: boolean): boolean;
/** @hidden */
export declare function swipeShouldReset(isResetDirection: boolean, isMovingFast: boolean, isOnResetZone: boolean): boolean;
export declare function isReady(element: Element): Promise<any>;
export declare function getOrAppendElement(tagName: string): Element;
/** @hidden */
export declare function deepCopy(obj: any): any;
export declare function getWindow(): Window;
export declare function getDocument(): Document;
export declare function getActiveElement(): HTMLElement;
export declare function focusOutActiveElement(): void;
export declare function isTextInput(ele: any): boolean;
export declare const NON_TEXT_INPUT_REGEX: RegExp;
export declare function hasFocusedTextInput(): boolean;
/**
 * @private
 */
export declare function reorderArray(array: any[], indexes: {
    from: number;
    to: number;
}): any[];

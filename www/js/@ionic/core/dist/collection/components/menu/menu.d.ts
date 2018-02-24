import { EventEmitter } from '@stencil/core';
import { Animation, Config, SplitPaneAlert } from '../../index';
import { MenuController } from './menu-controller';
import { Side } from '../../utils/helpers';
export declare type Lazy<T> = T & {
    componentOnReady(): Promise<T>;
} & {
    componentOnReady(done: (cmp: T) => void): void;
};
export declare class Menu {
    private _backdropEle;
    private _menuInnerEle;
    private _unregCntClick;
    private _unregBdClick;
    private _activeBlock;
    private _cntElm;
    private _animation;
    private _init;
    private _isPane;
    private _isAnimating;
    private _isOpen;
    private _width;
    mode: string;
    color: string;
    /**
     * @hidden
     */
    isRightSide: boolean;
    private el;
    ionDrag: EventEmitter;
    ionOpen: EventEmitter;
    ionClose: EventEmitter;
    config: Config;
    lazyMenuCtrl: Lazy<MenuController>;
    menuCtrl: MenuController;
    /**
     * @input {string} The content's id the menu should use.
     */
    content: string;
    /**
     * @input {string} An id for the menu.
     */
    id: string;
    /**
     * @input {string} The display type of the menu. Default varies based on the mode,
     * see the `menuType` in the [config](../../config/Config). Available options:
     * `"overlay"`, `"reveal"`, `"push"`.
     */
    type: string;
    /**
     * @input {boolean} If true, the menu is enabled. Default `true`.
     */
    enabled: boolean;
    /**
     * @input {string} Which side of the view the menu should be placed. Default `"start"`.
     */
    side: Side;
    /**
     * @input {boolean} If true, swiping the menu is enabled. Default `true`.
     */
    swipeEnabled: boolean;
    /**
     * @input {boolean} If true, the menu will persist on child pages.
     */
    persistent: boolean;
    /**
     * @hidden
     */
    maxEdgeStart: number;
    splitPaneChanged(ev: SplitPaneAlert): void;
    enabledChanged(): void;
    swipeEnabledChange(): void;
    ionViewWillLoad(): Promise<MenuController>;
    /**
     * @hidden
     */
    ionViewDidLoad(): void;
    hostData(): {
        attrs: {
            'role': string;
            'side': string;
            'type': string;
        };
        class: {
            'menu-enabled': boolean;
        };
    };
    getSide(): string;
    render(): JSX.Element[];
    /**
     * @hidden
     */
    onBackdropClick(ev: UIEvent): void;
    /**
     * @hidden
     */
    private prepareAnimation();
    /**
     * @hidden
     */
    setOpen(shouldOpen: boolean, animated?: boolean): Promise<boolean>;
    _startAnimation(shouldOpen: boolean, animated: boolean): Promise<Animation>;
    _forceClosing(): void;
    getWidth(): number;
    /**
     * @hidden
     */
    canSwipe(): boolean;
    /**
     * @hidden
     */
    isAnimating(): boolean;
    /**
     * @hidden
     */
    isOpen(): boolean;
    _swipeWillStart(): Promise<void>;
    _swipeStart(): void;
    _swipeProgress(slide: any): void;
    _swipeEnd(slide: any): void;
    private _before();
    private _after(isOpen);
    /**
     * @hidden
     */
    open(): Promise<boolean>;
    /**
     * @hidden
     */
    close(): Promise<boolean>;
    /**
     * @hidden
     */
    resize(): void;
    canStart(detail: any): boolean;
    /**
     * @hidden
     */
    toggle(): Promise<boolean>;
    _canOpen(): boolean;
    /**
     * @hidden
     */
    _updateState(): void;
    /**
     * @hidden
     */
    enable(shouldEnable: boolean): Menu;
    /**
     * @internal
     */
    initPane(): boolean;
    /**
     * @hidden
     */
    swipeEnable(shouldEnable: boolean): Menu;
    /**
     * @hidden
     */
    getMenuElement(): HTMLElement;
    /**
     * @hidden
     */
    getContentElement(): HTMLElement;
    /**
     * @hidden
     */
    getBackdropElement(): HTMLElement;
    /**
     * @hidden
     */
    getMenuController(): MenuController;
    private _backdropClick(shouldAdd);
    /**
     * @hidden
     */
    ionViewDidUnload(): void;
}

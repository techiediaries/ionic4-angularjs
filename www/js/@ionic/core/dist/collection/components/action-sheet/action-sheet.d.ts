import { CssClassMap } from '@stencil/core';
import { AnimationBuilder, AnimationController, Config } from '../../index';
export declare class ActionSheet {
    private animation;
    private el;
    private ionActionSheetDidLoad;
    private ionActionSheetDidPresent;
    private ionActionSheetWillPresent;
    private ionActionSheetWillDismiss;
    private ionActionSheetDidDismiss;
    private ionActionSheetDidUnload;
    animationCtrl: AnimationController;
    config: Config;
    cssClass: string;
    title: string;
    subTitle: string;
    buttons: ActionSheetButton[];
    enableBackdropDismiss: boolean;
    enterAnimation: AnimationBuilder;
    exitAnimation: AnimationBuilder;
    id: string;
    present(): Promise<void>;
    private _present(resolve);
    dismiss(): Promise<{}>;
    protected ionViewDidUnload(): void;
    protected onDismiss(ev: UIEvent): void;
    protected ionViewDidLoad(): void;
    protected ionViewDidEnter(): void;
    protected backdropClick(): void;
    protected click(button: ActionSheetButton): void;
    protected render(): JSX.Element[];
    buttonClass(button: ActionSheetButton): CssClassMap;
}
export interface ActionSheetOptions {
    title?: string;
    subTitle?: string;
    cssClass?: string;
    buttons?: (ActionSheetButton | string)[];
    enableBackdropDismiss?: boolean;
}
export interface ActionSheetButton {
    text?: string;
    role?: string;
    icon?: string;
    cssClass?: string;
    handler?: () => boolean | void;
}
export interface ActionSheetEvent {
    detail: {
        actionSheet: ActionSheet;
    };
}

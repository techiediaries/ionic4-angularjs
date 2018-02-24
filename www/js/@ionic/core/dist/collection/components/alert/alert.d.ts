import { CssClassMap } from '@stencil/core';
import { AnimationBuilder, AnimationController, Config } from '../../index';
export declare class Alert {
    private animation;
    private activeId;
    private inputType;
    private el;
    private ionAlertDidLoad;
    private ionAlertDidPresent;
    private ionAlertWillPresent;
    private ionAlertWillDismiss;
    private ionAlertDidDismiss;
    private ionAlertDidUnload;
    animationCtrl: AnimationController;
    config: Config;
    cssClass: string;
    title: string;
    subTitle: string;
    message: string;
    buttons: AlertButton[];
    inputs: AlertInput[];
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
    rbClick(button: any): void;
    cbClick(button: any): void;
    btnClick(button: any): void;
    getValues(): any;
    buttonClass(button: AlertButton): CssClassMap;
    renderCheckbox(inputs: AlertInput[]): JSX.Element;
    renderRadio(inputs: AlertInput[]): JSX.Element;
    renderInput(inputs: AlertInput[]): JSX.Element;
    protected render(): JSX.Element[];
}
export interface AlertOptions {
    title?: string;
    subTitle?: string;
    message?: string;
    cssClass?: string;
    mode?: string;
    inputs?: AlertInput[];
    buttons?: (AlertButton | string)[];
    enableBackdropDismiss?: boolean;
}
export interface AlertInput {
    type?: string;
    name?: string | number;
    placeholder?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    handler?: Function;
    min?: string | number;
    max?: string | number;
}
export interface AlertButton {
    text?: string;
    role?: string;
    cssClass?: string;
    handler?: (value: any) => boolean | void;
}
export interface AlertEvent {
    detail: {
        alert: Alert;
    };
}

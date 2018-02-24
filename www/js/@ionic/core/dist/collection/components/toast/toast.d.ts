import { AnimationBuilder, AnimationController, Config, CssClassMap } from '../../index';
export declare class Toast {
    private animation;
    private el;
    private ionToastDidLoad;
    private ionToastDidPresent;
    private ionToastWillPresent;
    private ionToastWillDismiss;
    private ionToastDidDismiss;
    private ionToastDidUnload;
    animationCtrl: AnimationController;
    config: Config;
    message: string;
    cssClass: string;
    duration: number;
    showCloseButton: boolean;
    closeButtonText: string;
    dismissOnPageChange: boolean;
    position: string;
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
    protected render(): JSX.Element;
    wrapperClass(): CssClassMap;
}
export interface ToastOptions {
    message?: string;
    cssClass?: string;
    duration?: number;
    showCloseButton?: boolean;
    closeButtonText?: string;
    dismissOnPageChange?: boolean;
    position?: string;
    enterAnimation?: AnimationBuilder;
    exitAnimation?: AnimationBuilder;
}
export interface ToastEvent {
    detail: {
        toast: Toast;
    };
}

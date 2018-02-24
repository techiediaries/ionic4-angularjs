import { AnimationBuilder, AnimationController, Config } from '../../index';
export declare class Popover {
    private animation;
    positioned: boolean;
    private el;
    private ionPopoverDidLoad;
    private ionPopoverDidPresent;
    private ionPopoverWillPresent;
    private ionPopoverWillDismiss;
    private ionPopoverDidDismiss;
    private ionPopoverDidUnload;
    animationCtrl: AnimationController;
    config: Config;
    mode: string;
    color: string;
    component: string;
    componentProps: any;
    cssClass: string;
    enableBackdropDismiss: boolean;
    enterAnimation: AnimationBuilder;
    exitAnimation: AnimationBuilder;
    ev: Event;
    id: string;
    showBackdrop: boolean;
    present(): Promise<void>;
    private positionPopover();
    private showFromBottom(target, popover, body);
    private exceedsViewport(target, popover, body);
    private _present(resolve);
    dismiss(): Promise<{}>;
    protected ionViewDidUnload(): void;
    protected onDismiss(ev: UIEvent): void;
    protected ionViewDidLoad(): void;
    protected ionViewDidEnter(): void;
    protected backdropClick(): void;
    render(): JSX.Element[];
}
export interface PopoverOptions {
    component: string;
    componentProps?: any;
    showBackdrop?: boolean;
    enableBackdropDismiss?: boolean;
    enterAnimation?: AnimationBuilder;
    exitAnimation?: AnimationBuilder;
    cssClass?: string;
    ev: Event;
}
export interface PopoverEvent {
    detail: {
        popover: Popover;
    };
}
export declare const POPOVER_POSITION_PROPERTIES: any;

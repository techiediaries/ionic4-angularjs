import { Toast, ToastEvent, ToastOptions } from '../../index';
export declare class ToastController {
    private ids;
    private toastResolves;
    private toasts;
    create(opts?: ToastOptions): Promise<Toast>;
    protected viewDidLoad(ev: ToastEvent): void;
    protected willPresent(ev: ToastEvent): void;
    protected willDismiss(ev: ToastEvent): void;
    protected escapeKeyUp(): void;
}

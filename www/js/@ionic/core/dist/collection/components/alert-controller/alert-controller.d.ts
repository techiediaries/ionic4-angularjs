import { Alert, AlertEvent, AlertOptions } from '../../index';
export declare class AlertController {
    private ids;
    private alertResolves;
    private alerts;
    create(opts?: AlertOptions): Promise<Alert>;
    protected viewDidLoad(ev: AlertEvent): void;
    protected willPresent(ev: AlertEvent): void;
    protected willDismiss(ev: AlertEvent): void;
    protected escapeKeyUp(): void;
}

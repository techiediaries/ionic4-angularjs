import { Popover, PopoverEvent, PopoverOptions } from '../../index';
export declare class PopoverController {
    private ids;
    private popoverResolves;
    private popovers;
    create(opts?: PopoverOptions): Promise<Popover>;
    protected viewDidLoad(ev: PopoverEvent): void;
    protected willPresent(ev: PopoverEvent): void;
    protected willDismiss(ev: PopoverEvent): void;
    protected escapeKeyUp(): void;
}

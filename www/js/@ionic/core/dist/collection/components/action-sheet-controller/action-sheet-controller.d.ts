import { ActionSheet, ActionSheetEvent, ActionSheetOptions } from '../../index';
export declare class ActionSheetController {
    private ids;
    private actionSheetResolves;
    private actionSheets;
    create(opts?: ActionSheetOptions): Promise<ActionSheet>;
    protected viewDidLoad(ev: ActionSheetEvent): void;
    protected willPresent(ev: ActionSheetEvent): void;
    protected willDismiss(ev: ActionSheetEvent): void;
    protected escapeKeyUp(): void;
}

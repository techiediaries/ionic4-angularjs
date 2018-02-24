import { FrameworkDelegate, Nav, ViewController } from './nav-interfaces';
export declare class ViewControllerImpl implements ViewController {
    component: any;
    id: string;
    data: any;
    element: HTMLElement;
    instance: any;
    state: number;
    nav: Nav;
    overlay: boolean;
    zIndex: number;
    dismissProxy: any;
    onDidDismiss: (data: any, role: string) => void;
    onWillDismiss: (data: any, role: string) => void;
    constructor(component: any, data?: any);
    /**
     * Dismiss the current viewController
     * @param {any} [data] Data that you want to return when the viewController is dismissed.
     * @param {any} [role ]
     * @param {NavOptions} navOptions Options for the dismiss navigation.
     * @returns {any} data Returns the data passed in, if any.
     */
    dismiss(data?: any, role?: string, navOptions?: any): Promise<any>;
    willLeave(unload: boolean): void;
    didLeave(): void;
    willEnter(): void;
    didEnter(): void;
    willLoad(): void;
    didLoad(): void;
    willUnload(): void;
    destroy(delegate?: FrameworkDelegate): Promise<any>;
    getTransitionName(_direction: string): string;
}
export declare function callLifecycle(instance: any, methodName: string): void;
export declare function dismiss(navCtrl: any, dismissProxy: any, data?: any, role?: string, navOptions?: any): Promise<any>;
export declare function destroy(viewController: ViewController, delegate?: FrameworkDelegate): Promise<any>;
export declare function callLifeCycleFunction(instance: any, functionName: string): void;
export declare function willLeaveImpl(unload: boolean, viewController: ViewController): void;
export declare function didLeaveImpl(viewController: ViewController): void;
export declare function willEnterImpl(viewController: ViewController): void;
export declare function didEnterImpl(viewController: ViewController): void;
export declare function willLoadImpl(viewController: ViewController): void;
export declare function willUnloadImpl(viewController: ViewController): void;
export declare function didLoadImpl(viewController: ViewController): void;
export declare function initializeNewViewController(viewController: ViewController, data: any): void;

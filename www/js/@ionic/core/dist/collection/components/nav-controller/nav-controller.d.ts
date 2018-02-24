import { Animation, AnimationController } from '../..';
import { ComponentDataPair, FrameworkDelegate, Nav, NavController, NavOptions, ViewController } from '../../navigation/nav-interfaces';
export declare class NavControllerImpl implements NavController {
    element: HTMLElement;
    delegate: FrameworkDelegate;
    animationCtrl: AnimationController;
    constructor();
    push(nav: Nav, component: any, data?: any, opts?: NavOptions): Promise<any>;
    pop(nav: Nav, opts?: NavOptions): Promise<any>;
    setRoot(nav: Nav, component: any, data?: any, opts?: NavOptions): Promise<any>;
    insert(nav: Nav, insertIndex: number, page: any, params?: any, opts?: NavOptions): Promise<any>;
    insertPages(nav: Nav, insertIndex: number, insertPages: any[], opts?: NavOptions): Promise<any>;
    popToRoot(nav: Nav, opts?: NavOptions): Promise<any>;
    popTo(nav: Nav, indexOrViewCtrl: any, opts?: NavOptions): Promise<any>;
    remove(nav: Nav, startIndex: number, removeCount?: number, opts?: NavOptions): Promise<any>;
    removeView(nav: Nav, viewController: ViewController, opts?: NavOptions): Promise<any>;
    setPages(nav: Nav, componentDataPairs: ComponentDataPair[], opts?: NavOptions): Promise<any>;
    render(): JSX.Element;
}
export declare function hydrateDelegateAndAnimation(navController: NavController): Promise<any>;
export declare function hydrateDelegate(navController: NavController): Promise<FrameworkDelegate>;
export declare function hydrateAnimationController(animationController: AnimationController): Promise<Animation>;

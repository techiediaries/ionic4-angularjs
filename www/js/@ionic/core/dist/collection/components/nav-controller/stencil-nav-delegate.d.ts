import { FrameworkDelegate, Nav, ViewController } from '../../navigation/nav-interfaces';
export declare class StencilNavDelegate implements FrameworkDelegate {
    attachViewToDom(nav: Nav, enteringView: ViewController): Promise<any>;
    removeViewFromDom(nav: Nav, leavingView: ViewController): Promise<any>;
}

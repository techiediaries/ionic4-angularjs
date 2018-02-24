import { Nav, NavContainer } from '../../navigation/nav-interfaces';
import { Config } from '../..';
import { App } from './app-interfaces';
export declare class IonApp implements App {
    element: HTMLElement;
    config: Config;
    registerRootNav(event: CustomEvent): void;
    componentWillLoad(): void;
    getActiveNavs(rootNavId?: number): Nav[];
    getNavByIdOrName(nameOrId: number | string): NavContainer;
    render(): JSX.Element[];
}
export declare function findTopNavs(nav: NavContainer): NavContainer[];
export declare function getNavByIdOrNameImpl(nav: NavContainer, id: number | string): NavContainer;
export declare function componentDidLoadImpl(app: App): void;
export declare function handleBackButtonClick(): Promise<any>;

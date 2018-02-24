import { canNavGoBack } from '../nav-utils';
import { isDef } from '../../utils/helpers';
var TRANSLATEY = 'translateY';
var OFF_BOTTOM = '40px';
var CENTER = '0px';
var SHOW_BACK_BTN_CSS = 'show-back-button';
export function buildMdTransition(rootTransition, enteringView, leavingView, opts) {
    rootTransition.enteringView = enteringView;
    rootTransition.leavingView = leavingView;
    rootTransition.addElement(enteringView.element);
    rootTransition.beforeAddClass('show-page');
    var backDirection = (opts.direction === 'back');
    if (enteringView) {
        if (backDirection) {
            rootTransition.duration(isDef(opts.duration) ? opts.duration : 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
        }
        else {
            rootTransition.duration(isDef(opts.duration) ? opts.duration : 280).easing('cubic-bezier(0.36,0.66,0.04,1)');
            rootTransition
                .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER, true)
                .fromTo('opacity', 0.01, 1, true);
        }
        var enteringNavbarEle = enteringView.element.querySelector('ion-navbar');
        if (enteringNavbarEle) {
            var enteringNavBar = rootTransition.create();
            enteringNavBar.addElement(enteringNavbarEle);
            rootTransition.add(enteringNavBar);
            var enteringBackButton = rootTransition.create();
            enteringBackButton.addElement(enteringNavbarEle.querySelector('.back-button'));
            rootTransition.add(enteringBackButton);
            if (canNavGoBack(enteringView.nav)) {
                enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS);
            }
            else {
                enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
            }
        }
    }
    // setup leaving view
    if (leavingView && backDirection) {
        // leaving content
        rootTransition.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
        var leavingPage = rootTransition.create();
        leavingPage.addElement(leavingView.element);
        rootTransition.add(leavingPage.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fromTo('opacity', 1, 0));
    }
    return rootTransition;
}

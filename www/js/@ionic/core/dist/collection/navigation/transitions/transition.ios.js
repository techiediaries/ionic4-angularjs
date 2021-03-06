import { canNavGoBack } from '../nav-utils';
import { isDef } from '../../utils/helpers';
var DURATION = 500;
var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
var OPACITY = 'opacity';
var TRANSFORM = 'transform';
var TRANSLATEX = 'translateX';
var CENTER = '0%';
var OFF_OPACITY = 0.8;
var SHOW_BACK_BTN_CSS = 'show-back-button';
export function buildIOSTransition(rootTransition, enteringView, leavingView, opts) {
    rootTransition.enteringView = enteringView;
    rootTransition.leavingView = leavingView;
    var isRTL = document.dir === 'rtl';
    var OFF_RIGHT = isRTL ? '-99.5%' : '99.5%';
    var OFF_LEFT = isRTL ? '33%' : '-33%';
    rootTransition.duration(isDef(opts.duration) ? opts.duration : DURATION);
    rootTransition.easing(isDef(opts.easing) ? opts.easing : EASING);
    rootTransition.addElement(enteringView.element);
    rootTransition.beforeAddClass('show-page');
    var backDirection = (opts.direction === 'back');
    if (enteringView) {
        var enteringContent = rootTransition.create();
        enteringContent.addElement(enteringView.element.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
        rootTransition.add(enteringContent);
        if (backDirection) {
            enteringContent.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true).fromTo(OPACITY, OFF_OPACITY, 1, true);
        }
        else {
            // entering content, forward direction
            enteringContent.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
        }
        var enteringNavbarEle = enteringView.element.querySelector('ion-navbar');
        if (enteringNavbarEle) {
            var enteringNavBar = rootTransition.create();
            enteringNavBar.addElement(enteringNavbarEle);
            rootTransition.add(enteringNavBar);
            var enteringTitle = rootTransition.create();
            enteringTitle.addElement(enteringNavbarEle.querySelector('ion-title'));
            var enteringNavbarItems = rootTransition.create();
            enteringNavbarItems.addElement(enteringNavbarEle.querySelectorAll('ion-buttons,[menuToggle]'));
            var enteringNavbarBg = rootTransition.create();
            enteringNavbarBg.addElement(enteringNavbarEle.querySelector('.toolbar-background'));
            var enteringBackButton = rootTransition.create();
            enteringBackButton.addElement(enteringNavbarEle.querySelector('.back-button'));
            enteringNavBar
                .add(enteringTitle)
                .add(enteringNavbarItems)
                .add(enteringNavbarBg)
                .add(enteringBackButton);
            enteringTitle.fromTo(OPACITY, 0.01, 1, true);
            enteringNavbarItems.fromTo(OPACITY, 0.01, 1, true);
            if (backDirection) {
                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true);
                if (canNavGoBack(enteringView.nav)) {
                    // back direction, entering page has a back button
                    enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS).fromTo(OPACITY, 0.01, 1, true);
                }
            }
            else {
                // entering navbar, forward direction
                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                enteringNavbarBg.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                if (canNavGoBack(enteringView.nav)) {
                    // forward direction, entering page has a back button
                    enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS).fromTo(OPACITY, 0.01, 1, true);
                    var enteringBackBtnText = rootTransition.create();
                    enteringBackBtnText.addElement(enteringNavbarEle.querySelector('.back-button-text'));
                    enteringBackBtnText.fromTo(TRANSLATEX, (isRTL ? '-100px' : '100px'), '0px');
                    enteringNavBar.add(enteringBackBtnText);
                }
                else {
                    enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
                }
            }
        }
    }
    // setup leaving view
    if (leavingView) {
        var leavingContent = rootTransition.create();
        leavingContent.addElement(leavingView.element);
        leavingContent.addElement(leavingView.element.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
        rootTransition.add(leavingContent);
        if (backDirection) {
            // leaving content, back direction
            leavingContent.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, CENTER, (isRTL ? '-100%' : '100%'));
        }
        else {
            // leaving content, forward direction
            leavingContent
                .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                .fromTo(OPACITY, 1, OFF_OPACITY)
                .afterClearStyles([TRANSFORM, OPACITY]);
        }
        var leavingNavbarEle = leavingView.element.querySelector('ion-navbar');
        if (leavingNavbarEle) {
            var leavingNavBar = rootTransition.create();
            leavingNavBar.addElement(leavingNavbarEle);
            var leavingTitle = rootTransition.create();
            leavingTitle.addElement(leavingNavbarEle.querySelector('ion-title'));
            var leavingNavbarItems = rootTransition.create();
            leavingNavbarItems.addElement(leavingNavbarEle.querySelectorAll('ion-buttons,[menuToggle]'));
            var leavingNavbarBg = rootTransition.create();
            leavingNavbarBg.addElement(leavingNavbarEle.querySelector('.toolbar-background'));
            var leavingBackButton = rootTransition.create();
            leavingBackButton.addElement(leavingNavbarEle.querySelector('.back-button'));
            leavingNavBar
                .add(leavingTitle)
                .add(leavingNavbarItems)
                .add(leavingBackButton)
                .add(leavingNavbarBg);
            this.add(leavingNavBar);
            // fade out leaving navbar items
            leavingBackButton.fromTo(OPACITY, 0.99, 0);
            leavingTitle.fromTo(OPACITY, 0.99, 0);
            leavingNavbarItems.fromTo(OPACITY, 0.99, 0);
            if (backDirection) {
                // leaving navbar, back direction
                leavingTitle.fromTo(TRANSLATEX, CENTER, (isRTL ? '-100%' : '100%'));
                // leaving navbar, back direction, and there's no entering navbar
                // should just slide out, no fading out
                leavingNavbarBg
                    .beforeClearStyles([OPACITY])
                    .fromTo(TRANSLATEX, CENTER, (isRTL ? '-100%' : '100%'));
                var leavingBackBtnText = rootTransition.create();
                leavingBackBtnText.addElement(leavingNavbarEle.querySelector('.back-button-text'));
                leavingBackBtnText.fromTo(TRANSLATEX, CENTER, (isRTL ? -300 : 300) + 'px');
                leavingNavBar.add(leavingBackBtnText);
            }
            else {
                // leaving navbar, forward direction
                leavingTitle
                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                    .afterClearStyles([TRANSFORM]);
                leavingBackButton.afterClearStyles([OPACITY]);
                leavingTitle.afterClearStyles([OPACITY]);
                leavingNavbarItems.afterClearStyles([OPACITY]);
            }
        }
    }
    return rootTransition;
}

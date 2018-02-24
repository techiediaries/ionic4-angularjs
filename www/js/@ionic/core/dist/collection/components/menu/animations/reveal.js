import baseAnimation from './base';
/**
 * @hidden
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
export default function (Animation, _, menu) {
    var openedX = (menu.getWidth() * (menu.isRightSide ? -1 : 1)) + 'px';
    var contentOpen = new Animation()
        .addElement(menu.getContentElement())
        .fromTo('translateX', '0px', openedX);
    return baseAnimation(Animation)
        .add(contentOpen);
}

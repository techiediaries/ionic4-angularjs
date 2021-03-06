import baseAnimation from './base';
/**
 * @hidden
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
export default function (Animation, _, menu) {
    var closedX, openedX;
    var width = menu.getWidth();
    if (menu.isRightSide) {
        // right side
        closedX = 8 + width + 'px';
        openedX = '0px';
    }
    else {
        // left side
        closedX = -(8 + width) + 'px';
        openedX = '0px';
    }
    var menuAni = new Animation()
        .addElement(menu.getMenuElement())
        .fromTo('translateX', closedX, openedX);
    var backdropApi = new Animation()
        .addElement(menu.getBackdropElement())
        .fromTo('opacity', 0.01, 0.35);
    return baseAnimation(Animation)
        .add(menuAni)
        .add(backdropApi);
}

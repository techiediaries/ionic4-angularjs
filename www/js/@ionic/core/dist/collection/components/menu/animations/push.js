import baseAnimation from './base';
/**
 * @hidden
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */
export default function (Animation, _, menu) {
    var contentOpenedX, menuClosedX, menuOpenedX;
    var width = menu.getWidth();
    if (menu.isRightSide) {
        contentOpenedX = -width + 'px';
        menuClosedX = width + 'px';
        menuOpenedX = '0px';
    }
    else {
        contentOpenedX = width + 'px';
        menuOpenedX = '0px';
        menuClosedX = -width + 'px';
    }
    var menuAni = new Animation()
        .addElement(menu.getMenuElement())
        .fromTo('translateX', menuClosedX, menuOpenedX);
    var contentAni = new Animation()
        .addElement(menu.getContentElement())
        .fromTo('translateX', '0px', contentOpenedX);
    return baseAnimation(Animation)
        .add(menuAni)
        .add(contentAni);
}

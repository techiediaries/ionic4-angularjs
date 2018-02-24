/**
 * iOS Popover Leave Animation
 */
export default function iOSLeaveAnimation(Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.popover-backdrop'));
    var wrapperAnimation = new Animation();
    wrapperAnimation.addElement(baseElm.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    backdropAnimation.fromTo('opacity', 0.08, 0);
    return baseAnimation
        .addElement(baseElm)
        .easing('ease')
        .duration(500)
        .add(backdropAnimation)
        .add(wrapperAnimation);
}

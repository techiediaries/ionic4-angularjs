/**
 * iOS Toast Leave Animation
 */
export default function iOSLeaveAnimation(Animation, baseElm, position) {
    var baseAnimation = new Animation();
    var wrapperAnimation = new Animation();
    var wrapperEle = baseElm.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', 10 + "px", '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', 0 - 10 + "px", '100%');
            break;
    }
    return baseAnimation
        .addElement(baseElm)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation);
}

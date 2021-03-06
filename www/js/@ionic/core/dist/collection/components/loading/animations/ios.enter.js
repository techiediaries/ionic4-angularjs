/**
 * iOS Loading Enter Animation
 */
export default function iOSEnterAnimation(Animation, baseElm) {
    var baseAnimation = new Animation();
    var backdropAnimation = new Animation();
    backdropAnimation.addElement(baseElm.querySelector('.loading-backdrop'));
    var wrapperAnimation = new Animation();
    wrapperAnimation.addElement(baseElm.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return baseAnimation
        .addElement(baseElm)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation);
}

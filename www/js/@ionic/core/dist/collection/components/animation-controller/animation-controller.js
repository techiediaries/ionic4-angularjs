import { Animator } from './animator';
var AnimationControllerImpl = /** @class */ (function () {
    function AnimationControllerImpl() {
    }
    AnimationControllerImpl.prototype.create = function (animationBuilder, baseElm, opts) {
        return new Promise(function (resolve) {
            if (animationBuilder) {
                resolve(animationBuilder(Animator, baseElm, opts));
            }
            else {
                resolve(new Animator());
            }
        });
    };
    return AnimationControllerImpl;
}());
export { AnimationControllerImpl };

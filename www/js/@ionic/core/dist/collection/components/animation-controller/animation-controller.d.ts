import { Animation, AnimationBuilder, AnimationController } from './animation-interface';
export declare class AnimationControllerImpl implements AnimationController {
    create(animationBuilder?: AnimationBuilder, baseElm?: any, opts?: any): Promise<Animation>;
}

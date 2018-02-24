import { applyStyles, assert, getElementReference, updateDetail } from '../../utils/helpers';
import { BLOCK_ALL, GestureController } from '../gesture-controller/gesture-controller';
import { PanRecognizer } from './recognizers';
var Gesture = /** @class */ (function () {
    function Gesture() {
        this.detail = {};
        this.positions = [];
        this.lastTouch = 0;
        this.hasCapturedPan = false;
        this.hasPress = false;
        this.hasStartedPan = false;
        this.hasFiredStart = true;
        this.isMoveQueued = false;
        this.enabled = true;
        this.attachTo = 'child';
        this.autoBlockAll = false;
        this.block = null;
        this.disableScroll = false;
        this.direction = 'x';
        this.gestureName = '';
        this.gesturePriority = 0;
        this.maxAngle = 40;
        this.threshold = 10;
        this.type = 'pan';
        this.fireOnMoveFunc = this.fireOnMove.bind(this);
    }
    Gesture.prototype["componentDidLoad"] = function () {
        var _this = this;
        // in this case, we already know the GestureController and Gesture are already
        // apart of the same bundle, so it's safe to load it this way
        // only create one instance of GestureController, and reuse the same one later
        this.ctrl = Context.gesture = Context.gesture || new GestureController;
        this.gesture = this.ctrl.createGesture(this.gestureName, this.gesturePriority, this.disableScroll);
        var types = this.type.replace(/\s/g, '').toLowerCase().split(',');
        if (types.indexOf('pan') > -1) {
            this.pan = new PanRecognizer(this.direction, this.threshold, this.maxAngle);
        }
        this.hasPress = (types.indexOf('press') > -1);
        this.enabledChange(true);
        if (this.pan || this.hasPress) {
            Context.dom.write(function () {
                applyStyles(getElementReference(_this.el, _this.attachTo), GESTURE_INLINE_STYLES);
            });
        }
        if (this.autoBlockAll) {
            this.blocker = this.ctrl.createBlocker(BLOCK_ALL);
            this.blocker.block();
        }
    };
    Gesture.prototype.enabledChange = function (isEnabled) {
        if (!this.gesture) {
            return;
        }
        if (this.pan || this.hasPress) {
            Context.enableListener(this, 'touchstart', isEnabled, this.attachTo);
            Context.enableListener(this, 'mousedown', isEnabled, this.attachTo);
            if (!isEnabled) {
                this.abortGesture();
            }
        }
    };
    Gesture.prototype.blockChange = function (block) {
        if (this.blocker) {
            this.blocker.destroy();
        }
        if (block) {
            this.blocker = this.ctrl.createBlocker({ disable: block.split(',') });
        }
    };
    // DOWN *************************
    Gesture.prototype.onTouchStart = function (ev) {
        this.lastTouch = now(ev);
        if (this.pointerDown(ev, this.lastTouch)) {
            this.enableMouse(false);
            this.enableTouch(true);
        }
        else {
            this.abortGesture();
        }
    };
    Gesture.prototype.onMouseDown = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            if (this.pointerDown(ev, timeStamp)) {
                this.enableMouse(true);
                this.enableTouch(false);
            }
            else {
                this.abortGesture();
            }
        }
    };
    Gesture.prototype.pointerDown = function (ev, timeStamp) {
        if (!this.gesture || this.hasStartedPan || !this.hasFiredStart) {
            return false;
        }
        var detail = this.detail;
        updateDetail(ev, detail);
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTimeStamp = detail.timeStamp = timeStamp;
        detail.velocityX = detail.velocityY = detail.deltaX = detail.deltaY = 0;
        detail.event = ev;
        this.positions.length = 0;
        assert(this.hasFiredStart, 'fired start must be false');
        assert(!this.hasStartedPan, 'pan can be started at this point');
        assert(!this.hasCapturedPan, 'pan can be started at this point');
        assert(!this.isMoveQueued, 'some move is still queued');
        assert(this.positions.length === 0, 'positions must be emprty');
        // Check if gesture can start
        if (this.canStart && this.canStart(detail) === false) {
            return false;
        }
        // Release fallback
        this.gesture.release();
        // Start gesture
        if (!this.gesture.start()) {
            return false;
        }
        this.positions.push(detail.currentX, detail.currentY, timeStamp);
        if (this.pan) {
            this.hasStartedPan = true;
            this.pan.start(detail.startX, detail.startY);
        }
        return true;
    };
    // MOVE *************************
    Gesture.prototype.onTouchMove = function (ev) {
        this.lastTouch = this.detail.timeStamp = now(ev);
        this.pointerMove(ev);
    };
    Gesture.prototype.onMoveMove = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            this.detail.timeStamp = timeStamp;
            this.pointerMove(ev);
        }
    };
    Gesture.prototype.pointerMove = function (ev) {
        assert(!!this.pan, 'pan must be non null');
        // fast path, if gesture is currently captured
        // do minimun job to get user-land even dispatched
        if (this.hasCapturedPan) {
            if (!this.isMoveQueued && this.hasFiredStart) {
                this.isMoveQueued = true;
                this.calcGestureData(ev);
                Context.dom.write(this.fireOnMoveFunc);
            }
            return;
        }
        // gesture is currently being detected
        var detail = this.detail;
        this.calcGestureData(ev);
        if (this.pan.detect(detail.currentX, detail.currentY)) {
            if (this.pan.isGesture()) {
                if (!this.tryToCapturePan()) {
                    this.abortGesture();
                }
            }
        }
    };
    Gesture.prototype.fireOnMove = function () {
        var detail = this.detail;
        this.isMoveQueued = false;
        if (this.onMove) {
            this.onMove(detail);
        }
        else {
            this.ionGestureMove.emit(detail);
        }
    };
    Gesture.prototype.calcGestureData = function (ev) {
        var detail = this.detail;
        updateDetail(ev, detail);
        var currentX = detail.currentX;
        var currentY = detail.currentY;
        var timestamp = detail.timeStamp;
        detail.deltaX = currentX - detail.startX;
        detail.deltaY = currentY - detail.startY;
        detail.event = ev;
        var timeRange = timestamp - 100;
        var positions = this.positions;
        var startPos = positions.length - 1;
        // move pointer to position measured 100ms ago
        for (; startPos > 0 && positions[startPos] > timeRange; startPos -= 3) { }
        if (startPos > 1) {
            // compute relative movement between these two points
            var frequency = 1 / (positions[startPos] - timestamp);
            var movedY = positions[startPos - 1] - currentY;
            var movedX = positions[startPos - 2] - currentX;
            // based on XXms compute the movement to apply for each render step
            // velocity = space/time = s*(1/t) = s*frequency
            detail.velocityX = movedX * frequency;
            detail.velocityY = movedY * frequency;
        }
        else {
            detail.velocityX = 0;
            detail.velocityY = 0;
        }
        positions.push(currentX, currentY, timestamp);
    };
    Gesture.prototype.tryToCapturePan = function () {
        if (this.gesture && !this.gesture.capture()) {
            return false;
        }
        this.hasCapturedPan = true;
        this.hasFiredStart = false;
        // reset start position since the real user-land event starts here
        // If the pan detector threshold is big, not reseting the start position
        // will cause a jump in the animation equal to the detector threshold.
        // the array of positions used to calculate the gesture velocity does not
        // need to be cleaned, more points in the positions array always results in a
        // more acurate value of the velocity.
        var detail = this.detail;
        detail.startX = detail.currentX;
        detail.startY = detail.currentY;
        detail.startTimeStamp = detail.timeStamp;
        if (this.onWillStart) {
            this.onWillStart(this.detail).then(this.fireOnStart.bind(this));
        }
        else {
            this.fireOnStart();
        }
        return true;
    };
    Gesture.prototype.fireOnStart = function () {
        assert(!this.hasFiredStart, 'has fired must be false');
        if (this.onStart) {
            this.onStart(this.detail);
        }
        else {
            this.ionGestureStart.emit(this.detail);
        }
        this.hasFiredStart = true;
    };
    Gesture.prototype.abortGesture = function () {
        this.reset();
        this.enable(false);
        this.notCaptured && this.notCaptured(this.detail);
    };
    Gesture.prototype.reset = function () {
        this.hasCapturedPan = false;
        this.hasStartedPan = false;
        this.hasFiredStart = true;
        this.gesture && this.gesture.release();
    };
    // END *************************
    Gesture.prototype.onTouchCancel = function (ev) {
        this.lastTouch = this.detail.timeStamp = now(ev);
        this.pointerUp(ev);
        this.enableTouch(false);
    };
    Gesture.prototype.onTouchEnd = function (ev) {
        this.lastTouch = this.detail.timeStamp = now(ev);
        this.pointerUp(ev);
        this.enableTouch(false);
    };
    Gesture.prototype.onMouseUp = function (ev) {
        var timeStamp = now(ev);
        if (this.lastTouch === 0 || (this.lastTouch + MOUSE_WAIT < timeStamp)) {
            this.detail.timeStamp = timeStamp;
            this.pointerUp(ev);
            this.enableMouse(false);
        }
    };
    Gesture.prototype.pointerUp = function (ev) {
        var hasCaptured = this.hasCapturedPan;
        var hasFiredStart = this.hasFiredStart;
        this.reset();
        if (!hasFiredStart) {
            return;
        }
        var detail = this.detail;
        this.calcGestureData(ev);
        // Try to capture press
        if (hasCaptured) {
            detail.type = 'pan';
            if (this.onEnd) {
                this.onEnd(detail);
            }
            else {
                this.ionGestureEnd.emit(detail);
            }
            return;
        }
        // Try to capture press
        if (this.hasPress && this.detectPress()) {
            return;
        }
        // Not captured any event
        if (this.notCaptured) {
            this.notCaptured(detail);
        }
        else {
            this.ionGestureNotCaptured.emit(detail);
        }
    };
    Gesture.prototype.detectPress = function () {
        var detail = this.detail;
        var vecX = detail.deltaX;
        var vecY = detail.deltaY;
        var dis = vecX * vecX + vecY * vecY;
        if (dis < 100) {
            detail.type = 'press';
            if (this.onPress) {
                this.onPress(detail);
            }
            else {
                this.ionPress.emit(detail);
            }
            return true;
        }
        return false;
    };
    // ENABLE LISTENERS *************************
    Gesture.prototype.enableMouse = function (shouldEnable) {
        if (this.pan) {
            Context.enableListener(this, 'document:mousemove', shouldEnable);
        }
        Context.enableListener(this, 'document:mouseup', shouldEnable);
    };
    Gesture.prototype.enableTouch = function (shouldEnable) {
        if (this.pan) {
            Context.enableListener(this, 'touchmove', shouldEnable, this.attachTo);
        }
        Context.enableListener(this, 'touchcancel', shouldEnable, this.attachTo);
        Context.enableListener(this, 'touchend', shouldEnable, this.attachTo);
    };
    Gesture.prototype.enable = function (shouldEnable) {
        this.enableMouse(shouldEnable);
        this.enableTouch(shouldEnable);
    };
    Gesture.prototype["componentDidUnload"] = function () {
        if (this.blocker) {
            this.blocker.destroy();
            this.blocker = null;
        }
        this.gesture && this.gesture.destroy();
        this.ctrl = this.gesture = this.pan = this.detail = this.detail.event = null;
    };
    return Gesture;
}());
export { Gesture };
var GESTURE_INLINE_STYLES = {
    'touch-action': 'none',
    'user-select': 'none',
    '-webkit-user-drag': 'none',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
};
var MOUSE_WAIT = 2500;
function now(ev) {
    return ev.timeStamp || Date.now();
}

var PanRecognizer = /** @class */ (function () {
    function PanRecognizer(direction, threshold, maxAngle) {
        this.dirty = false;
        this.angle = 0;
        this.isPan = 0;
        var radians = maxAngle * (Math.PI / 180);
        this.isDirX = direction === 'x';
        this.maxCosine = Math.cos(radians);
        this.threshold = threshold * threshold;
    }
    PanRecognizer.prototype.start = function (x, y) {
        this.startX = x;
        this.startY = y;
        this.angle = 0;
        this.isPan = 0;
        this.dirty = true;
    };
    PanRecognizer.prototype.detect = function (x, y) {
        if (!this.dirty) {
            return false;
        }
        var deltaX = (x - this.startX);
        var deltaY = (y - this.startY);
        var distance = deltaX * deltaX + deltaY * deltaY;
        if (distance < this.threshold) {
            return false;
        }
        var hypotenuse = Math.sqrt(distance);
        var cosine = ((this.isDirX) ? deltaX : deltaY) / hypotenuse;
        if (cosine > this.maxCosine) {
            this.isPan = 1;
        }
        else if (cosine < -this.maxCosine) {
            this.isPan = -1;
        }
        else {
            this.isPan = 0;
        }
        this.dirty = false;
        return true;
    };
    PanRecognizer.prototype.isGesture = function () {
        return this.isPan !== 0;
    };
    PanRecognizer.prototype.getDirection = function () {
        return this.isPan;
    };
    return PanRecognizer;
}());
export { PanRecognizer };

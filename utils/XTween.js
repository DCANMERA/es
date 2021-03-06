class TweenSetAction {
    constructor(properties) {
        this.valuesEnd = Object.assign({}, properties);
    }
    onStart(target, resetValue) {
        if (resetValue) {
            this.valuesStart = {};
            TweenSetAction.setupProperties(target, this.valuesStart, this.valuesEnd);
        }
    }
    reverseValues(target) {
        let temp = this.valuesStart;
        this.valuesStart = this.valuesEnd;
        this.valuesEnd = temp;
    }
    onUpdate(target, deltaTime) {
        TweenSetAction.updateProperties(target, this.valuesStart, this.valuesEnd);
        return true;
    }
    onCompleted(target) { }
    static setupProperties(target, valuesStart, valuesEnd) {
        var _a;
        for (const property in valuesEnd) {
            const startValue = target[property];
            const propType = (_a = typeof startValue) !== null && _a !== void 0 ? _a : typeof valuesEnd[property];
            if (propType === 'object') {
                if (valuesStart[property] == null)
                    valuesStart[property] = {};
                TweenSetAction.setupProperties(startValue, valuesStart[property], valuesEnd[property]);
            }
            else {
                valuesStart[property] = startValue;
            }
        }
    }
    static updateProperties(target, valuesStart, valuesEnd) {
        var _a;
        for (const property in valuesEnd) {
            const end = valuesEnd[property];
            const propType = (_a = typeof valuesStart[property]) !== null && _a !== void 0 ? _a : typeof end;
            if (propType === 'object') {
                TweenSetAction.updateProperties(target[property], valuesStart, end);
            }
            else {
                target[property] = end;
            }
        }
    }
}
class TweenAction {
    constructor(duration, isBy, properties, options) {
        this.options = {};
        this.duration = duration;
        this.isBy = isBy;
        this.valuesEnd = Object.assign({}, properties);
        Object.assign(this.options, options);
        if (options.easing == null)
            this.options.easing = XTween.Easing.Linear.None;
        if (options.progress == null)
            this.options.progress = TweenAction.progress;
    }
    static progress(start, end, t) {
        return start + (end - start) * t;
    }
    onStart(target, resetValue) {
        this.elapsedTime = 0;
        if (resetValue) {
            this.valuesStart = {};
            if (this.options.onStart)
                this.options.onStart(target);
            TweenAction.setupProperties(target, this.valuesStart, this.valuesEnd, this.isBy);
        }
    }
    reverseValues(target) {
        let temp = this.valuesStart;
        this.valuesStart = this.valuesEnd;
        this.valuesEnd = temp;
    }
    onUpdate(target, deltaTime) {
        this.elapsedTime += deltaTime;
        let ratio = this.elapsedTime / this.duration;
        ratio = ratio > 1 ? 1 : ratio;
        const value = this.options.easing(ratio);
        TweenAction.updateProperties(target, this.valuesStart, this.valuesEnd, value, this.options.progress);
        if (this.options.onUpdate)
            this.options.onUpdate(target, ratio);
        return ratio >= 1;
    }
    onCompleted(target) {
        if (this.options.onComplete)
            this.options.onComplete(target);
    }
    static setupProperties(target, valuesStart, valuesEnd, isBy) {
        var _a;
        for (const property in valuesEnd) {
            const startValue = target[property];
            const propType = (_a = typeof startValue) !== null && _a !== void 0 ? _a : typeof valuesEnd[property];
            if (propType === 'number') {
                valuesStart[property] = startValue;
                if (isBy)
                    valuesEnd[property] += startValue;
            }
            else if (propType === 'object') {
                if (valuesStart[property] == null)
                    valuesStart[property] = {};
                TweenAction.setupProperties(startValue, valuesStart[property], valuesEnd[property], isBy);
            }
        }
    }
    static updateProperties(target, valuesStart, valuesEnd, value, interpolation) {
        var _a;
        for (const property in valuesEnd) {
            const start = valuesStart[property] || 0;
            let end = valuesEnd[property];
            const propType = (_a = typeof end) !== null && _a !== void 0 ? _a : typeof start;
            if (propType === 'number') {
                target[property] = interpolation(start, end, value);
            }
            else if (propType === 'object') {
                TweenAction.updateProperties(target[property], start, end, value, interpolation);
            }
        }
    }
}
class DelayAction {
    constructor(duration) {
        this.duration = duration;
    }
    reverseValues(target) { }
    onStart(target, resetValue) {
        this.elapsedTime = 0;
    }
    onUpdate(target, deltaTime) {
        this.elapsedTime += deltaTime;
        return this.elapsedTime >= this.duration;
    }
    onCompleted(target) { }
}
class CallAction {
    constructor(callback, thisArg, argArray) {
        this.callback = callback;
        this.thisArg = thisArg;
        this.argArray = argArray;
    }
    reverseValues(target) { }
    onStart(target, resetValue) { }
    onUpdate(target, deltaTime) {
        var _a;
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this.thisArg, ...this.argArray);
        return true;
    }
    onCompleted(target) { }
}
class TweenManager {
    constructor() {
        this.actionGroupList = [];
    }
    add(actionGroup) {
        this.actionGroupList.push(actionGroup);
    }
    remove(actionGroup) {
        let index = this.actionGroupList.indexOf(actionGroup);
        if (index != -1)
            this.actionGroupList.splice(index, 1);
    }
    removeTarget(target) {
        for (let i = this.actionGroupList.length - 1; i >= 0; i--) {
            if (this.actionGroupList[i].target == target)
                this.actionGroupList.splice(i, 1);
        }
    }
    containTweens(target) {
        for (let i = this.actionGroupList.length - 1; i >= 0; i--) {
            if (this.actionGroupList[i].target == target)
                return true;
        }
        return false;
    }
    removeAll() {
        this.actionGroupList.length = 0;
    }
    intialize(startTime = Date.now()) {
        this.lastTime = startTime;
    }
    update(time = Date.now()) {
        let deltaTime = time - this.lastTime;
        this.lastTime = time;
        for (let i = this.actionGroupList.length - 1; i >= 0; i--) {
            let actionGroup = this.actionGroupList[i];
            if (actionGroup._updateActions(deltaTime))
                this.actionGroupList.splice(i, 1);
        }
    }
}
const tweenManager = new TweenManager();
/**
 * ????????????????????????
 * ???????????????number??????
 * ?????????????????????????????????????????????????????????????????????????????????
 * ???????????????????????????onStart, onUpdate, onComplete???????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????
 *
 * ???????????????????????????????????????
 * @example
 * setInterval(XTween.intialize(), 1);
 *
 * ????????????
 * @example
 * xtween(this.installBtn)
 *  .to(1000, { "bottom": 500, "rotation": 360 }, { easing: XTween.Easing.Back.InOut })
 *  .to(1500, { "scaleX": 2 }, {
 *      onUpdate: (target, ratio) => {
 *          console.log("onUpdate 1", target.scaleX, ratio);
 *      },
 *      onComplete: (target) => {
 *          console.log("onComplete 1", target.scaleX);
 *      }
 *  })
 *  .delay(1000)
 *  .repeat(2, xtween(this.installBtn).to(1500, { "alpha": 0 }).to(1500, { "alpha": 1 }))
 *  .sequence(new Tween(this.logo).to(1000, { "top": 100 }), xtween(this.spinModelImage).to(1000, { "centerY": -500 }))
 *  .call(() => {
 *      console.log("Call 1", this.installBtn.scaleX);
 *  })
 *  .to(1500, { "scaleX": 1.0 }, {
 *      onStart: (target) => {
 *          console.log("onStart ", target.scaleX);
 *      },
 *      onUpdate: (target, ratio) => {
 *          console.log("onUpdate ", target.scaleX, ratio);
 *      }
 *  })
 * .set({ visable: false })
 * .start();
 */
export class XTween {
    /**
     * ????????????????????????
     * @param target ????????????????????????
     */
    constructor(target) {
        this.actionList = [];
        this._isPlaying = false;
        this._isPaused = false;
        this.target = target;
    }
    get isPlaying() { return this._isPlaying; }
    get isPaused() { return this._isPaused; }
    /**
     * ???????????????????????????????????????
     * @param duration ???????????????????????????
     * @param properties ?????????
     * @param options ??????????????????
     * @returns ??????????????????????????????
     */
    to(duration, properties, options) {
        const action = new TweenAction(duration, false, properties, options || {});
        this.actionList.push(action);
        return this;
    }
    /**
      * ???????????????????????????????????????
      * @param duration ???????????????????????????
      * @param properties ?????????
      * @param options ??????????????????
      * @returns ??????????????????????????????
      */
    by(duration, properties, options) {
        const action = new TweenAction(duration, true, properties, options || {});
        this.actionList.push(action);
        return this;
    }
    /**
     * ?????????????????????????????????
     * @param properties ?????????
     * @returns ??????????????????????????????
     */
    set(properties) {
        const action = new TweenSetAction(properties);
        this.actionList.push(action);
        return this;
    }
    /**
     * ?????????????????????????????????
     * @param duration ???????????????????????????
     * @returns ??????????????????????????????
     */
    delay(duration) {
        const action = new DelayAction(duration);
        this.actionList.push(action);
        return this;
    }
    /**
     * ???????????????????????????????????????
     * @param callback ????????????
     * @param thisArg ?????????this??????
     * @param argArray ???????????????
     * @returns ??????????????????????????????
     */
    call(callback, thisArg, ...argArray) {
        const action = new CallAction(callback, thisArg, argArray);
        this.actionList.push(action);
        return this;
    }
    /**
     * ???????????????????????????????????????????????????Tween??????
     * @param tweens Tween?????????????????????Tween???target?????????????????????target?????????????????????Tween???target???????????????????????????
     * @returns ??????????????????????????????
     */
    sequence(...tweens) {
        let action = new SequenceAction(...tweens);
        this.actionList.push(action);
        return this;
    }
    /**
     * ????????????????????????????????????????????????Tween??????
     * @param tweens Tween?????????????????????Tween???target?????????????????????target?????????????????????Tween???target???????????????????????????
     * @returns ??????????????????????????????
     */
    parallel(...tweens) {
        let action = new ParallelAction(...tweens);
        this.actionList.push(action);
        return this;
    }
    /**
     * ????????????????????????????????????????????????Tween
     * @param repeatTimes ?????????????????????????????????Infinity
     * @param pingPong ??????????????????
     * @param repeatTween ????????????????????????Tween
     * @returns ??????????????????????????????
     */
    repeat(repeatTimes, pingPong, repeatTween) {
        let action = new RepeatAction(repeatTimes, pingPong, repeatTween);
        this.actionList.push(action);
        return this;
    }
    /**
     * ????????????Tween???????????????
     * @returns ??????????????????????????????
     */
    start() {
        this._isPlaying = true;
        this._isPaused = false;
        this._startActions(true);
        tweenManager.add(this);
        return this;
    }
    /**
     * ????????????Tween???????????????
     * @returns ??????????????????????????????
     */
    pause() {
        if (!this.isPlaying || this.isPaused)
            return this;
        this._isPlaying = false;
        this._isPaused = true;
        tweenManager.remove(this);
        return this;
    }
    /**
     * ????????????Tween???????????????
     * @returns ??????????????????????????????
     */
    resume() {
        if (!this.isPaused || this.isPlaying)
            return this;
        this._isPlaying = true;
        this._isPaused = false;
        tweenManager.add(this);
        return this;
    }
    /**
     * ????????????Tween???????????????
     * @returns ??????????????????????????????
     */
    stop() {
        this._isPlaying = false;
        this._isPaused = false;
        tweenManager.remove(this);
        return this;
    }
    /**
     * ????????????Action?????????????????????????????????????????????
     */
    _startActions(resetValue) {
        this.indexAction = 0;
        if (this.actionList.length > 0)
            this.actionList[0].onStart(this.target, resetValue);
    }
    /**
     * ????????????Action?????????????????????????????????????????????
     */
    _reverseActions() {
        this.actionList.reverse();
        for (let action of this.actionList)
            action.reverseValues(this.target);
    }
    /**
     * ????????????Action?????????????????????????????????????????????
     */
    _updateActions(deltaTime) {
        while (this.indexAction < this.actionList.length) {
            let action = this.actionList[this.indexAction];
            if (!action.onUpdate(this.target, deltaTime))
                break;
            action.onCompleted(this.target);
            this.indexAction++;
            let nextAction = this.actionList[this.indexAction];
            if (nextAction != null)
                nextAction.onStart(this.target, true);
        }
        return this.indexAction >= this.actionList.length;
    }
    //----------------------------------------------------------------------------------------------------------------------------
    /**
     * ???????????????Tween
     */
    static removeAllTweens() {
        return tweenManager.removeAll();
    }
    /**
     * ???????????????????????????Tween
     * @param target ????????????
     */
    static removeTargetTweens(target) {
        tweenManager.removeTarget(target);
    }
    /**
     * ??????????????????Tween
     * @param target ????????????
     */
    static containTweens(target) {
        return tweenManager.containTweens(target);
    }
    /**
     * ?????????Tween???????????????????????????
     * @example
     * setInterval(XTween.intialize(), 1);
     * @returns ??????????????????
     */
    static intialize() {
        tweenManager.intialize();
        return XTween.updateTweens;
    }
    /**
     * Tween???????????????
     * @example
     * setInterval(XTween.intialize(), 1);
     */
    static updateTweens() {
        tweenManager.update();
    }
}
XTween.Easing = {
    Linear: {
        None: function (amount) {
            return amount;
        },
    },
    Quadratic: {
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1)
                return 0.5 * amount * amount;
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },
    Cubic: {
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1)
                return 0.5 * amount * amount * amount;
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },
    Quartic: {
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1)
                return 0.5 * amount * amount * amount * amount;
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },
    Quintic: {
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1)
                return 0.5 * amount * amount * amount * amount * amount;
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },
    Sinusoidal: {
        In: function (amount) {
            return 1 - Math.cos((amount * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.cos(Math.PI * amount));
        },
    },
    Exponential: {
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0 || amount === 1)
                return amount;
            if ((amount *= 2) < 1)
                return 0.5 * Math.pow(1024, amount - 1);
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    },
    Circular: {
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1)
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },
    Elastic: {
        In: function (amount) {
            if (amount === 0 || amount === 1)
                return amount;
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0 || amount === 1)
                return amount;
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0 || amount === 1)
                return amount;
            amount *= 2;
            if (amount < 1)
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },
    Back: {
        In: function (amount) {
            const s = 1.70158;
            return amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            const s = 1.70158;
            return --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            const s = 1.70158 * 1.525;
            if ((amount *= 2) < 1)
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },
    Bounce: {
        In: function (amount) {
            return 1 - XTween.Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5)
                return XTween.Easing.Bounce.In(amount * 2) * 0.5;
            return XTween.Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};
class SequenceAction {
    constructor(...tweens) {
        this.tweens = tweens;
    }
    onStart(target, resetValue) {
        this.currentIndex = 0;
        for (let tween of this.tweens)
            tween._startActions(resetValue);
    }
    reverseValues(target) {
        this.tweens.reverse();
        for (let tween of this.tweens)
            tween._reverseActions();
    }
    onUpdate(target, deltaTime) {
        while (this.currentIndex < this.tweens.length) {
            let tween = this.tweens[this.currentIndex];
            if (!tween._updateActions(deltaTime))
                break;
            this.currentIndex++;
        }
        return this.currentIndex >= this.tweens.length;
    }
    onCompleted(target) { }
}
class ParallelAction {
    constructor(...tweens) {
        this.tweens = tweens;
    }
    reverseValues(target) {
        for (let tween of this.tweens)
            tween._reverseActions();
    }
    onStart(target, resetValue) {
        for (let tween of this.tweens)
            tween._startActions(resetValue);
        this.updateTweens = Array.from(this.tweens);
    }
    onUpdate(target, deltaTime) {
        for (let i = this.updateTweens.length - 1; i >= 0; i--) {
            if (this.updateTweens[i]._updateActions(deltaTime))
                this.updateTweens.splice(i, 1);
        }
        return this.updateTweens.length == 0;
    }
    onCompleted(target) { }
}
class RepeatAction {
    constructor(repeatTimes, pingPong, repeatTween) {
        this.repeatCount = 0;
        this.pingPong = false;
        this.repeatTimes = repeatTimes;
        this.pingPong = pingPong;
        this.repeatTween = repeatTween;
    }
    reverseValues(target) {
        this.repeatTween._reverseActions();
    }
    onStart(target, resetValue) {
        this.repeatCount = 0;
        this.repeatTween._startActions(resetValue);
    }
    onUpdate(target, deltaTime) {
        if (this.repeatTween._updateActions(deltaTime)) {
            if (this.pingPong)
                this.repeatTween._reverseActions();
            this.repeatTween._startActions(false);
            this.repeatCount++;
        }
        return this.repeatCount >= this.repeatTimes;
    }
    onCompleted(target) { }
}
export function xtween(target) {
    return new XTween(target);
}
//# sourceMappingURL=XTween.js.map
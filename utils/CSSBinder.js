function getPixel (obj, target, key) {
    if (obj[key] == undefined)
        obj[key] = parseInt(target.realStyle[key]);
    return obj[key];
}
function setPixel (obj, target, key, value) {
    obj[key] = value;
    target[key] = `${value}px`;
}
function getTranslate (obj, target, key) {
    if (obj[key] == undefined) {
        if (target.realStyle.transform !== 'none') {
            let transform = target.realStyle.transform.split('(')[1].split(')')[0].split(',');
            switch (key) {
                case 'translateX':
                    obj[key] = parseInt(transform[4]);
                    break;
                case 'translateY':
                    obj[key] = parseInt(transform[5]);
                    break;
                case 'translate':
                    obj[key] = parseInt(transform[4]);
                    break;
            }
            return obj[key];
        }
        obj[key] = 0;
        return obj[key];
    }
    return obj[key];
}
function setTranslate (obj, target, key, value) {
    obj[key] = value;
    if (target.realStyle.transform !== 'none') {
        let transform = target.realStyle.transform.split('(')[1].split(')')[0].split(',');
        switch (key) {
            case 'translateX':
                transform[4] = value;
                break;
            case 'translateY':
                transform[5] = value;
                break;
            case 'translate':
                transform[4] = value;
                transform[5] = value;
                break;
        }
        target.transform = 'matrix(' + transform.join() + ')';
    } else {
        switch (key) {
            case 'translateX':
                target.transform = 'matrix(1,0,0,1,' + value + ',0)';
                break;
            case 'translateY':
                target.transform = 'matrix(1,0,0,1,0,' + value + ')';
                break;
            case 'translate':
                target.transform = `matrix(1,0,0,1 ,${value} ,${value})`
                break;
        }
    }
}
function getScaleRotation (obj, target, key) {
    if (obj[key] == undefined) {
        if (target.realStyle.transform !== 'none') {
            let transform = target.realStyle.transform.split('(')[1].split(')')[0].split(',');
            let a = transform[0]
            let b = transform[1]
            let c = transform[2]
            let d = transform[3]
            let scaleX = Math.sqrt(a * a + b * b)
            let scaleY = Math.sqrt(c * c + d * d)
            let angle = Math.atan2(b, a) * (180 / Math.PI)
            switch (key) {
                case 'scaleX':
                    obj[key] = parseFloat(scaleX.toFixed(2))
                    break;
                case 'scaleY':
                    obj[key] = parseFloat(scaleY.toFixed(2))
                    break;
                case 'scale':
                    obj[key] = parseFloat(scaleX.toFixed(2))
                    break;
                case 'rotation':
                    obj[key] = parseFloat(angle.toFixed(2))
                    break;
            }
            return obj[key]
        }
        obj[key] = 1
        return obj[key]
    }
    return obj[key];
}
function setScaleRotation (obj, target, key, value) {
    obj[key] = value;
    if (target.realStyle.transform !== 'none') {
        let transform = target.realStyle.transform.split('(')[1].split(')')[0].split(',');
        let a = transform[0]
        let b = transform[1]
        let c = transform[2]
        let d = transform[3]
        let scaleX = Math.sqrt(a * a + b * b)
        let scaleY = Math.sqrt(c * c + d * d)
        let angle = Math.atan2(b, a) * (180 / Math.PI)
        let firstAngle = Math.cos(angle / 180 * Math.PI); // 得到缩放值为1(初始值只有旋转)的情况下matrix的前四个值
        let secondAngle = Math.sin(angle / 180 * Math.PI);
        let threeAngle = -Math.sin(angle / 180 * Math.PI);
        let fourAngle = Math.cos(angle / 180 * Math.PI);
        switch (key) {
            case 'scaleX':
                transform[0] = firstAngle * value;
                transform[1] = secondAngle * value;
                break;
            case 'scaleY':
                transform[2] = threeAngle * value;
                transform[3] = fourAngle * value;
                break;
            case 'scale':
                transform[0] = firstAngle * value;
                transform[1] = secondAngle * value;
                transform[2] = threeAngle * value;
                transform[3] = fourAngle * value;
                break;
            case 'rotation':
                let newFirstAngle = Math.cos(value / 180 * Math.PI);
                let newSecondAngle = Math.sin(value / 180 * Math.PI);
                let newThreeAngle = -Math.sin(value / 180 * Math.PI);
                let newFourAngle = Math.cos(value / 180 * Math.PI);
                transform[0] = newFirstAngle * scaleX;
                transform[1] = newSecondAngle * scaleX;
                transform[2] = newThreeAngle * scaleY;
                transform[3] = newFourAngle * scaleY;
                break;
        }
        target.transform = 'matrix(' + transform.join() + ')';
    } else {
        switch (key) {
            case 'scaleX':
                target.transform = 'matrix(' + value + ',0,0,1,0,0)';
                break;
            case 'scaleY':
                target.transform = 'matrix(1,0,0,' + value + ',0,0)';
                break;
            case 'scale':
                target.transform = 'matrix(' + value + ',0,0,' + value + ',0,0)';
                break;
            case 'rotation':
                let newFirstAngle = Math.cos(value / 180 * Math.PI);
                let newSecondAngle = Math.sin(value / 180 * Math.PI);
                let newThreeAngle = -Math.sin(value / 180 * Math.PI);
                let newFourAngle = Math.cos(value / 180 * Math.PI);
                target.transform = `matrix(${newFirstAngle},${newSecondAngle},${newThreeAngle},${newFourAngle},0,0)`
                break;
        }
    }
}
function getOpacity (obj, target, key) {
    if (obj[key] == undefined)
        obj[key] = parseFloat(target.realStyle[key]);
    return obj[key];
}
function setOpacity (obj, target, key, value) {
    obj[key] = value;
    target[key] = `${value}`;
}
function getBackgroundColor (obj, target, key) {
    if (obj[key] == undefined) {
        let colorArray = target.realStyle['background-color'].split('(')[1].split(')')[0].split(',');
        let hexColor = rgbaToHexColor(colorArray)
        obj[key] = '0x' + hexColor.substring(1)
    }
    return obj[key];
}
function setBackgroundColor (obj, target, key, value) {
    obj[key] = dec2hex(value)
    target['background-color'] = `#${obj[key]}`
}
function dec2hex (i) {
    if (i <= 0xF) return `00000${i.toString(16)}`
    if (i <= 0xFF) return `0000${i.toString(16)}`
    if (i <= 0xFFF) return `000${i.toString(16)}`
    if (i <= 0xFFFF) return `00${i.toString(16)}`
    if (i <= 0xFFFFF) return `0${i.toString(16)}`
    return i.toString(16);
}


// function hexColorToRgba(hexColor, alphaMaxVal = 1) { //16进制颜色转化为rgba
//     hexColor = hexColor.replace("#", "");
//     //用于分割16进制色彩通道
//     let reg = new RegExp("\\w{1,2}", "g");
//     //分割颜色通道
//     let rgbaArray255 = hexColor.match(reg);
//     rgbaArray255 = rgbaArray255.map((channel, index) => {
//         //计算每个通道的10进制值
//         let colorVal = parseInt(channel, 16);
//         if (index === 3) {
//             //这是alpha通道
//             return Math.round(colorVal / (255 / alphaMaxVal) * 100) / 100
//         }
//         return colorVal;
//     });
//     return rgbaArray255;
// }

function rgbaToHexColor (rgbaArray, alphaMaxVal = 1) {  // rgba 转化为16进制颜色
    //补位警号
    return "#" + rgbaArray.map((chanel, index) => {
        let hexNum = "";
        if (index === 3) {
            //这是alpha通道
            hexNum = Number(Math.round(chanel * 255 / alphaMaxVal)).toString(16);
        } else {
            //普通通道直接转换
            hexNum = Number(chanel).toString(16)
        }
        return hexNum.length === 1 ? '0' + hexNum : hexNum;//这里解决了部分通道数字小于10的情况进行补位
    }).join("");
}

export default class CSSBinder {
    static initialize () {
        CSSBinder.registerProperty("width", { getter: getPixel, setter: setPixel });
        CSSBinder.registerProperty("height", { getter: getPixel, setter: setPixel });
        CSSBinder.registerProperty("translate", { getter: getTranslate, setter: setTranslate })
        CSSBinder.registerProperty("translateX", { getter: getTranslate, setter: setTranslate });
        CSSBinder.registerProperty("translateY", { getter: getTranslate, setter: setTranslate })
        CSSBinder.registerProperty("scale", { getter: getScaleRotation, setter: setScaleRotation });
        CSSBinder.registerProperty("scaleX", { getter: getScaleRotation, setter: setScaleRotation });
        CSSBinder.registerProperty("scaleY", { getter: getScaleRotation, setter: setScaleRotation });
        CSSBinder.registerProperty("rotation", { getter: getScaleRotation, setter: setScaleRotation });
        CSSBinder.registerProperty("opacity", { getter: getOpacity, setter: setOpacity });
        CSSBinder.registerProperty("backgroundColor", { getter: getBackgroundColor, setter: setBackgroundColor });
        CSSBinder.registerProperty("marginLeft", { getter: getPixel, setter: setPixel });
        CSSBinder.registerProperty("marginRight", { getter: getPixel, setter: setPixel });
        CSSBinder.registerProperty("marginTop", { getter: getPixel, setter: setPixel });
        CSSBinder.registerProperty("marginBottom", { getter: getPixel, setter: setPixel });
    }
    static registerProperty (key, property) {
        CSSBinder.properties[key] = property;
    }
    static bind (target, el) {
        target.realStyle = window.getComputedStyle(el)
        let obj = {};
        return new Proxy(target, {
            get (target, propKey, receiver) {
                let property = CSSBinder.properties[propKey];
                if (property != null) {
                    return property.getter(obj, target, propKey);
                }
                return target.realStyle[propKey];
            },
            set (target, propKey, value, receiver) {
                let property = CSSBinder.properties[propKey];
                if (property != null)
                    property.setter(obj, target, propKey, value);
                else {
                    target[propKey] = value;
                }
                return true;
            }
        });
    }
}
CSSBinder.properties = {};

// 颜色过渡只支持16进制 比如: 0x00ff00
// 初始值scaleX,scaleY不一样时,在过渡时不能使用scale,要使用scaleX,scaleY（translate同理）




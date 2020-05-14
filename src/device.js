//check if using babel polyfill ok.
async function grantDeviceOrient() {
    let grant = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // iOS 13+
            let response;
            try {
                response = await DeviceOrientationEvent.requestPermission()
            } catch(err) {
                //handle hint page here
                console.error(err);
            }
            
            if (response == 'granted') {
                 grant = addDeviceEvent();
            }
        
        } else {
            // non iOS 13+
            grant = addDeviceEvent();
        }
    }
    return grant;
}


function addDeviceEvent() {

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation, false);
        initMotion();
    } else {
        alert('DeviceOrientationEvent is not supported!');
        console.log("DeviceOrientationEvent is not supported");
        return false;
    }
    // if (window.DeviceMotionEvent) {
    //     window.addEventListener("devicemotion", handleMotion, true);
    // } else {
    //     alert('DeviceMotionEvent is not supported!');
    //     console.log("DeviceMotionEvent is not supported");
    //     return false;
    // }
    return true;
}


let acc = {x:-1, y:-1, z:-1}
let orientation = {x:-1, y:-1, z:-1}
let dispatchOrientation;
let dispatchMotion;
let self;
let motion;

function initMotion(){
    motion = {
        x: new Motion(),
        y: new Motion(),
        z: new Motion()
    }
}

function dispatchDevice({orientation, motion}, _self=null) {
    if (orientation) dispatchOrientation = orientation;
    if (motion) dispatchMotion = motion;
    self = _self;
}

/*
    EVENT USAGE
    event.alpha: z (0~360) z 軸射出螢幕
    event.beta: x (-180~180) x 軸左右
    event.gamma: y (-90~90) y 軸上下
    More Info: 
    https://developer.mozilla.org/zh-TW/docs/Web/API/Detecting_device_orientation
    https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained
*/
function handleOrientation(event) {
    orientation = {
        x: event.beta,
        y: event.gamma,
        z: event.alpha
    }
    if (dispatchOrientation) dispatchOrientation(event, self);
    if (dispatchMotion) {
        motion.x.calculate(event.beta);
        motion.y.calculate(event.gamma);
        motion.z.calculate(event.alpha);
        event.acceleration = {
            x: motion.x.a,
            y: motion.y.a,
            z: motion.z.a
        }
        dispatchMotion(event, self);
    }
}

/*
    EVENT USAGE
    event.acceleration: includes x, y, z
    event.accelerationIncludingGravity: includes x, y, z
    event.rotationRate: includes alpha(z), beta(x), gamma(y)
    event.interval: 裝置取得資料的頻率
*/
function handleMotion(event) {
    acc = {
        x: event.acceleration.x,
        y: event.acceleration.y,
        z: event.acceleration.z,
    }
    if (dispatchMotion) dispatchMotion(event, self);
    //acc = event.acceleration;
}

class Motion {
    p = 0;
    v = 0;
    a = 0;
    lastP = 0;
    lastV = 0;
    lastA = 0;
    constructor() {

    }

    calculate(value) {
        this.lastP = this.p;
        this.lastV = this.v;
        this.lastA = this.a;
        this.p = value;

        this.v = this.p - this.lastP;
        this.a = this.v - this.lastV;
    }
}



export {dispatchDevice, grantDeviceOrient};
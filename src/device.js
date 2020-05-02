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
    } else {
        alert('DeviceOrientationEvent is not supported!');
        console.log("DeviceOrientationEvent is not supported");
        return false;
    }
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", handleMotion, true);
    } else {
        alert('DeviceMotionEvent is not supported!');
        console.log("DeviceMotionEvent is not supported");
        return false;
    }
    return true;
}


let acc = {x:-1, y:-1, z:-1}
let orientation = {x:-1, y:-1, z:-1}
let dispatchOrientation;
let dispatchMotion;

function dispatchDevice({orientation, motion}) {
    if (orientation) dispatchOrientation = orientation;
    if (motion) dispatchMotion = motion;
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
    if (dispatchOrientation) dispatchOrientation(event);
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
    if (dispatchMotion) dispatchMotion(event);
    //acc = event.acceleration;
}

export {dispatchDevice, grantDeviceOrient};
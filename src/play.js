import {recorder} from './mic';
import {dispatchDevice} from './device';

let prevShake = 0;
let prev = -1;

function initPlayPage() {
    dispatchDevice({motion: detectShake})
}

function detectShake(event) {
    if (event.acceleration.y > 3) {
        if (prev == -1 || new Date() - prevShake > 1000) {
            recorder.play()
            console.log('play');
        }
        prevShake = new Date();
        prev = 1;
    } else if (event.acceleration.y < -1) {
        if (prev == 1 || new Date() - prevShake > 1000) {
            recorder.play((buffer)=>{ 
                return buffer.slice().reverse();
            });
            console.log('reverse');
        }
        prevShake = new Date();
        prev = -1;
    }
    // if (event.acceleration.y < -1) console.log('neg!',(event.acceleration.y));
    // else if (Math.abs(event.acceleration.y) > 3) {
    //     console.log(event.acceleration.y);
    // }

    
    // if (event.acceleration.y > ) {

    // }
}


export {initPlayPage};
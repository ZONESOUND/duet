import Recorder from '@zonesoundcreative/web-recorder';
import $ from 'jquery';
import ProgressBar from 'progressbar.js';

let mediaStream;
let recorder;
let progressbar;
let recordLen = 400;

let grantMicPermission = async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch(err) {
        //handle hint page here
        console.error(err);
        return false;
    }

    return true;
}

let initRecordPage = function() {
    console.log('init page');
    initRecord();
}

progressbar = new ProgressBar.Circle('#progress', {
    strokeWidth: 4,
    easing: 'linear',
    duration: recordLen,
    color: 'red',
    trailColor: 'pink',
    trailWidth: 4,
    text: {autoStyleContainer: false},
    svgStyle: null,
    step: function(state, circle) {
        circle.setText('<i class="fas fa-microphone"></i>');
        if (recorder && recorder.isRecording()){
            if (circle.value() == 1.) {
                circle.setText(`<i class="fas fa-microphone"></i>`);
                // $('#record').removeClass('btn-danger');
                // $('#record').addClass('btn-success');
                // $('#record').text('Record');
                console.log('record stop');
                recorder.stop();
                
            } else {
                let left = (1-circle.value())*recordLen;
                circle.setText((left/1000).toFixed(2));
            }
        }
    }
    
});
if (progressbar.text) {
    progressbar.text.style.fontSize = '2em';
}


let initRecord = function() {
    let AudioContext = window.AudioContext|| window.webkitAudioContext ||      window.mozAudioContext || window.msAudioContext;
    let context = new AudioContext();
    //console.log(mediaStream);
    let source = context.createMediaStreamSource(mediaStream);
    recorder = new Recorder(source);
    //console.log(recorder);
    //init button
    // $('#record').click(function() {
    //     if (!recorder.isRecording()) { // to record
    //         $('#record').removeClass('btn-success');
    //         $('#record').addClass('btn-danger');
    //         $('#record').text('Stop');
    //         recorder.record();
    //     } else { // to stop!
    //         $('#record').removeClass('btn-danger');
    //         $('#record').addClass('btn-success');
    //         $('#record').text('Record');
    //         recorder.stop();
    //     }
    // });

    $('#play').click(function() {
        recorder.play();
    });

    $('#reverseplay').click(function() {
        recorder.play((buffer)=>{ 
            return buffer.slice().reverse();
        });
    });

    $('#progress').click(function() {
        if (!recorder.isRecording()) { // to record
            progressbar.animate(0, {
                duration: 0
            }, ()=>{
                progressbar.animate(1.0);
            });
            // $('#record').removeClass('btn-success');
            // $('#record').addClass('btn-danger');
            // $('#record').text('Stop');
            recorder.record();
            console.log('record start');
            
        }

    })
    
};

export {initRecordPage, grantMicPermission, recorder};
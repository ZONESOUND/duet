import Recorder from '@zonesoundcreative/web-recorder';
import $ from 'jquery';

let mediaStream;
let recorder;

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
    //console.log('init page');
    initRecord();
}

let initRecord = function() {
    let AudioContext = window.AudioContext|| window.webkitAudioContext ||      window.mozAudioContext || window.msAudioContext;
    let context = new AudioContext();
    //console.log(mediaStream);
    let source = context.createMediaStreamSource(mediaStream);
    recorder = new Recorder(source);
    //console.log(recorder);
    //init button
    $('#record').click(function() {
        if (!recorder.isRecording()) { // to record
            $('#record').removeClass('btn-success');
            $('#record').addClass('btn-danger');
            $('#record').text('Stop');
            recorder.record();
        } else { // to stop!
            $('#record').removeClass('btn-danger');
            $('#record').addClass('btn-success');
            $('#record').text('Record');
            recorder.stop();
        }
    });

    $('#play').click(function() {
        recorder.play();
    });

    $('#reverseplay').click(function() {
        recorder.play((buffer)=>{ 
            return buffer.slice().reverse();
        });
    });
};

export {initRecordPage, grantMicPermission, recorder};
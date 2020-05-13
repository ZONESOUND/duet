import 'babel-polyfill';
import $ from 'jquery';
import ViewStep from '@zonesoundcreative/view-step';
import {grantDeviceOrient} from './device';
import {grantMicPermission, initRecordPage, recorder} from './mic';
import {Shaker, Thrower, Mover} from './playMode';
//import {initPlayPage, endPlayPage} from './play';
import './index.css';

import {P5} from './p5canvas';

let viewStep = new ViewStep(".viewstep", 1, 3,{
    //3: initRecordPage,
    //3: initPlayPage
});

let playStep = new ViewStep(".playstep", 1, 2, {
    2: () => {playModeIns.init();}
});

const playModeClass = [Shaker, Thrower, Mover];
let playMode = 0;
export let playModeIns;

$('#start').click(async function() {
    //viewStep.showNext();
    if (await grantDeviceOrient()) {
        if (await grantMicPermission()) {
            viewStep.showNext();
        }
    }
})

$('.nextplay').click(function() {
    playModeIns.init();
    playStep.showNext();
})

$('.prevplay').click(function() {
    playModeIns.end();
    playStep.showPrev();
})

$('.prevview').click(function() {
    $(`#page-mode${playMode}`).hide();
    playModeIns.end();
    viewStep.showPrev();
    //endPlayPage();
})



for (let i=1; i<=3; i++) {
    $(`#page-mode${i}`).hide();
    $(`#btn-mode${i}`).click(function() {
        alert(`page${i}`);
        playMode = i;
        $(`#page-mode${i}`).show();
        //setup record time...
        viewStep.showNext();
        //initRecordPage();
        //console.log(recorder);
        // if (!playModeIns) {
        playModeIns = new playModeClass[i-1](recorder);
        
        // }
    })
}


function unlock() {
    // Unlock WebAudio - create short silent buffer and play it
    // This will allow us to play web audio at any time in the app
    let AudioContext = window.AudioContext|| window.webkitAudioContext ||      window.mozAudioContext || window.msAudioContext;
    let context = new AudioContext();
    var buffer = context.createBuffer(1, 1, 22050); // 1/10th of a second of silence
    var tempsource = context.createBufferSource();
    tempsource.buffer = buffer;
    tempsource.connect(context.destination);
    tempsource.onended = function()
    {
        console.log("WebAudio unlocked!");
    };
    tempsource.start();
}
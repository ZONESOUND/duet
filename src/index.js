import 'babel-polyfill';
import $ from 'jquery';
import ViewStep from '@zonesoundcreative/view-step';
import {grantDeviceOrient} from './device';
import {grantMicPermission, initRecordPage} from './mic';
import {initPlayPage, endPlayPage} from './play';
import './index.css';

let viewStep = new ViewStep(".step", 1, 3,{
    2: initRecordPage,
    3: initPlayPage
});

$('#start').click(async function() {
    //viewStep.showNext();
    if (await grantDeviceOrient()) {
        if (await grantMicPermission()) {
            viewStep.showNext();
        }
    }
})

$('#next').click(function() {
    viewStep.showNext(); 
})

$('#prev').click(function() {
    viewStep.showPrev();
    endPlayPage();
})

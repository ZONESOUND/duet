import {recorder} from './mic';




// import {dispatchDevice} from './device';
// import MidiPlayer from 'midi-player-js';
// //import 'fs';
// import MIDIFile from 'midifile';
// //import {Player} from './midi/player';
// //var MidiPlayer = require('midi-player-js');
// import midiFile from './mario.mid';
// import axios from 'axios';


// let prevShake = 0;
// let prev = -1;

// function initPlayPage() {
//     // var Player = new MidiPlayer.Player(function(event) {
//     //     console.log(event);
//     // });
//     // Player.loadFile(midFile);
//     // Player.play();
//     dispatchDevice({motion: detectShake})
// }

// function endPlayPage() {
//     dispatchDevice({motion: ()=>{return;}})
// }

// function detectShake(event) {
//     if (event.acceleration.y > 3) {
//         if (prev == -1 || new Date() - prevShake > 1000) {
//             recorder.play()
//             console.log('play');
//         }
//         prevShake = new Date();
//         prev = 1;
//     } else if (event.acceleration.y < -1) {
//         if (prev == 1 || new Date() - prevShake > 1000) {
//             recorder.play((buffer)=>{ 
//                 return buffer.slice().reverse();
//             });
//             console.log('reverse');
//         }
//         prevShake = new Date();
//         prev = -1;
//     }
//     // if (event.acceleration.y < -1) console.log('neg!',(event.acceleration.y));
//     // else if (Math.abs(event.acceleration.y) > 3) {
//     //     console.log(event.acceleration.y);
//     // }

    
//     // if (event.acceleration.y > ) {

//     // }
// }

// function temp() {
   
    
//     // console.log(midiFile);
//     var player = new MidiPlayer.Player(function(event) {
//         console.log(event);
    
//     });
//     //player.stop()
    
//     function str2ab(str) {
//         var buf = []; // char codes
//         for (var i = 0; i < str.length; ++i) {
//             var code = str.charCodeAt(i);
//             buf = buf.concat([code]);
//         }
//         return buf;
//     }
//     let arrayBuffer;
//     async function getMidiBuffer() {
//         try {
//             const response = await axios.get(midiFile);
//             console.log('yo?');
//             //arrayBuffer = str2ab(response.data);
//             //console.log(arrayBuffer);
//             arrayBuffer = new Uint8Array(str2ab(response.data))
//             //console.log(MIDIFile);
    
//             //player.play()
//             return true;
//         } catch (error) {
//           console.error(error);
//           return false;
//         }
//     }
//     $('#start').click(async function() {
//         console.log('click!');
//         if (await getMidiBuffer()) {
//             console.log('get!', arrayBuffer);
//             //player.loadArrayBuffer(arrayBuffer);
//             //console.log('y');
//             var midiFile = new MIDIFile(arrayBuffer);
//             // // Reading headers
//             // midiFile.header.getFormat(); // 0, 1 or 2
//             // midiFile.header.getTracksCount(); // n
//             // // Time division
//             // if(midiFile.header.getTimeDivision() === MIDIFile.Header.TICKS_PER_BEAT) {
//             //     midiFile.header.getTicksPerBeat();
//             // } else {
//             //     midiFile.header.getSMPTEFrames();
//             //     midiFile.header.getTicksPerFrame();
//             // }
            
//             // // MIDI events retriever
//             // var events = midiFile.getMidiEvents();
//             // console.log(events);
//             // events[0].subtype; // type of [MIDI event](https://github.com/nfroidure/MIDIFile/blob/master/src/MIDIFile.js#L34)
//             // events[0].playTime; // time in ms at wich the event must be played
//             // events[0].param1; // first parameter
//             // events[0].param2; // second one
            
//             // // Lyrics retriever
//             // // var lyrics = midiFile.getLyrics();
//             // // if ( lyrics.length ) {
//             // //     lyrics[0].playTime; // Time at wich the text must be displayed
//             // //     lyrics[0].text; // The text content to be displayed
//             // // }
            
//             // // Reading whole track events and filtering them yourself
//             // var events = midiFile.getTrackEvents(0);
            
//             // events.forEach(console.log.bind(console));
            
//             // // Or for a single track
//             // var trackEventsChunk = midiFile.tracks[0].getTrackContent();
//             // var events = MIDIEvents.createParser(trackEventsChunk);
            
//             // var event;
//             // while(event = events.next()) {
//             //     // Printing meta events containing text only
//             //     if(event.type === MIDIEvents.EVENT_META && event.text) {
//             //         console.log('Text meta: '+event.text);
//             //     }
//             // }
//         }
//     });
    
    
//     // console.log(soundFiles);
//     // var reader = new FileReader();
//     // let arrayBuffer = reader.readAsArrayBuffer(soundFiles);
//     // console.log(arrayBuffer);
//     // fs.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
//     //     console.log(err);
//     //     // fs.readFile('/test.txt', function(err, contents) {
//     //     //     console.log(err);
//     //     //   console.log(contents.toString());
//     //     // });
//     // });
//     // fs.readFile('./61866.mid', function(err, contents) {
//     //     console.log(contents.toString());
//     // });
//     // var player = new Player(function(event) {
//     //     console.log(event);
//     // });
     
//     //console.log(soundFiles);
//     // // Load a MIDI file
//     //player.loadFile(soundFiles);
//     //player.loadArrayBuffer(arrayBuffer);
//     //player.loadDataUri(soundFiles)
//     // Player.play();
    
    



// }


//export {initPlayPage, endPlayPage};
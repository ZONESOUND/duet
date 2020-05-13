import * as p5 from 'p5';
import $ from 'jquery';
import {playModeIns} from './index';

let s = (p) => {    
    p.setup = () => {
        let myCanvas = p.createCanvas(window.innerWidth, window.innerHeight);
        myCanvas.parent("playcanvas");
        p.background(0,0,0);
    }

    p.draw = () => {
        if (playModeIns) playModeIns.draw(p);
    }
}

export const P5 = new p5(s);
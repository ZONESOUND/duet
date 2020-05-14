import {dispatchDevice} from './device';

class PlayMode {
    
    constructor(recorder, recordTime, initFunc=null, endFunc=null) {
        this.recorder = recorder;
        this.recordTime = recordTime;
        if (initFunc) this.initFunc = initFunc;
        if (endFunc) this.endFunc = endFunc;
        this.enable = false;
    }

    init() {
        console.log('init play mode');
        this.enable = true;
        if (this.initFunc) this.initFunc();
    }

    end() {
        this.enable = false;
        dispatchDevice({orientation: ()=>{return;}, motion: ()=>{return;}});
        if (this.endFunc) this.endFunc();
    }

    getRecordLen() {
        return this.recordTime;
    }
    
    draw(p) {
        this.width = p.width;
        this.height = p.height;
        if (!this.enable) return false;
        if (this.drawFunc) this.drawFunc(p);
    }
}

export class Shaker extends PlayMode {
    
    constructor(recorder, recordTime=400) {
        super(recorder, recordTime);
        this.enable = true;
        this.enableMs = recordTime/4;
    }

    initFunc() {
        //super.init()
        console.log('shaker init');
        dispatchDevice({motion: this.playWhenAcc}, this);
    }

    playWhenAcc(event, self) {
        if (event.acceleration.z > 5) {
            self.playImmediately();
        }
    }
     
    playImmediately() {
        if (this.enable) {
            this.recorder.play();
            this.enable = false;
            setTimeout(()=>{
                this.enable = true;
            }, this.enableMs)
        }
    }
    
}

export class Thrower extends PlayMode {
    
    constructor(recorder, recordTime=400) {
        super(recorder, recordTime);
        console.log('Thrower');
        this.prevShake = 0;
        this.prev = -1;
    }

    initFunc() {
        dispatchDevice({motion: this.detectShake}, this);
    }

    detectShake(event, self) {
        //console.log('detect!', self.prev, self.prevShake);
        if (event.acceleration.y > 10) {
            if (self.prev == -1 || new Date() - self.prevShake > 1000) {
                self.recorder.play()
                console.log('play');
            }
            self.prevShake = new Date();
            self.prev = 1;
        } else if (event.acceleration.y < -8) {
            if (self.prev == 1 || new Date() - self.prevShake > 1000) {
                self.recorder.play((buffer)=>{ 
                    return buffer.slice().reverse();
                });
                console.log('reverse');
            }
            self.prevShake = new Date();
            self.prev = -1;
        }
    }
}

export class Mover extends PlayMode {
    multi = {
        x: 10,
        y: 10,
        z: 5
    }
    
    pos = {
        x: 0,
        y: 0,
        r: 0,
    }

    constructor(recorder, recordTime=3000) {
        super(recorder, recordTime);
        // let AudioContext = window.AudioContext|| window.webkitAudioContext ||      window.mozAudioContext || window.msAudioContext;
        // this.context = new AudioContext();
        this.context = this.recorder.getContext();
    }

    initFunc() {
        this.play(this.recorder.getBuffer());
        dispatchDevice({orientation: this.calculate}, this);
    }

    calculate(event, self) {
        self.pos.x += Math.sin(deg2rad(event.gamma))*self.multi.y;
        self.pos.x = Math.max(-self.width/2+25, Math.min(self.width/2-25, self.pos.x));

        self.pos.y += Math.sin(deg2rad(event.beta))*self.multi.x;
        self.pos.y = Math.max(-self.height/2+25, Math.min(self.height/2-25, self.pos.y));
        self.pos.r = event.alpha;
        self.playEffect();
    }

    playEffect() {
        this.playSource.gain.value = this.pos.x * 2 / this.width + 1;
        this.playSource.playbackRate.value = this.pos.y * 2 / this.height + 1;
        //console.log()
    }
    
    drawFunc(p) {
        p.background(0, 0, 0);
        //push()
        p.fill(100);
        p.translate(p.width / 2 + this.pos.x, p.height / 2 + this.pos.y);
        p.rotate(p.radians(-this.pos.r)* this.multi.z);
        p.square(-25, -25, 50);
        //pop()
    
    }

    play(playbuffer) {
        console.log('play~');
        this.playSource = this.context.createBufferSource();
        let newBuffer = this.context.createBuffer(1, playbuffer.length, this.context.sampleRate );
        newBuffer.getChannelData(0).set(playbuffer);
        
        // let lfo = this.context.createOscillator();
        // let lfoGain = this.context.createGain();
        // var biquadFilter = this.context.createBiquadFilter();
        // biquadFilter.type = "lowpass";
        // biquadFilter.frequency.value = 10000;
        // biquadFilter.gain.value = 25;

        // lfo.type = lfo.SINE;

        // lfo.frequency.value = 0;
        // lfoGain.gain.value = 0;
        // playSource.filter = biquadFilter;
        // playSource.lfo = lfo;
        // playSource.lfoGain = lfoGain;
        this.playSource.buffer = newBuffer;
        //let gain = this.context.createGain();
        //console.log(this.context, playSource, gain);
        //playSource.gain = gain;
        this.playSource.loop = true;

        //this.playSource.connect(biquadFilter);
        //biquadFilter.connect(context.destination);
        //oscGain.connect(playSource.gain);
        this.playSource.connect(this.context.destination);
        this.playSource.start();

        //lfo.connect(lfoGain)
        //lfoGain.connect(biquadFilter.frequency);
        //lfo.start();

        this.playSource.onended = function() {
            this.playSource.disconnect();
        }

        // let playSource = this.context.createBufferSource();
        // let newBuffer = this.context.createBuffer(1, playbuffer.length, this.context.sampleRate);
        // newBuffer.getChannelData(0).set(playbuffer);
        // playSource.buffer = newBuffer;
        // playSource.connect(this.context.destination);
        // playSource.start();
        // playSource.onended = function() {
        //     playSource.disconnect(this.context.destination);
        // }
    }

    endFunc() {
        if (this.playSource) {
            this.playSource.stop();
            this.playSource = null;
        }
    }
}

function deg2rad(deg) {
    return deg*Math.PI/360;
}
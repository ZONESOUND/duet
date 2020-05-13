export default class Recorder {
    #recording = false;
    recordedBuffer = [];

    constructor(source) {
        this.context = source.context;
        console.log(source);
        this.processor = this.context.createScriptProcessor(2048,1,1);
        source.connect(this.processor);
        this.processor.connect(this.context.destination);
    
        this.processor.onaudioprocess = (e) => {
            //console.log(e, this.#recording);
            if (!this.#recording) return;
            console.log(e.inputBuffer.getChannelData(0), this.#recording);
            e.inputBuffer.getChannelData(0).forEach(e => {
                this.recordedBuffer.push(e);
            })
        };

    }

    record(clear=true) {
        if (clear) this.clear();
        this.#recording = true;
    }

    stop() {
        this.#recording = false;
    }

    clear() {
        this.recordedBuffer = [];
    }

    getBuffer() {
        return this.recordedBuffer;
    }

    isRecording() {
        return this.#recording;
    }

    play(manipulateFunc=(buffer)=>{return buffer}) {
        let playbuffer;
        if (manipulateFunc) playbuffer = manipulateFunc(this.recordedBuffer);
        let playSource = this.context.createBufferSource();
        console.log(playbuffer);
        let newBuffer = this.context.createBuffer(1, playbuffer.length, this.context.sampleRate);
        
        newBuffer.getChannelData(0).set(playbuffer);
        playSource.buffer = newBuffer;
        playSource.connect(this.context.destination);
        playSource.start();
        playSource.onended = function() {
            playSource.disconnect(this.context.destination);
        }
    }

    getContext() {
        return this.context;
    }
}


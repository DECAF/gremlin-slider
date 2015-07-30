import _ from 'lodash';

class Clock {
    constructor(duration, tickCb) {
        this._duration = duration;
        this._interval = null;
        this._onTick = tickCb;
    }

    play(){
        this.stop();
        this._interval = setInterval(this._onTick, this._duration);
    }

    _onTick(){
        this.handleTick();
    }

    stop(){
        clearInterval(this._interval);
    }

}

export default Clock;

const START = 0;
const STEP  = 1;

class Pointer {


    constructor(length, position) {
        this._length   = length;
        this._position = position;
    }


    next() {
        if (this.hasMore) {
            this._position += STEP;
        }
    }

    prev() {
        if (this.hasLess) {
            this._position -= STEP;
        }
    }


    get position() {
        return this._position;
    }

    get length() {
        return this._length;
    }

    get hasMore() {
        return this._position + STEP < this._length;
    }

    get hasLess() {
        return this._position - STEP >= START;
    }

    gotoPosition(position) {
        if (position >= this._length) {
            position = this._length - 1;
        } else if (position < START) {
            position = START;
        }

        this._position = position;
    }

    gotoStart() {
        this.gotoPosition(START);
    }

    gotoEnd() {
        this.gotoPosition(this._length - 1);
    }
}

export default Pointer;

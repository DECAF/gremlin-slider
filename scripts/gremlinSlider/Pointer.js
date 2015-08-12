const START = 0;
const STEP  = 1;

class Pointer {


    constructor(length, startIndex, isInfinite = false) {
        this._length     = length;
        this._position   = startIndex;
        this._isInfinite = isInfinite;
    }

    next() {
        if (this.hasMore) {
            this._position += STEP;
        } else if (this._isInfinite) {
            this.gotoStart();
        }
    }

    prev() {
        if (this.hasLess) {
            this._position -= STEP;
        } else if (this._isInfinite) {
            this.gotoEnd();
        }
    }

    set _position(position) {
        this._lastPosition = this._pos === undefined ? position : this._pos;
        this._pos  = position;
    }

    get _position() {
        return this._pos;
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

    get isInfinite() {
        return this._isInfinite;
    }

    get isAscending(){
        return this._position > this._lastPosition;
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

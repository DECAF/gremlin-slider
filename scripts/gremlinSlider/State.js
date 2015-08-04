class State {
    constructor(pointer, itemsPerPage){
        this._pointer = pointer;
    }

    get hasMore(){
        return this._pointer.hasMore;
    }

    get hasLess(){
        return this._pointer.hasLess;
    }

    get length(){
        return this._pointer.length;
    }

    get isInfinite(){
        return this._pointer.isInfinite;
    }
}

export default State;
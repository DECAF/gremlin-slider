class State {
    constructor(pointer){
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
}

export default State;
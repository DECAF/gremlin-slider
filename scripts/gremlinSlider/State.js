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

    get position(){
        return this._pointer.position + 1; // the pointer works 0-based, we will add 1 to get the human readable format
    }

    get isInfinite(){
        return this._pointer.isInfinite;
    }
}

export default State;
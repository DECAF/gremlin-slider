import _ from 'lodash';

class State {
    constructor(pointer, itemsTotal, itemsPerPage) {
        this._pointer      = pointer;
        this._itemsTotal   = itemsTotal;
        this._itemsPerPage = itemsPerPage;


//        console.log(`New slider state:
//
//- position (0-based): ${this._pointer.position}
//- pages total   :     ${this._pointer.length}
//- items in total:     ${this._itemsTotal}
//- items per page:     ${this._itemsPerPage}
//- first (0-based):    ${this.firstVisible}
//- last (0-based):     ${this.lastVisible}
//- isAscending:        ${this.isAscending}
//- active:             ${this.visibleItems}`);
    }

    get hasMore() {
        return this._pointer.hasMore;
    }

    get hasLess() {
        return this._pointer.hasLess;
    }

    get canGoForward() {
        return (this.hasMore || this.isInfinite) && (this.length > 1);
    }

    get canGoBack() {
        return (this.hasLess || this.isInfinite) && (this.length > 1);
    }

    get length() {
        return this._pointer.length;
    }

    // 0-based
    get firstVisible(){
        return this._pointer.position * this._itemsPerPage;
    }

    // 0-based
    get lastVisible(){
        return ((this._pointer.position + 1) * this._itemsPerPage) - 1;
    }

    get visibleItems() {
        //var isOnPage = index =>
        var active = [];
        //
        var firstVisible = (this._pointer.position * this._itemsPerPage) + 1;
        var lastVisible  = (this._pointer.position + 1) * this._itemsPerPage;

        console.log(`- first: ${firstVisible}- last: ${lastVisible}`)
        _.times(this._itemsTotal, index => {
            let current = index + 1;

            if (current >= firstVisible && current <= lastVisible) {
                active.push(current);
            }
            //console.log(`item ${index} visible?`)
        })

        return active;
    }

    get position() {
        return this._pointer.position + 1; // the pointer works 0-based, we will add 1 to get the human readable format
    }

    get isInfinite() {
        return this._pointer.isInfinite;
    }

    get isAscending(){
        return this._pointer.isAscending;
    }

    get isDescending(){
        return !this._pointer.isAscending;
    }

    isActiveSlide(index) {
        return (index >= this.firstVisible) && (index <= this.lastVisible);
    }
}

export default State;
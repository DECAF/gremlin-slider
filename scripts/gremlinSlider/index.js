import gremlins from 'gremlins';
import gremlinsJquery from 'gremlins-jquery';
import dispatcher from 'gremlins-dispatcher';
import data from 'gremlins-data';
import {EventEmitter} from 'events';

import Pointer from './Pointer';
import Clock from './Clock';

const START_INDEX        = 0;
const DEFAULT_INTERVAL   = 5000;
const WIDTH_WITH_MARGINS = true;
const NO_DRAG            = 0;
const NO_ID              = null;
const CSS_DRAGGING       = 'slider_state-dragging';
const CSS_PREV_INACTIVE  = 'slider__prev--state-inactive';
const CSS_NEXT_INACTIVE  = 'slider__next--state-inactive';
const NO_NAV             = null;

const GremlinSlider = gremlins.create('gremlin-slider', {
    mixins: [gremlinsJquery, dispatcher, data],

    elements: {
        '[data-hook="container"]': '_$container',
        '[data-hook="slides"]': '_$slides',
        '[data-hook="slides"] > li': '_$items',
        '[data-slider-navigation]': '_$navigation'
    },

    events: {
        'slider-navigation:next': 'onNavigationNext',
        'slider-navigation:prev': 'onNavigationPrev'
    },
    initialize() {
        //let nav = require('./templates/navigation.nunj').render();
        //console.log(nav)
        //this.$el.append(nav);



        //this.isAuto         = this.data.slideshowAuto === true;
        //this._hasNavigation = this._$navigation.length > 0;
        //
        //this.interval  = this.data.slideshowInterval || DEFAULT_INTERVAL;
        //this._sliderId = this.data.sliderId || NO_ID;
        //this._clock    = new Clock(this.interval, this._onClockTick.bind(this));
        //
        //this._navigation = this._hasNavigation ? new Navigation(this._$navigation) : NO_NAV;
        //
        //this._clock.handleTick = this._onClockTick;
        //
        //if (this._navigation !== NO_NAV) {
        //    this._navigation.onNavigationClicked = this._onNavigationClicked;
        //    this._navigation.onControlClicked    = this._onControlClicked;
        //}
        //
        //this._videoRuns = no;
        //this._isFocused = no;
        //
        //this.addResizeListener(this._onResize, this);
        //this._prepareList();
        //this._startClock();
    },
    onNavigationNext(event, data){
        console.log(event, data)
    },
    onNavigationPrev(event, data) {

    },
    _onClockTick(){
        if (this._index.hasMore) {
            this._index.next();
        } else {
            this._index.gotoStart();
        }
        return this._refreshList();
    }
});

export default GremlinSlider;

import $ from 'jquery';
import _ from 'lodash';
import velocity from 'velocity-animate';
import gremlins from 'gremlins';
import gremlinsJquery from 'gremlins-jquery';
import dispatcher from 'gremlins-dispatcher';
import data from 'gremlins-data';
import {EventEmitter} from 'events';

import Pointer from './Pointer';
import Clock from './Clock';
import State from './State';
import Events from '../Events';

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
    mixins: [gremlinsJquery, data, dispatcher],

    elements: {
        '[data-hook="container"]': '$container',
        '[data-hook="slides"]': '$slidesList',
        '[data-hook="slides"] > li': '$items',
        '[data-slider-navigation]': '$navigation',
        '[slide]': '$slides'
    },

    initialize() {
        //this.isAuto         = this.data.slideshowAuto === true;
        //this._hasNavigation = this._$navigation.length > 0;
        //
        //this.interval = this.data.slideshowInterval || DEFAULT_INTERVAL;
        //this._sliderId = this.data.sliderId || NO_ID;
        //this._clock = new Clock(this.interval, this._onClockTick.bind(this));
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
        this._prepareList();

        $(window).resize(_.debounce(this._prepareList.bind(this), 150).bind(this));
        //this._startClock();
    },

    getListeners(){
        this._events = new Events(this.props.name); // TODO this is a perfect mixin, evented or something

        return {
            [this._events.getEvent(Events.GREMLIN_SLIDER_NEXT)]: 'onNavigationNext',
            [this._events.getEvent(Events.GREMLIN_SLIDER_PREV)]: 'onNavigationPrev',
            [this._events.getEvent(Events.GREMLIN_SLIDER_REQUEST_DATA)]: 'onDataRequest',
        }
    },

    _getState(){
        return new State(this._pointer, this.$items.length, this._itemsPerPage);
    },

    _prepareList(){
        var listWidth       = _.sum(this.$items.toArray().map(item=>$(item).outerWidth(WIDTH_WITH_MARGINS)));
        var containerWidth  = this.$container.width();
        var elementsPerPage = 0;

        this.$items.each((index, item) => {
            let width       = item.offsetWidth;
            let left        = item.offsetLeft;
            let rightOffset = left + width;
            //console.log('slider item found: ', width, left, rightOffset)
            if (rightOffset <= containerWidth) {
                elementsPerPage += 1;
            } else {
                return false;
            }
            //    elementsPerPage += 1
            //else
            //    break
        });

        var times = Math.ceil(this.$items.length / elementsPerPage);
        //console.log('slider has', times, 'pages')

        this._pointer = new Pointer(times, START_INDEX, this.props.infinite);

        var distance        = parseInt(this.$items.eq(1).css('margin-left'), 10);
        this._itemDistance  = isNaN(distance) ? 0 : distance;
        this._moveOffset    = containerWidth;
        this._currentOffset = 0
        this._itemsPerPage  = elementsPerPage;
        this._refreshList()
    },

    _refreshList(){
        //console.log('refresh list')
        var currentPage = this._pointer.position;
        var offset      = currentPage === START_INDEX ? 0 : -( (this._moveOffset * currentPage) + (this._itemDistance * currentPage))
        var state       = this._getState();

        this._currentOffset = offset;

        this.$slides.each((index, el) => {
            let isActive = state.isActiveSlide(index);
            el.setAttribute('ascending', state.isAscending);
            el.setAttribute('active', isActive);
        });
        this.$slides.slice(state.firstVisible, state.lastVisible + 1).each((index, el) => {
        });
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_CHANGED), state);

        this._moveList(offset);
    },

    _moveList(deltaX){
        //console.log('move list')
        var slidesEl = this.$slidesList[0];

        //this.$slidesList.css({
        //    transform: `translate3d(${deltaX.toString()}px, 0px, 0px)`
        //})
        velocity(slidesEl, 'stop', true);
        velocity(slidesEl, {
            translateX: deltaX
        }, 'easeInSine', 320);
    },


    onDataRequest({handler, name}){
        handler(this._getState());
    },

    onNavigationNext(){
        //this._stopClock()
        this._pointer.next();
        this._refreshList();
    },
    onNavigationPrev() {
        //this._stopClock()
        this._pointer.prev();
        this._refreshList();
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

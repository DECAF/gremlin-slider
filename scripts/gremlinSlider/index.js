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
        '[data-hook="slides"]': '$slides',
        '[data-hook="slides"] > li': '$items',
        '[data-slider-navigation]': '$navigation'
    },

    events: {
        'slider-navigation:next': 'onNavigationNext',
        'slider-navigation:prev': 'onNavigationPrev'
    },

    initialize() {
        //this.isAuto         = this.data.slideshowAuto === true;
        //this._hasNavigation = this._$navigation.length > 0;
        //
        this.interval = this.data.slideshowInterval || DEFAULT_INTERVAL;
        //this._sliderId = this.data.sliderId || NO_ID;
        this._clock = new Clock(this.interval, this._onClockTick.bind(this));
        //
        //this._navigation = this._hasNavigation ? new Navigation(this._$navigation) : NO_NAV;
        //
        this._clock.handleTick = this._onClockTick;
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

    _prepareList(){
        var listWidth       = _.sum(this.$items.toArray().map(item=>$(item).outerWidth(WIDTH_WITH_MARGINS)));
        var containerWidth  = this.$container.width();
        var elementsPerPage = 0;

        this.$items.each((index, item) => {
            let width       = item.offsetWidth;
            let left        = item.offsetLeft;
            let rightOffset = left + width;
            console.log('slider item found: ', width, left, rightOffset)
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
        console.log('slider has', times, 'pages')

        this._pointer = new Pointer(times, START_INDEX);
        //
        //
        //for item in @_$items
        //    width = item.offsetWidth
        //left = item.offsetLeft
        //rightOffset = left + width
        //
        //#console.log 'slider item found: ', width, left, rightOffset
        //if rightOffset <= containerWidth
        //    elementsPerPage += 1
        //else
        //    break
        //
        //times = Math.ceil(@_$items.length / elementsPerPage)
        //
        //
        //
        //@_dragStartIndex = START_INDEX
        //@_index = new Index times, START_INDEX
        //
        //@_$prev.toggle times > 1
        //@_$next.toggle times > 1
        //@_navigation?.updateNavigation times


        var distance        = parseInt(this.$items.eq(1).css('margin-left'), 10);
        this._itemDistance  = isNaN(distance) ? 0 : distance;
        this._moveOffset    = containerWidth;
        this._currentOffset = 0
        this._itemsPerPage  = elementsPerPage;
        //
        //    #console?.info "#{elementsPerPage} items per page, and #{@_$items.length} items in total, so we have #{times} slides in total. Distance is #{@_itemDistance}"
        //
        //    #console.log "the items have a total width of #{listWidth}px, the container is #{containerWidth}px wide, will slide #{times} times"
        this._refreshList()
    },

    _refreshList(){
        var currentPage     = this._pointer.position;
        var offset          = currentPage === START_INDEX ? 0 : -( (this._moveOffset * currentPage) + (this._itemDistance * currentPage))
        this._currentOffset = offset;

        //@_updateNav currentPage
        //@emit 'SLIDER_SLIDES',
        //     $slider: @$el

        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_CHANGED), new State(this._pointer));

        this._moveList(offset);
    },

    _moveList(deltaX){
        var slidesEl = this.$slides[0];
        velocity(slidesEl, 'stop');
        velocity(slidesEl, {
            translateZ: 0, // Force HA by animating a 3D property
            translateX: deltaX
        },'easeInSine', 320);
    },


    onDataRequest({handler, name}){
        if (name === this.props.name) {
            handler(new State(this._pointer));
        }
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

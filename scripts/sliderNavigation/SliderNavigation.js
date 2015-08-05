import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import data from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import Events from '../Events';

const EVENT_NEXT = 'slider-navigation:next';
const EVENT_PREV = 'slider-navigation:prev';


const SliderNavigation = gremlins.create('slider-navigation', {
    mixins: [gremlinsJquery, data, dispatcher],
    events: {
        'click [data-hook="next"]': 'onNextClick',
        'click [data-hook="prev"]': 'onPrevClick'
    },
    elements: {
        '[data-hook="next"]': '_$next',
        '[data-hook="prev"]': '_$prev'
    },
    initialize() {
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_REQUEST_DATA), {
            handler: this.onSliderRequest.bind(this)
        });
    },
    getListeners(){
        this._events = new Events(this.props.for);

        return {
            [this._events.getEvent(Events.GREMLIN_SLIDER_CHANGED)]: 'onSliderChanged'
        }
    },
    onSliderRequest(state) {
        this.updateState(state);
    },
    onSliderChanged(state) {
        this.updateState(state);
    },
    onNextClick(){
        console.log('click')
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_NEXT));
    },
    onPrevClick(){
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_PREV));
    },
    updateState(state){
        this._$next.toggleClass('slider__next--state-inactive', !state.hasMore && !state.isInfinite);
        this._$prev.toggleClass('slider__prev--state-inactive', !state.hasLess && !state.isInfinite);
    }
});

export default SliderNavigation;

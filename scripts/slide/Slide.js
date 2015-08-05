import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import data from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import Events from '../Events';

const EVENT_NEXT = 'slider-navigation:next';
const EVENT_PREV = 'slider-navigation:prev';


const Slide = gremlins.create('slider-slide', {
    mixins: [gremlinsJquery, data, dispatcher],
    events: {
    },
    elements: {
    },
    initialize() {
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_REQUEST_DATA), {
            handler: this.onSliderRequest.bind(this),
            name: this.props.for
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
    updateState(state){
        this._$next.toggleClass('slider__next--state-inactive', !state.hasMore);
        this._$prev.toggleClass('slider__prev--state-inactive', !state.hasLess);
    }
});

export default Slide;

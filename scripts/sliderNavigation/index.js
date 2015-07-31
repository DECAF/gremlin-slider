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
        'click [data-hook="prev"]': 'onPrevClick',
    },
    initialize() {
        this._events = new Events(this.props.for);
    },
    onNextClick(){
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_NEXT));
    },
    onPrevClick(){
        this.emit(this._events.getEvent(Events.GREMLIN_SLIDER_PREV));
    }
});

export default SliderNavigation;

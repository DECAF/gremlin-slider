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
        this.updateState();
    },
    attributeDidChange(name, previousValue, value) {
        if (name === 'class') {
            return false;
        }
        this.updateState();
    },
    getListeners(){
        //this._events = new Events(this.props.for);
        //
        //return {
        //    [this._events.getEvent(Events.GREMLIN_SLIDER_CHANGED)]: 'onSliderChanged'
        //}
    },
    onSliderRequest(state) {
        //this.updateState(state);
    },
    onSliderChanged(state) {
        //this.updateState(state);
    },
    updateState(){
        this.$el.toggleClass('slide--ascending', this.props.ascending);
        this.$el.addClass('slide--change-direction');

        // first change the direction so the css is able to do things first
        setTimeout(()=>{
            this.$el.removeClass('slide--change-direction');
            this.$el.toggleClass('slide--active', this.props.active);
        },10);
    }
});

export default Slide;

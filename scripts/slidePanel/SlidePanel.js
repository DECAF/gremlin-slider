import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import data from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import Events from '../Events';

const EVENT_NEXT = 'slider-navigation:next';
const EVENT_PREV = 'slider-navigation:prev';


const SlidePanel = gremlins.create('slide-panel', {
    mixins: [gremlinsJquery, data, dispatcher],
    events: {},
    elements: {},
    initialize() {
        this.$el.addClass('slide-panel');
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
        this.$el.toggleClass('slide-panel--active', this.props.active);

        this.emit('VISIBILITY_CHANGED', {
            el: this.el,
            gremlin: this
        })
    }
});

export default SlidePanel;

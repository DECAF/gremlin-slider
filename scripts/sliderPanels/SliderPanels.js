import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import gremlinsData from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import Events from '../Events';

const SliderPanels = gremlins.create('slider-panels', {
    mixins: [gremlinsJquery, gremlinsData, dispatcher],
    elements: {
      'slide-panel': '$slidePanels'
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
    render(state){
        this.$slidePanels.each((index, el) => {
            el.setAttribute('active', state.isActiveSlide(index));
            //console.log(`is slide #${index} active? `, state.isActiveSlide(index));
        });
    },
    onSliderRequest(state) {
        this.render(state);
    },

    onSliderChanged(state) {
        this.render(state);
    }
});

export default SliderPanels;

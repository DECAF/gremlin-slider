import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import gremlinsData from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import events from '../Events';

const SliderFolio = gremlins.create('slider-folio', {
    mixins: [gremlinsJquery, gremlinsData, dispatcher],
    listeners:{
      //'GREMLIN-SLIDER:CHANGED': 'onSliderChanged'
    },
    initialize() {
        this.emit(events.GREMLIN_SLIDER_REQUEST_DATA,{
            handler: this.onSliderRequest.bind(this),
            name: this.props.for
        });
    },
    render(){

    },
    onSliderRequest(data) {
        console.log('slider request completed', data)
    }
});

export default SliderFolio;

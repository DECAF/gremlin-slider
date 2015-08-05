import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';
import gremlinsData from 'gremlins-data';
import dispatcher from 'gremlins-dispatcher';

import Events from '../Events';
import folioTpl from './templates/folio.nunj';

const SliderFolio = gremlins.create('slider-folio', {
    mixins: [gremlinsJquery, gremlinsData, dispatcher],
    initialize() {
        this.$el.addClass('slider-folio');
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
       this.el.innerHTML = folioTpl.render({
           currentPage: state.position,
           length: state.length
       });
    },
    onSliderRequest(state) {
        this.render(state);
    },

    onSliderChanged(state) {
        this.render(state);
    }
});

export default SliderFolio;

import gremlins from 'gremlins';
import $ from 'jquery';
import gremlinsJquery from 'gremlins-jquery';

const EVENT_NEXT = 'slider-navigation:next';
const EVENT_PREV = 'slider-navigation:prev';


const SliderNavigation = gremlins.create('slider-navigation', {
    mixins: [gremlinsJquery],
    events: {
        'click [data-hook="next"]': 'onNextClick',
        'click [data-hook="prev"]': 'onPrevClick',
    },
    initialize() {
        //setTimeout(()=> {
        //    this.$el.trigger(EVENT_NEXT, {foo: 'bar'});
        //    this.$el.trigger(EVENT_PREV, {foo: 'bar'});
        //}, 1000);
    },
    onNextClick(){

    },
    onPrevClick(){

    }
});

export default SliderNavigation;

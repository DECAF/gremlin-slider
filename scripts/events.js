const getEvent = (id, eventName) => `${id}:${eventName}`;

export default class Events {

    static GREMLIN_SLIDER_CHANGED      = 'GREMLIN_SLIDER_CHANGED';
    static GREMLIN_SLIDER_REQUEST_DATA = 'GREMLIN_SLIDER_REQUEST_DATA';
    static GREMLIN_SLIDER_NEXT         = 'GREMLIN_SLIDER_NEXT';
    static GREMLIN_SLIDER_PREV         = 'GREMLIN_SLIDER_PREV';

    constructor(id) {
        this._id = id;
    }

    getEvent(eventName) {
        return getEvent(this._id, eventName);
    }

};
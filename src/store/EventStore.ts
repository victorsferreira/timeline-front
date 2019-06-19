import  { observable, computed, action, autorun } from "mobx";

class EventStore {
    @observable event = null;

    constructor() {
        autorun(() => console.log(this.event));
    }

    @action loadEvent = (_event: any) => {
        this.event = _event;
    }
}

const store = new EventStore();

export default store;
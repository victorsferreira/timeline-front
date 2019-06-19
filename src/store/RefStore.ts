import  { observable, computed, action, autorun } from "mobx";

class RefStore {
    @observable refs: Map<string, any> = new Map<string, any>();

    constructor() {
        autorun(() => console.log(this.refs));
    }

    @action addRef = (key: string, value: any) => {
        this.refs.set(key, value);
    }

    @action getRef = (key: string) => {
        return this.refs.get(key);
    }

    @action delRef = (key: string) => {
        return this.refs.delete(key);
    }
}

const store = new RefStore();

export default store;
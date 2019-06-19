import  { observable, action, autorun } from "mobx";

class ErrorStore {
    @observable errors:any[] = [];
    @observable currentError = null;

    constructor() {
        autorun(() => console.log(this.errors));
    }

    @action add = (errorMessage: any) => {
        this.currentError = errorMessage;
        this.errors = [...this.errors, errorMessage];
    }
}

const store = new ErrorStore();

export default store;
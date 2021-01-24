import { extendObservable} from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      isLoggedIn: false
    })
  }
  setLoggedIn(newValue) {
    this.isLoggedIn = newValue; 
  }
}

let stat = new UserStore();

export default stat;
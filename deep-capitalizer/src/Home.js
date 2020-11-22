import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import history from './History';

export default class Home extends Component {
  render() {
    return (
        <div>
            <p>This is Home</p>
            <Button  onClick={() => history.push('/testPage')}>Goto testing page</Button>
            <Button  onClick={() => history.push('/App')}>Goto App page</Button>
        </div>
    //   <div className="Home">
    //     <div className="lander">
    //       <h1>Home page</h1>
    //       <p>A simple app showing react button click navigation</p>
    //       <form>
    //         <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button>
    //       </form>
    //     </div>
    //   </div>
    );
  }
}
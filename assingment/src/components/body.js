import React from 'react';
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { findValue } from '../controllers/scg'

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      result: [],
    };
  }

  onFindClick(len) {
    const result = findValue(len);
    this.setState({ result, showResult: true });
    return this.result;
  }
  render() {
    return (
      <div>
        <h1>X, 5, 9, 15, 23, Y, Z - Please create a new function for finding X, Y, Z value</h1>
        <button type="button" className="btn btn-primary" onClick={this.onFindClick.bind(this, 10)}>function for finding X, Y, Z value</button>
        {
          (this.state.showResult) &&
          (
            <div>
              <h2> {this.state.result.toString()}</h2>
              <h3>X={this.state.result[0]}</h3>
              <h3>Y={this.state.result[5]}</h3>
              <h3>Z={this.state.result[6]}</h3>
            </div>
          )
        }
      </div>
    );
  }
}

export default (observer(Body));
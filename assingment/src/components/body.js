import React from 'react';
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { findValue } from '../controllers/scg'
import { geocodeByAddress } from 'react-places-autocomplete';
import { FormControl, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import request from 'then-request';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      result: [],
      position: {},
      locationText: '',
      showNearByStore: false,
      nearbyStore: undefined,
    };
    this.locationTxt = React.createRef();
  }

  locationtxt = 'บางซื่อ';

  onFindClick(len) {
    const result = findValue(len);
    this.setState({ result, showResult: true });
    return this.result;
  }

  onFindStoreClick(txt) {
    this.updateGoogleMap(this.locationTxt.current.value);
  }

  async updateGoogleMap(locationText) {
    const results = await geocodeByAddress(locationText);
    const geoLocation = results[0].geometry.location;
    const location = [geoLocation.lat(), geoLocation.lng()];
    const url = 'http://localhost:3001/nearby'
    const nearPlace = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (nearPlace && nearPlace.data && nearPlace.data.data && nearPlace.data.data.results) {
      this.setState({ nearbyStore: nearPlace.data.data.results, showNearByStore: true })
    }
    console.log('nearPlace ------------->>', nearPlace.data.data.results);
  }

  render() {
    return (
      <div>

        <div className="form-group col-md-6" >
          <label>Location:</label>
          <FormControl className="col-md-5" ref={this.locationTxt} type="text" defaultValue="บางซื่อ" />
          <button type="button" className="btn btn-primary" onClick={this.onFindStoreClick.bind(this)}>find</button>
        </div>
        {
          (this.state.showNearByStore) &&
          (
            <div>
              <h2> ร้านอาหารใกล้เคียง</h2>
              <h3>{JSON.stringify( this.state.nearbyStore)}</h3>

            </div>

          )
        }

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
      </div >
    );
  }
}

export default (observer(Body));
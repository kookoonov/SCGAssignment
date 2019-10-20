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
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location[0], location[1]}&radius=1000&types=food&key=AIzaSyBmz2RLwsvdp0nhjBWUJ4abf27Nrn2ksCs`
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location[0], location[1]}&radius=1000&type=restaurant&keyword=&key=AIzaSyBcqAN0A9zmWYC-tGYn8ggt2G9Nwx-cC-g`
    console.log('url ------------->>', url);
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const nearPlace = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      // crossdomain: true
      // headers: { 'Content-Type': 'application/json' },
    });

    // request('GET', url, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     // 'Content-Type': 'none'
    //   }
    // }).done(function (res) {
    //   console.log(res.getBody());
    // });

    // var express = require('express')
    // var cors = require('cors')
    // var app = express()

    // var corsOptions = {
    //   origin: 'http://localhost:3000',
    //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    // }

    // app.get(url, cors(), function (req, res, next) {
    //   res.json({ msg: 'This is CORS-enabled for a Single Route' })
    // })

    // app.listen(80, function () {
    //   console.log('CORS-enabled web server listening on port 80')
    // })
    // console.log('location ------------->>', location);
    // console.log('nearPlace ------------->>', nearPlace);


  }

  render() {
    return (
      <div>

        <div className="form-group col-md-6" >
          <label>Location:</label>
          <FormControl className="col-md-5" ref={this.locationTxt} type="text" defaultValue="บางซื่อ" />
          <button type="button" className="btn btn-primary" onClick={this.onFindStoreClick.bind(this)}>find</button>
        </div>


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
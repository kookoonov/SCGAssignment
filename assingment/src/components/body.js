import React from 'react';
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { geocodeByAddress } from 'react-places-autocomplete';
import { FormControl } from 'react-bootstrap';
import CV from './cv'
import axios from 'axios';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showXYZ: false,
      showRes: false,
      showLine: false,
      showCV: false,
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

  async onFindClick(len) {
    const url = `http://localhost:3001/xyz/${len}`
    const res = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    const result = res.data.data;
    this.setState({ result, showResult: true });
  }

  onFindStoreClick() {
    this.updateGoogleMap(this.locationTxt.current.value);
  }

  async updateGoogleMap(locationText) {
    const results = await geocodeByAddress(locationText);
    const geoLocation = results[0].geometry.location;
    const location = [geoLocation.lat(), geoLocation.lng()];
    const url = `http://localhost:3001/nearby/${location[0]}, ${location[1]}`
    const nearPlace = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (nearPlace && nearPlace.data && nearPlace.data.data && nearPlace.data.data.results) {
      this.setState({ nearbyStore: nearPlace.data.data.results, showNearByStore: true })
    }
  }

  showXYZ = false;
  showRes = false;
  showLine = false;
  showCV = false;
  showSection(section) {

    switch (section) {
      case 'XYZ':
        this.showXYZ = !this.showXYZ;
        this.showRes = false;
        this.showLine = false;
        this.showCV = false;
        this.setState({
          showXYZ: this.showXYZ,
          showRes: false,
          showLine: false,
          showCV: false,
        });
        break;
      case 'Res':
        this.showRes = !this.showRes;
        this.showXYZ = false;
        this.showLine = false;
        this.showCV = false;
        this.setState({
          showRes: this.showRes,
          showXYZ: false,
          showLine: false,
          showCV: false,
        });
        break;
      case 'Line':
        this.showLine = !this.showLine;
        this.showXYZ = false;
        this.showRes = false;
        this.showCV = false;
        this.setState({
          showLine: this.showLine,
          showXYZ: false,
          showRes: false,
          showCV: false,
        });
        break;
      case 'CV':
        this.showCV = !this.showCV;
        this.showXYZ = false;
        this.showRes = false;
        this.showLine = false;
        this.setState({
          showCV: this.showCV,
          showXYZ: false,
          showRes: false,
          showLine: false,
        });
        break;
      default:
        this.showXYZ = false;
        this.showRes = false;
        this.showLine = false;
        this.showCV = false;
        this.setState({
          showCV: false,
          showXYZ: false,
          showRes: false,
          showLine: false,
        });
        break;
    }
  }

  render() {
    console.log('this.state.showRes ------------->>', this.state.showRes);
    return (

      <div className="container col-md-12 ">
        <button type="button" className="btn btn-primary col-md-2" onClick={this.showSection.bind(this, 'XYZ')}>Find X, Y, Z</button>
        <button type="button" className="btn btn-secondary col-md-2" onClick={this.showSection.bind(this, 'Res')}>Find Restaurants</button>
        <button type="button" className="btn btn-success col-md-2" onClick={this.showSection.bind(this, 'Line')}>Line messaging</button>
        <button type="button" className="btn btn-info col-md-2" onClick={this.showSection.bind(this, 'CV')}>CV</button>

        {
          (this.state.showRes) &&
          (
            <div>
              {
                <div className="form-group col-md-6" >
                  <label>Location:</label>
                  <FormControl className="col-md-5" ref={this.locationTxt} type="text" defaultValue="บางซื่อ" />
                  <button type="button" className="btn btn-primary" onClick={this.onFindStoreClick.bind(this)}>find</button>
                </div>
              }
              {
                (this.state.showNearByStore) &&
                (
                  <div>
                    <h2> ร้านอาหารใกล้เคียง</h2>
                    <h3>{JSON.stringify(this.state.nearbyStore)}</h3>

                  </div>

                )
              }
            </div>
          )
        }
        {(this.state.showXYZ) && (
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
        )}
        {(this.state.showCV) && (
          <div>
             <CV />
          </div>
        )}
      </div >
    );
  }
}

export default (observer(Body));
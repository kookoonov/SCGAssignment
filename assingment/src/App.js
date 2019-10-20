import React from 'react';
import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'
import { observer } from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default (observer(App));
import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';
import AboutUs from './AboutUs';
import Home from './Home';
import Jokes from './Jokes';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    console.log('constructor runs');
  }

  componentDidMount() {
    console.log('componentDidMount runs');
  }


  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Switch>
            <Route
              exact path="/">{isAuthenticated ? <Profile /> : <Profile />}
            </Route>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/Jokes">
              <Jokes />
            </Route>
            <Route exact path="/AboutUs">
              <AboutUs />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);


import React , {Component} from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Alerts from './layout/Alerts';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';
import Home from './pages/Home';
import './App.css'

if(localStorage.token){
    setAuthToken(localStorage.token);
  }


class App extends Component {
    
    render () {
        return (
          <Provider store={ store }>
          <Router>
          <>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path = '/' component={Home} />
                <Route exact path = '/register' component={Register} />
                <Route exact path = '/login' component={Login} />
              </Switch>
            </div>
            <Footer />
          </>
          </Router>
          </Provider>
        )
      }
};

export default App;
import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Main from './components/Main';
import Default from './components/Default';
import ProductList from './components/Products/ProductList';
import SignIn from './components/User/SignIn';
import Cart from './components/Cart/Cart';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/cart" component={Cart} />
          <Route path="/products/:category/:type?" component={ProductList} />
          <Route component={Default}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

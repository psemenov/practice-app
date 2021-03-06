import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Main from './components/Main';
import Default from './components/Default';
import ProductList from './components/Products/ProductList';
import Account from './components/User/Account';
import Cart from './components/Cart/Cart';
import Details from './components/Products/Details';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/account" component={Account} />
          <Route path="/cart" component={Cart} />
          <Route path="/products/:category/:type?" component={ProductList} />
          <Route path="/details/:category/:id" component={Details} />
          <Route component={Default}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;

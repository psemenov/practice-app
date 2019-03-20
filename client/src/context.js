import React from 'react'
import {
  storeProducts, 
  typeTitles, 
  categoryTitles, 
  setProductInStorage, 
  getFromStorage,
  removeProductFromStorage,
  setUserInStorage
} from './data';

const apiPath = "http://localhost:5000";

export const context = React.createContext();

class MainProvider extends React.Component {
	state = {
    products: [],
    cart: [],
    cartTotal: 0,
    token: ''
  }

  componentDidMount() {
    const obj = getFromStorage('user_token');
    if(obj) {
      const {token} = obj;
      if (token) {
        fetch(apiPath + '/api/account/verify?token=' + token) 
          .then(res => res.json())
          .then(json => {
            if(json.success) {
              this.setState({
                token: token
              });
            }
          });
      }
    }
    this.setProducts();
    this.getCart();
  }

    someMethod() {
      const tok = this.state.token;
      this.setState(() => {
      return {token: tok}
    });    }

  setProducts = () => {
    let tempProducts = [];
    fetch(apiPath + '/api/product/get_all') 
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          json.products.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
          });
          this.setState(() => {
            return {products: tempProducts}
          });
       }
     });
  }

  getCart = () => {
    let tempProducts = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        const singleItem = getFromStorage(localStorage.key(i));
        tempProducts = [...tempProducts, singleItem];
    }
    this.setState(() => {
      return {cart: tempProducts}
    }, () => {
      this.addTotals();
      });    
  }

  getItem = id => {
    const product = this.state.products.find(item => item._id === id);
    return product;
  }

  getByCategoryAndType(category, type) {
    let tempProducts = [];
    this.products.forEach(item => {
      const singleItem = {...item};
      if (singleItem.category === category) {
        singleItem.type.forEach(itemType => {
          if(itemType === type || type === "none") tempProducts = [...tempProducts, singleItem];
        });
      }
    });
    return tempProducts;
  }

  getById(id) {
    let tempProduct = {};
    const BreakException = {};

    this.products.forEach(item => {
      if (item._id === id) {
        tempProduct = JSON.parse(JSON.stringify(item));
      }
    });
    return tempProduct;
  }

  getTitle(category, type) {
    //console.log(category + " " + type);
    let title;
    let match = false;
    categoryTitles.forEach(item => {
      if(item.category === category) {
        if(category === "accessories" && type !== "none") title = "";
        else title = item.title;
        match = true;
      }
    });
    if(!match) title = "unknown";
    
    if(title !== "unknown") {
      match = false;
      if(type !== "none"){
        typeTitles.forEach(item => {
          if(item.type === type) {
            title = item.title + " " + title;
            match = true;
          }
        });
        if(!match) title = "unknown";
      }
    }
    return title;
  }

  addToCart = id => {
    // localStorage.clear();
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    if(getFromStorage(id) !== null) {
      this.increment(id);
    } else {
      setProductInStorage(id, tempProducts[index]);
      this.setState(() => {
        return { products: tempProducts, cart: [...this.state.cart, getFromStorage(id)]};
      }, () => {
      this.addTotals();
      });
    }
  }

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if(product.amount === product.ordered) return;
    product.ordered = product.ordered + 1;

    const tempProduct = getFromStorage(id);
    tempProduct.ordered++;
    setProductInStorage(id, tempProduct);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, () => {
      this.addTotals();
      }
    );
  }

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item._id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if(product.ordered === 1) return; 
    product.ordered = product.ordered - 1;

    const tempProduct = getFromStorage(id);
    tempProduct.ordered--;
    setProductInStorage(id, tempProduct);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, () => {
      this.addTotals();
      }
    );  
  }

   removeItem = id => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item._id !== id);
    removeProductFromStorage(id);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, () => {
      this.addTotals();
      }
    );
  }

  // clearCart = () => {
  //   this.setState(() => {
  //     return {cart: []}
  //   }, () => {
  //     this.setProducts();
  //     this.addTotals();
  //   });
  // }

 addTotals = () => {
    let total = 0;
    this.state.cart.map(item => {total += item.price * item.ordered});
    this.setState(() => {
      return ({
        cartTotal: total
      });
    }); 
 }

  render () {
    return (
      <context.Provider value={{
        ...this.state,
        getByCategoryAndType: this.getByCategoryAndType,
        getById: this.getById,
        getTitle: this.getTitle,
        addToCart: this.addToCart,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        someMethod: this.someMethod
      }}>
        {this.props.children}
      </context.Provider>
    );

  }
}


const MainConsumer = context.Consumer;

export {MainProvider, MainConsumer};


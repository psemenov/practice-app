import React from 'react'
import {
  storeProducts, 
  typeTitles, 
  categoryTitles, 
  setProductInStorage, 
  getProductFromStorage,
  removeProductFromStorage
} from './data';

export const ProductContext = React.createContext();

class ProductProvider extends React.Component {
	state = {
    products: [],
    cart: []
  }

  componentDidMount() {
    this.setProducts();
    this.getCart();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return {products: tempProducts}
    });
  }

  getCart = () => {
    let tempProducts = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        const singleItem = getProductFromStorage(localStorage.key(i));
        tempProducts = [...tempProducts, singleItem];
    }
    this.setState(() => {
      return {cart: tempProducts}
    });    
  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  }

  getByCategoryAndType(category, type) {
    let tempProducts = [];
    storeProducts.forEach(item => {
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
    storeProducts.forEach(item => {
      if (item.id === id) {
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
    if(getProductFromStorage(id) !== null) {
      this.increment(id);
    } else {
      setProductInStorage(id, tempProducts[index]);
      this.setState(() => {
        return { products: tempProducts, cart: [...this.state.cart, getProductFromStorage(id)]};
      });
    }
  }

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if(product.amount === product.ordered) return;
    product.ordered = product.ordered + 1;

    const tempProduct = getProductFromStorage(id);
    tempProduct.ordered++;
    setProductInStorage(id, tempProduct);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    });
  }

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if(product.ordered === 1) return; 
    product.ordered = product.ordered - 1;

    const tempProduct = getProductFromStorage(id);
    tempProduct.ordered--;
    setProductInStorage(id, tempProduct);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    });  
  }

   removeItem = id => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    removeProductFromStorage(id);

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }
    // , () => {
    //   this.addTotals();
    // }
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

//  addTotals = () => {
    // let subTotal = 0;
    // this.state.cart.map(item => {subTotal += item.total});
    // const tempTax = subTotal * 0.1;
    // const tax = parseFloat(tempTax.toFixed(2));
    // const total = subTotal + tax;
    // this.setState(() => {
    //   return ({
    //     cartSubTotal: subTotal,
    //     cartTax: tax,
    //     cartTotal: total
    //   });
    // }); 
//  }

  render () {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        getByCategoryAndType: this.getByCategoryAndType,
        getById: this.getById,
        getTitle: this.getTitle,
        addToCart: this.addToCart,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );

  }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};


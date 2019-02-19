import React from 'react'
import {storeProducts, typeTitles, categoryTitles} from './data';

export const ProductContext = React.createContext();

class ProductProvider extends React.Component {
	state = {
    products: []
  }

  componentDidMount() {
    this.setProducts();
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

  render () {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        getByCategoryAndType: this.getByCategoryAndType,
        getTitle: this.getTitle
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );

  }
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};


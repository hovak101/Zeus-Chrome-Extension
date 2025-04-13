class Parser {
    parseProduct(sellerProducts) {
        if (sellerProducts.seller === "Walmart") {
            return this.getBestWalmartProduct(sellerProducts.products);
        } else if (sellerProducts.seller === "Ebay") {
            return this.getBestEbayProduct(sellerProducts.products);
        } else if (sellerProducts.seller === "Target") {
            return this.getBestTargetProduct(sellerProducts.products);
        } else if (sellerProducts.seller === "Amazon") {
            return this.getBestAmazonProduct(sellerProducts.products);
        }
    }

    getFirstProduct(products) {
        if (products.length !== 0) {
            return products[0];
        } else {
            return null;
        }
    }

    getBestEbayProduct(products) {
      let product; 
      
      for(let i = 3; i >= 0; i--) {
        if (products.length >= i) {
          product = products[i];
          product.seller = "Ebay";
          return product;
        }
      }
      return null; 
    }
  
    getBestTargetProduct(products) {
      const product = this.getFirstProduct(products);
      product.seller = "Target";
      return product;
    }
    
    getBestAmazonProduct(products) {
      const product = this.getFirstProduct(products);
      product.seller = "Amazon";
      return product;
    }
  
    getBestWalmartProduct(products) {
      const product = this.getFirstProduct(products);
      product.seller = "Walmart";
      return product;
    }
  }
  
  export { Parser };
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
        } else if (sellerProducts.seller === "Best Buy"){
            return this.getBestBestBuyProduct(sellerProducts.products);
        } else {
          return null; 
        }
    }

    getFirstProduct(products) {
        if (products.length !== 0) {
            return products[0];
        } else {
            return null;
        }
    }

    getFirstNonSponsored(products) {
      for(let i = 0; i < products.length; i++) {
        if (!products[i].isSponsored) {
          return products[i];
        }
      }
      return null; 
    }

    getBestEbayProduct(products) {
      let product; 
      
      for(let i = 3; i >= 0; i--) {
        if (products.length > i) {
          product = products[i];
          product.seller = "Ebay";
          return product;
        }
      }
      return null; 
    }
  
    getBestTargetProduct(products) {
      let product = this.getFirstNonSponsored(products);

      if (product) {
        product.seller = "Target";
        product.freeReturns = true;
        product.shippingCost = 0.00;
        return product; 
      }
      return null; 
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

    getBestBestBuyProduct(products) {
      let product = this.getFirstNonSponsored(products);
      
      if (product) {
        product.seller = "Best Buy";
        product.freeReturns = true;
        product.shippingCost = 0.00;
        return product; 
      }
      return null; 
    }
  }
  
  export { Parser };
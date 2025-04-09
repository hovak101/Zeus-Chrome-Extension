import { useState, useEffect } from 'react';
import Title from './components/Title.jsx';
import Product from './components/Product.jsx';

function App() {
  const [productInfo, setProductInfo] = useState({ title: '', products: [], status_code: 2});

  async function fetchProductInfo() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.runtime.sendMessage({type: "requestData", tab_id: tabs[0].id}, (response) => {
          setProductInfo(response);
      });
    });
  }

  useEffect(() => {
    fetchProductInfo();

    chrome.storage.onChanged.addListener(() => {
      fetchProductInfo();
    });
  }, []);

  const productList = productInfo.products?.map((product) => (
    <Product className="tableRow" url={product.url} seller={product.seller} 
    price={product.price} shippingCost={product.shippingCost}
    freeReturns={product.freeReturns}/>
  ));

  return (
    <div className="content">
      <Title message={productInfo.title} className="title"/>
      <div className="productList mx-2">
        <div className="columnNames tableRow">
          <div className="col-a">Seller</div>
          <div className="col-b">Total Cost</div>
          <div className="col-c">Returns?</div>
        </div>
        {productList}
      </div>
    </div>
  )
}

export default App;

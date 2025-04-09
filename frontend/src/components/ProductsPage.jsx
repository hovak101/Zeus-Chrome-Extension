import Title from './Title.jsx';
import Product from './Product.jsx';

function ProductsPage(props) {
    const productList = props.products?.map((product) => (
        <Product className="tableRow" url={product.url} seller={product.seller} 
        price={product.price} shippingCost={product.shippingCost}
        freeReturns={product.freeReturns}/>
    ));
    return (
        <div className="content">
          <Title message={props.title} className="title"/>
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

export default ProductsPage;
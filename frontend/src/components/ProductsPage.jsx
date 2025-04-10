import Title from './Title.jsx';
import ProductsTable from './ProductsTable.jsx';

function ProductsPage(props) {
    return (
        <div className="flex flex-col content text-base gap-2.5">
          <Title message={props.title} className="title"/>
          <ProductsTable products={props.products}/>
        </div>
    )
}

export default ProductsPage;
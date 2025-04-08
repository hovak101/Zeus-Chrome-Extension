import sellerIcon from '../assets/amazon.png';

function Product(props) {
    let data;
    if (props.freeReturns) {
        data="Free Returns!";
    }
    else {
        data="No Free Returns!";
    }
    return (
        <div className="product tableRow">
            <div className="col-a product-link-icon">
                <img src={sellerIcon}></img>
                <a href={props.url}>{props.seller}</a>
            </div>
            <div className="col-b">{props.price + props.shippingCost}</div>
            <div className="col-c">{data}</div>
        </div>
    )
}

export default Product;
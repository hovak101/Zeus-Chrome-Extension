import amazonIcon from '../assets/amazon.png';
import ebayIcon from '../assets/ebay.png';
import walmartIcon from '../assets/walmart.png';
import targetIcon from '../assets/target.png';

function Product(props) {
    let sellerIcon = targetIcon;
    if (props.seller === "Amazon") {
        sellerIcon = amazonIcon;
    } else if (props.seller === "Ebay") {
        sellerIcon = ebayIcon;
    } else if (props.seller === "Walmart") {
        sellerIcon = walmartIcon;
    }

    let data = props.freeReturns ? "Free Returns!" : "No Free Returns!";

    const handleClick = (e) => {
        e.preventDefault();
        if (chrome && chrome.tabs) {
            chrome.tabs.create({ url: props.url });
        } else {
            window.open(props.url, "_blank"); // fallback for non-extension environments
        }
    };

    return (
        <div className="product tableRow">
            <a href={props.url} onClick={handleClick} className="col-a product-link-icon">
                <img className="pr-3" src={sellerIcon} />
                <div>{props.seller}</div>
            </a>
            <div className="col-b">${(props.price + props.shippingCost).toFixed(2)}</div>
            <div className="col-c">{data}</div>
        </div>
    );
}

export default Product;
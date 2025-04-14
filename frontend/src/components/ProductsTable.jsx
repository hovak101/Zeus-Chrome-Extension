import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table.tsx";

import amazonIcon from '../assets/amazon.png';
import ebayIcon from '../assets/ebay.png';
import walmartIcon from '../assets/walmart.png';
import targetIcon from '../assets/target.png';
import bestBuyIcon from '../assets/best-buy.svg';

function getSellerLogo(seller) {
  switch (seller.toLowerCase()) {
    case "amazon":
      return amazonIcon;
    case "ebay":
      return ebayIcon;
    case "walmart":
      return walmartIcon;
    case "best buy":
      return bestBuyIcon;
    default:
      return targetIcon;
  }
}

function ProductsTable(props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent dark:hover:bg-transparent !cursor-default">
          <TableHead className="w-[100px]">Seller</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Returns</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.products.map((product) => (
          <TableRow onClick={() => window.open(product.url, '_blank')} key={product.seller}>
            <TableCell className="flex flex-row font-medium gap-x-2">
              <img
                src={getSellerLogo(product.seller)}
                className="w-6 h-6 object-contain"
              />
              {product.seller}
              </TableCell>
            <TableCell>${(product.shippingCost + product.price).toFixed(2)}</TableCell>
            <TableCell className="text-right">{product.freeReturns ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductsTable;
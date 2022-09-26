import React from "react";
import { formatCurrency } from "./currency";

/**
 *
 * @param {item} object // pass am object named item to get sell_price & regular price
 * @returns PriceCalculation
 */
const PriceCalculation = ({ item, style }) => {
  const { regular_price, sell_price } = item;
  
  const selling_price =
    typeof regular_price !== "undefined" && regular_price !== null
      ? regular_price
      : 0;
  const default_price =
    sell_price !== 0 && sell_price !== null && sell_price !== ""
      ? sell_price
      : selling_price;
  const offer_price =
    sell_price !== 0 && sell_price !== null && sell_price !== ""
      ? sell_price
      : 0;
  const discount_percent = parseInt(
    ((selling_price - offer_price) * 100) / selling_price
  );

  return (
    <div className="price_area">
      <p className="active_price" style={style}>
        {formatCurrency(default_price)}
      </p>

      {offer_price !== 0 &&
        offer_price !== null &&
        !Number.isNaN(discount_percent) && (
          <p className="inactive_price">
            <del>{formatCurrency(selling_price)} </del>
            &nbsp;
            <span className="discount_percent">{discount_percent}%</span>
          </p>
        )}
    </div>
  );
};

export default PriceCalculation;

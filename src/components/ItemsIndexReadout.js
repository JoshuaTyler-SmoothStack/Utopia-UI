import React from 'react';

const ItemsIndexReadout = (props) => {
  // @PROP: page - num
  // @PROP: itemsPerPage - num
  // @PROP: itemsTotal - num

  let { page, itemsPerPage, itemsTotal  } = props;
  page = page || 1;
  itemsPerPage = itemsPerPage || 10;
  itemsTotal = itemsTotal || 0;

  const itemsStart = Math.max((page - 1) * itemsPerPage, 0) || 1;
  const itemsEnd = Math.min(page * itemsPerPage, itemsTotal) || 0;

  return ( 
    <div className={"list-group " + (props.className || "")} style={props.style}>
      <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
        {itemsTotal === 1 && itemsStart + " of " + itemsTotal + " total"}
        {itemsTotal !== 1 && itemsStart + " to " + itemsEnd + " of " + itemsTotal + " total"}
      </div>
    </div>
  );
}
export default ItemsIndexReadout;
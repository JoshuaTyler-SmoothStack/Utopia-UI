import React from 'react';
import FlexRow from "./FlexRow";

const Pagination = (props) => {
  // @PROP: currentPage - num
  // @PROP: totalPages - num
  // @PROP: onSelectPage - f()

  let { currentPage, totalPages } = props;
  currentPage = props.currentPage || 1;
  totalPages = props.totalPages || 1;

  const paginationItems = {
    next: currentPage < totalPages,
    previous: currentPage > 1,
    selected: currentPage,
    pos1: 1,
    pos2: currentPage === 1 ? 2 : currentPage,
    pos3: totalPages,
    isPos2Disabled: false,
    isPos3Disabled: false,
  };

  if(totalPages < 2) {
    paginationItems.previous = false;
    paginationItems.next = false;
    paginationItems.isPos2Disabled = true;
    paginationItems.isPos3Disabled = true;
  } else if(totalPages < 3) {
    paginationItems.isPos2Disabled = true;
  }

  if(currentPage === totalPages) {
    paginationItems.next = false;
    paginationItems.pos2 = currentPage - 1;
  }

  const previous = 
  <li className={"page-item" + (paginationItems.previous ? "" : " disabled")}>
    <button className={"page-link"} aria-label="Previous"
      onClick={paginationItems.previous ? () => props.onSelectPage(paginationItems.selected - 1) : () => {}}
    >
      <span aria-hidden="true">«</span>
    </button>
  </li>

  const pos1 = 
  <li className={"page-item" + (paginationItems.selected === paginationItems.pos1 ? " active" : "")}>
    <button className={"page-link"} onClick={paginationItems.selected === paginationItems.pos1 ? () => {} : () => props.onSelectPage(paginationItems.pos1)}>
      {paginationItems.pos1}
    </button>
  </li>

  const pos2 = 
  <li className={"page-item" + (paginationItems.selected === paginationItems.pos2 ? " active" : "")}>
    <button className="page-link" onClick={paginationItems.selected === paginationItems.pos2 ? () => {} : () => props.onSelectPage(paginationItems.pos2)}>
      {paginationItems.pos2}
    </button>
  </li>

  const pos3 = 
  <li className={"page-item" + (paginationItems.selected === paginationItems.pos3 ? " active" : "")}>
    <button className="page-link" onClick={paginationItems.selected === paginationItems.pos3 ? () => {} : () => props.onSelectPage(paginationItems.pos3)}>
      {paginationItems.pos3}
    </button>
  </li>

  const next = 
  <li className={"page-item" + (paginationItems.next ? "" : " disabled")}>
    <button className="page-link" aria-label="Previous"
      onClick={paginationItems.next ? () => props.onSelectPage(paginationItems.selected + 1) : () => {}}
    >
      <span aria-hidden="true">»</span>
    </button>
  </li>

  return (
    <ul className={"pagination " + (props.className || "")} style={props.style}>
      {previous}
      {pos1}
      {!paginationItems.isPos2Disabled && pos2}
      {!paginationItems.isPos3Disabled && pos3}
      {next}
    </ul>
  );
}
export default Pagination;
import React, { Component } from 'react';
import FlexRow from "./FlexRow";

class Pagination extends Component {
    constructor(props) {
    super(props);
    // @PROP: results - obj{}
    // @PROP: onSetNumberOfResults - f()

    this.state = { 
      isDropDownActive: false
    }
  }

  render() { 
    let { isActive, resultsPage, resultsPerPage, resultsTotal  } = this.props;
    const { isDropdownActive } = this.state;
  
    resultsPage = resultsPage || 1;
    resultsPerPage = resultsPerPage || 10;
    resultsTotal = resultsTotal || 0;
    const resultsStart = Math.max((resultsPage - 1) * resultsPerPage, 0) || 1;

    const resultsEnd = Math.min(resultsPage * resultsPerPage, resultsTotal) || 0;

    return ( 
      <div className={"col-12 p-2 " + this.props.className || ""} style={this.props.style}>
        <FlexRow wrap={"no-wrap"}>
          
          {/* # of Results Selection */}
          <div className="dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button"
              onClick={() => this.setState({isDropdownActive: !isDropdownActive})}
              onBlur={() => setTimeout(() => this.setState({isDropdownActive: false}), 100)}
            >
              {resultsPerPage + " results"}
            </button>
            <ul className={"dropdown-menu" + (isDropdownActive ? " show" : "")}>
                <li><button className="dropdown-item" type="button" onClick={() => {this.props.onSetNumberOfResults(3); this.setState({isDropdownActive: false});}}>3</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {this.props.onSetNumberOfResults(25); this.setState({isDropdownActive: false});}}>25</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {this.props.onSetNumberOfResults(50); this.setState({isDropdownActive: false});}}>50</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => {this.props.onSetNumberOfResults(100); this.setState({isDropdownActive: false});}}>100</button></li>
              </ul>
          </div>

          {/* # of Results Display */}
          <div className="list-group ml-1">
            <div className="list-group-item" style={{fontSize: "0.85rem", padding:"0.5rem"}}>
              {resultsTotal === 1 && resultsStart + " of " + resultsTotal + " total"}
              {resultsTotal !== 1 && resultsStart + " to " + resultsEnd + " of " + resultsTotal + " total"}
            </div>
          </div>

          {/* Results Pagination */}
          {isActive &&
          <div className="ml-2">
            {this.handleRenderPagination(resultsPerPage, resultsPage, resultsTotal)}
          </div>}
        </FlexRow>
      </div>
    );
  }

  handleRenderPagination = (resultsPerPage, resultsPage, resultsTotal) => {
    const totalPages = Math.ceil(resultsTotal / Math.max(resultsPerPage, 1));
  
    // 1st Page - 1, 2, last with previous disabled
    const paginationItems = {
      next: resultsPage < totalPages,
      previous: resultsPage > 1,
      selected: resultsPage,
      pos1: 1,
      pos2: resultsPage === 1 ? 2 : resultsPage,
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
  
    if(resultsPage === totalPages) {
      paginationItems.next = false;
      paginationItems.pos2 = resultsPage - 1;
    }
  
    const previous = 
    <li className={"page-item" + (paginationItems.previous ? "" : " disabled")}>
      <button className={"page-link"} aria-label="Previous"
        onClick={paginationItems.previous ? () => this.props.onSetPageOfResults(paginationItems.selected - 1) : () => {}}
      >
        <span aria-hidden="true">«</span>
      </button>
    </li>
  
    const pos1 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos1 ? " active" : "")}>
      <button className={"page-link"} onClick={paginationItems.selected === paginationItems.pos1 ? () => {} : () => this.props.onSetPageOfResults(paginationItems.pos1)}>
        {paginationItems.pos1}
      </button>
    </li>
  
    const pos2 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos2 ? " active" : "")}>
      <button className="page-link" onClick={paginationItems.selected === paginationItems.pos2 ? () => {} : () => this.props.onSetPageOfResults(paginationItems.pos2)}>
        {paginationItems.pos2}
      </button>
    </li>
  
    const pos3 = 
    <li className={"page-item" + (paginationItems.selected === paginationItems.pos3 ? " active" : "")}>
      <button className="page-link" onClick={paginationItems.selected === paginationItems.pos3 ? () => {} : () => this.props.onSetPageOfResults(paginationItems.pos3)}>
        {paginationItems.pos3}
      </button>
    </li>
  
    const next = 
    <li className={"page-item" + (paginationItems.next ? "" : " disabled")}>
      <button className="page-link" aria-label="Previous"
        onClick={paginationItems.next ? () => this.props.onSetPageOfResults(paginationItems.selected + 1) : () => {}}
      >
        <span aria-hidden="true">»</span>
      </button>
    </li>
  
    return (
      <ul className="pagination m-0">
        {previous}
        {pos1}
        {!paginationItems.isPos2Disabled && pos2}
        {!paginationItems.isPos3Disabled && pos3}
        {next}
      </ul>
    );
  }
}
export default Pagination;
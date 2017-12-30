import React, { Component } from 'react';

class searchBar extends Component {
  render() {
    return (
      <div>
        <form className="form-inline my-2 my-lg-0 ">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    );
  }
}


export default searchBar;

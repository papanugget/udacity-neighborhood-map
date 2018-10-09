import React, { Component } from 'react'

class SearchBar extends Component {

  render() {
      return (
        <div className="locationsFilter" role="application">
          <input
          type="text"
          autoFocus
          id="query-Filter"
          placeholder="Search..."
          aria-label="Locations filter"
        // value={this.props.query}
          onChange={e => console.log(e.target.value)}
          />
        </div>
      );
    }
}

export default SearchBar;
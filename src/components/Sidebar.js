import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

class Sidebar extends Component {
    // constructor(props) {
    //     super(props);
    // }
    
    componentWillReceiveProps(nextProps) {
        let markerLocs;
        // console.log(nextProps.locations);
        markerLocs = nextProps.locations;
        this.buildRestroomList(markerLocs);
    }
    buildRestroomList(data) {
        console.log(data);
        data.features.map((restroom, index) => {
            let currentRestroom = restroom;
            let restroomProp = currentRestroom.properties;
            // select locations container in sidebar and append div / item for each restroom
            let locations = document.getElementById('locations');
            let location = `<div class='item' id=listing-${index}>
                                <a href='#' class='title' data-value=${index}>${restroomProp.name}</a>
                                <div class='details'>${restroomProp.address}<br>${restroomProp.year_round ? 'Open Year Round' : ''} ${restroomProp.handicap_a11y ? 'Handicap Accessible' : ''}<br>
                                </div>   
                            </div><br>`;
            locations.innerHTML += location;
        })
    }
    render() {
        return (
            <Menu>
                <div className="locations" id="locations">
                    <h2 className="title-large">Public Restrooms</h2>
                    <form id="search-form">
                        <input 
                            // value={this.state.term}
                            id="restroom-search" 
                            type="text" 
                            // onChange={ (e) =>  {
                            //     this.setState({query: e.target.value})
                            // }}
                        />
                        <br></br>
                        {/* You are looking for: {this.nextProps.query} */}
                        <br></br>
                        <label htmlFor="handicap">Handicap Accessible </label>
                        <input type="checkbox" name="handicap" id="handicap"/>
                        <br></br>
                        <label htmlFor="year-round">Open Year Round</label>
                        <input type="checkbox" name="year-round" id="year-round" />
                    </form>
                </div>
            </Menu>
        )
    }
}

export default Sidebar;
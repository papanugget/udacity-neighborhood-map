import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import SearchBar from './Search';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: null,
            names: null,
            query: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        let markerLocs;
        markerLocs = nextProps.locations;
        this.buildRestroomList(markerLocs);
        this.setState({locations: markerLocs});
        this.filterLocs(markerLocs);
    };
    buildRestroomList(data) {
        // console.log(data);
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
        });
    };
    // push restroom names to array
    filterLocs(data) {
        let names = [];
        data.features.map(restroom => {
            let name = restroom.properties.name;
            names.push(name);
        })
        this.setState({names: names})
    }

    updateQuery = query => {
        this.setState({query})
        this.state.names.map(name => name.setVisible(true))
        let filterNames;
        let notVisibleMarkers;

        if(query) {
            console.log(this.state.query);
            // filterNames = this.state.names.filter(name => test(name))
            // this.setState({ names: filterNames })
        }
    }
    render() {
        return (
            <div>
                <Menu>
                    <div className="locations" id="locations">
                        <h2 className="title-large">Public Restrooms</h2>
                            <fieldset className='with-icon' >
                                <span className='icon search'></span>
                                <div>
                                    <SearchBar updateQuery={this.updateQuery}/>
                                </div>
                            </fieldset>
                    </div>
                </Menu>
            </div>
            
        )
    }
}

export default Sidebar;
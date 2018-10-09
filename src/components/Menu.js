import React, { Component } from "react";
import SearchBar from './Search';

class Menu extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.buildRestroomList(nextProps);
    }
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
            locations.addEventListener('click', e => {
                if(e.target.classList == 'title') {
                    let clickedRestroom = restroomLocs.features
                }
            })
        });
    };

    
    render() {
        return (
            <div className="menu">
                <h2 className="title-large">Manhattan Public Restrooms</h2>
                {/* <fieldset>
                    <input id="restroom-search" type="text" placeholder="Search..." onChange={e => console.log(e.target.value)}/>
                </fieldset> */}
                <SearchBar />
                <div className="locations" id="locations">
                    
                    {/* {this.props.buildRestroomList()} */}
                </div>
            </div>
        )
    }
}

export default Menu;
// let locationsList = this.props.locations;
// export default ({ close }) => (
//   <div className="menu">
//     <h2 className="title-large">Manhattan Public Restrooms</h2>
//     {/* <fieldset>
//         <input id="restroom-search" type="text" placeholder="Search..." onChange={e => console.log(e.target.value)}/>
//     </fieldset> */}
//     <SearchBar />
//     <div className="locations" id="locations">
        
//         {this.props.buildRestroomList(locationsList)}
//     </div>
//     {/* <ul className="locations" id="locations">
//       <li onClick={close}>Home</li>
//       <li onClick={close}>Getting Started</li>
//       <li onClick={close}>Component API</li>
//       <li onClick={close}>Use Case - Tooltip</li>
//       <li onClick={close}>Use Case - Modal</li>
//       <li onClick={close}>Use Case - Menu</li>
//       <li onClick={close}>Contributing</li>
//     </ul> */}
//   </div>
// );

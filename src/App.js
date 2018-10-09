import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import BurgerIcon from './components/BurgerIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import SearchBar from './components/Search';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: 'pk.eyJ1IjoicGFwYW51Z2dldCIsImEiOiJjamxsNW12NHUwdHdsM2tuN3YwcmhsOGxmIn0.ihrjyIuDCgAtDNpU4xeSSA',
      lng: -73.985128,
      lat: 40.758939,
      zoom: 12,
      locations: {},
      query: '',
      open: false
    }
  }
    componentDidMount() {
      // get restoom data 
      this.getRestrooms();   
    }
    // get restroom function
    getRestrooms = () => {
      // init Object to pass to request arg
      const myInit = {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      };
      // new request for JSON data from API
      const restroomData = new Request('https://api.myjson.com/bins/d8i44', myInit);
      // init empty var to contain restroomData
      let restroomMarkers;
      // fetch request
      fetch(restroomData)
      // promise return 
      .then( res => {
        // checks for ok status
        if(res.ok) {
          return res.json();
        }
        // error if response not ok 
        throw new Error('No network response.  Please try again later.');
      }).then( res => { 
        // send response data to restroomMarkers obj
        restroomMarkers = res;
        // send data object to state
        this.setState({locations: restroomMarkers});
        this.mapInit(restroomMarkers);
        // console.log(this.state.locations);
        // log any errors
      }).catch( err => console.log('Error: ', err));
    }
    
    // load map after restroom data is retrieved
     mapInit = data => {
      mapboxgl.accessToken = this.state.api_key;
      const { lng, lat, zoom } = this.state;
      // console.log(restroomMarkers);
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/papanugget/cjmmeyf99ddth2rnyoua824ey',
        center: [lng, lat],
        zoom
      });

      // load map
      map.on('load', () => {
        map.addLayer({
          id: 'locations',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: data
          },
          layout: {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true
          }
        });
          // function call with restroomMarkers data
          addMarkers(data);
          buildRestroomList(data);
        });

      // change coordinates displayed when map moves
      map.on('move', () => {
        const { lng, lat } = map.getCenter();
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });

      function addMarkers(data) {
        // iterate over passed in object data
        // eslint-disable-next-line
        data.features.map((marker, index) => {
          // create a div for each object element
          let mapMarker = document.createElement('div');
          // add class marker to each created div
          mapMarker.classList = 'marker';
          // new mapbox marker for each created marker div
          new mapboxgl.Marker(mapMarker, {offset: [0, -20]})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
          // event listner for each map marker
          mapMarker.addEventListener('click', (e) => {
            let activeItem = document.getElementsByClassName('active');
            // select any previous active markers
            e.stopPropagation();
            createPopup(marker);
            flyToMarker(marker);
            if(activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            let restroom = document.getElementById(`listing-${index}`);
            restroom.classList.add('active');
          });
        });
      };

      function createPopup(currentMarker) {
        let current = currentMarker.properties;
        // select any previous popups
        const popups = document.getElementsByClassName('mapboxgl-popup');
        // console.log(popups);
        // remove previous popups from display
        if(popups[0]) {
          popups[0].remove();
        };
        // create popup at selected marker
        // eslint-disable-next-line
        let newPopup = new mapboxgl.Popup({ closeOnClick: false})
          .setLngLat(currentMarker.geometry.coordinates)
          .setHTML(`<h3>${current.name}</h3>
                      <h4>Address: ${current.address}</h4>
                      <div class="details">${current.year_round ? 'Open year round' : ''}</div>
                      <div class="details">${current.handicap_a11y ? '<div id="a11y"></div>' : ''}
            `)
          .addTo(map);
      }

      function flyToMarker(currentMarker) {
        map.flyTo({
          center: currentMarker.geometry.coordinates,
          zoom: 15
        });
      }

      function buildRestroomList(data) {
        // console.log(data);
        // eslint-disable-next-line
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
              let activeItem = document.getElementsByClassName('active');
              if(activeItem[0]) {
                activeItem[0].classList.remove('active');
              }
              // console.log(e.target.classList);
              if(e.target.className === 'title') {
                let clickedRestroom = data.features[e.target.getAttribute('data-value')];
                e.target.parentNode.classList.add('active');
                flyToMarker(clickedRestroom);
                createPopup(clickedRestroom);
              }                                       
            })
        });
      }
    }   
    clearPopup = () => {
      const popups = document.getElementsByClassName('mapboxgl-popup');
      if(popups[0]) {
        popups[0].remove();
      };
    }
    handleToggle = () => {
      this.setState({open: !this.state.open})
      document.querySelector('.burger-menu').classList.toggle('open');
    }
    handleClose = () => this.setState({open: false});

    updateQuery = query => {
      this.setState({query})
      let locations = document.getElementsByClassName('item');
      let mapMarkers = document.getElementsByClassName('marker');
      query = query.toLowerCase();
      // console.log(mapMarkers);
      this.clearPopup();
      for(let i = 0; i < locations.length; i++) {
          if(locations[i].innerText.toLowerCase().indexOf(query) > - 1) {
            locations[i].style.display = "";
            mapMarkers[i].style.display = "";
          } else {
            locations[i].style.display = "none";
            mapMarkers[i].style.display = "none";
          }
      }
    }
  render() {
    // contains lng, lat coordinates for the location layer in upper right
    const { lng, lat, zoom } = this.state;
    const drawerStyle = { 
      'textAlign': 'center'
    };
    return (
      <main>
        <div className="inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>

        <div ref={el => this.mapContainer = el} className="absolute top right left bottom">
        </div>
        <BurgerIcon label="Open Menu" onClick={this.handleToggle} />
        <MuiThemeProvider>
          <Drawer
            docked={false}
            width={'25%'}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            style={drawerStyle}
          >
          <SearchBar updateQuery={this.updateQuery}/>
            <div className="locations" id="locations">
              <h2 className="title-large">Public Restrooms In Manhattan</h2>

            </div>
          </Drawer>
        </MuiThemeProvider>
        
      </main>
    );
  }
}
export default App;

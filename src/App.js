import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: 'pk.eyJ1IjoicGFwYW51Z2dldCIsImEiOiJjamxsNW12NHUwdHdsM2tuN3YwcmhsOGxmIn0.ihrjyIuDCgAtDNpU4xeSSA',
      lng: -73.985128,
      lat: 40.758939,
      zoom: 12,
      data: {}
    }
  }
    componentDidMount() {
      mapboxgl.accessToken = this.state.api_key;
      const { lng, lat, zoom } = this.state;
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/papanugget/cjmmeyf99ddth2rnyoua824ey',
        center: [lng, lat],
        zoom
      });

      // init Object to pass to request arg
      const myInit = {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'

      };

      // init empty var to contain restroomData
      let restroomMarkers;

      // new request for JSON data from API
      const restroomData = new Request('https://api.myjson.com/bins/d8i44', myInit);
      
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
          this.setState({data: restroomMarkers})
          // console.log(this.state.data);
          // log any errors
        }).catch( err => console.log('Error: ', err));

        // load map
        map.on('load', () => {
          map.addLayer({
            id: 'locations',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: restroomMarkers
            },
            layout: {
              'icon-image': 'custom-marker',
              'icon-allow-overlap': true
            }
          });
          // function call with restroomMarkers data
          addMarkers(restroomMarkers);
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
              console.log(e);
              // select any previous active markers
              e.stopPropagation();
              createPopup(marker);
              flyToMarker(marker);
            });
          });
        };

        function createPopup(currentMarker) {
          let current = currentMarker.properties;
          // select any previous popups
          const popups = document.getElementsByClassName('mapboxgl-popup');
          console.log(popups);
          // remove previous popups from display
          if(popups[0]) {
            popups[0].remove();
          };
          // create popup at selected marker
          let newPopup = new mapboxgl.Popup({ closeOnClick: false})
            .setLngLat(currentMarker.geometry.coordinates)
            .setHTML(`<h3>${current.name}</h3>
                        <h4>Address: ${current.address}</h4>
                        <div class="details">${current.year_round ? 'Open year round' : ''}</div>
                        <div class="details">${current.handicap_a11y ? '<div id="a11y"></div>' : ''}
              `)
            .addTo(map);
        };

        function flyToMarker(currentMarker) {
          map.flyTo({
            center: currentMarker.geometry.coordinates,
            zoom: 15
          })
        }
    }

  render() {
    // contains lng, lat coordinates for the location layer in upper right
    const { lng, lat, zoom } = this.state;
    return (
      <main>
        <div className="inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <main ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </main>
    );
  }
}

export default App;

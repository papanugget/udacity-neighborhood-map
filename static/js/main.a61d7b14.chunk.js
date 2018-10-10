(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{195:function(e,t,a){},197:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(52),c=a.n(r),s=(a(84),a(28)),i=a(29),l=a(31),m=a(30),d=a(32),u=a(24),p=a.n(u),g=a(78),v=function(e){var t=e.open,a=Object(g.a)(e,["open"]);return o.a.createElement("div",Object.assign({className:t?"burger-menu open":"burger-menu"},a),o.a.createElement("div",{className:"bar1",key:"b1"}),o.a.createElement("div",{className:"bar2",key:"b2"}),o.a.createElement("div",{className:"bar3",key:"b3"}))},y=a(76),f=a.n(y),h=a(77),b=a.n(h),k=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"locationsFilter",role:"application"},o.a.createElement("input",{type:"text",autoFocus:!0,id:"query-Filter",placeholder:"Search...","aria-label":"Locations filter",onChange:function(t){return e.props.updateQuery(t.target.value)}}))}}]),t}(n.Component),E=(a(195),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).getRestrooms=function(){var e,t={method:"GET",headers:new Headers,mode:"cors",cache:"default"},n=new Request("https://api.myjson.com/bins/1c752k",t);fetch(n).then(function(e){if(e.ok)return e.json();throw new Error("No network response.  Please try again later.")}).then(function(t){e=t,a.setState({locations:e}),a.mapInit(e)}).catch(function(e){return window.alert("Oops!  Something's not right. Please try again later. This was the error: ",e)})},a.mapInit=function(e){p.a.accessToken=a.state.api_key;var t=a.state,n=t.lng,o=t.lat,r=t.zoom,c=new p.a.Map({container:a.mapContainer,style:"mapbox://styles/papanugget/cjmmeyf99ddth2rnyoua824ey",center:[n,o],zoom:r});function s(e){var t=e.properties,a=document.getElementsByClassName("mapboxgl-popup");a[0]&&a[0].remove();new p.a.Popup({closeOnClick:!1}).setLngLat(e.geometry.coordinates).setHTML('<h3 aria-label="restroom info">'.concat(t.name,"</h3>\n                      <h4>Address: ").concat(t.address,'</h4>\n                      <img src="').concat(t.img,'" alt="image of ').concat(t.name,'"/>\n                      ').concat(t.year_round?'<div class="details" aria-label="year round">Open year round</div>':"",'\n                      <div class="details">').concat(t.handicap_a11y?'<div id="a11y" aria-label="handicap accessible"></div>':"","</div>\n            ")).addTo(c)}function i(e){c.flyTo({center:e.geometry.coordinates,zoom:15})}c.on("load",function(){c.addLayer({id:"locations",type:"symbol",source:{type:"geojson",data:e},layout:{"icon-image":"custom-marker","icon-allow-overlap":!0}}),function(e){e.features.map(function(e,t){var a=document.createElement("div");a.classList="marker",new p.a.Marker(a,{offset:[0,-20]}).setLngLat(e.geometry.coordinates).addTo(c),a.addEventListener("click",function(n){var o=document.getElementsByClassName("active"),r=document.getElementsByClassName("marker-active");n.stopPropagation(),s(e),i(e),r[0]&&r[0].classList.replace("marker-active","marker"),"marker-active mapboxgl-marker mapboxgl-marker-anchor-center"===a.classList?a.classList.replace("marker-active","marker"):a.classList.replace("marker","marker-active"),o[0]&&o[0].classList.remove("active");var c=document.getElementById("listing-".concat(t));c.classList.add("active")})})}(e),function(e){e.features.map(function(t,a){var n=t,o=n.properties,r=document.getElementById("locations"),c="<div class='item' id=listing-".concat(a,">\n                                <a href='#' class='title' data-value=").concat(a,">").concat(o.name,'</a>\n                                <img src="').concat(o.img,'" alt="image of ').concat(o.name,'"/>\n                                <div class=\'details\' aria-label="address and ">').concat(o.address,"<br>").concat(o.year_round?"Open Year Round":""," ").concat(o.handicap_a11y?"Handicap Accessible":"","<br>\n                                </div>   \n                            </div><br>");r.innerHTML+=c,r.addEventListener("click",function(t){var a=document.getElementsByClassName("active");a[0]&&a[0].classList.remove("active");var n=document.getElementsByClassName("marker-active");if(n[0]&&n[0].classList.replace("marker-active","marker"),"title"===t.target.className){var o=e.features[t.target.getAttribute("data-value")],r=t.target.getAttribute("data-value"),c=document.getElementsByClassName("marker");c[r].classList.replace("marker","marker-active"),t.target.parentNode.classList.add("active"),i(o),s(o)}})})}(e)}),c.on("move",function(){var e=c.getCenter(),t=e.lng,n=e.lat;a.setState({lng:t.toFixed(4),lat:n.toFixed(4),zoom:c.getZoom().toFixed(2)})})},a.clearPopup=function(){var e=document.getElementsByClassName("mapboxgl-popup");e[0]&&e[0].remove()},a.handleToggle=function(){a.setState({open:!a.state.open}),document.querySelector(".burger-menu").classList.toggle("open")},a.handleClose=function(){return a.setState({open:!1})},a.updateQuery=function(e){a.setState({query:e});var t=document.getElementsByClassName("item"),n=document.getElementsByClassName("marker");e=e.toLowerCase(),a.clearPopup();for(var o=0;o<t.length;o++)t[o].innerText.toLowerCase().indexOf(e)>-1?(t[o].style.display="",n[o].style.display=""):(t[o].style.display="none",n[o].style.display="none")},a.state={api_key:"pk.eyJ1IjoicGFwYW51Z2dldCIsImEiOiJjamxsNW12NHUwdHdsM2tuN3YwcmhsOGxmIn0.ihrjyIuDCgAtDNpU4xeSSA",lng:-73.985128,lat:40.758939,zoom:12,locations:{},images:[],query:"",open:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getRestrooms()}},{key:"render",value:function(){var e=this,t=this.state,a=t.lng,n=t.lat,r=t.zoom;return o.a.createElement("main",null,o.a.createElement("div",{className:"inline-block absolute top right mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold"},o.a.createElement("div",{"aria-label":"dynamic coordinates listing"},"Longitude: ".concat(a," Latitude: ").concat(n," Zoom: ").concat(r))),o.a.createElement("div",{ref:function(t){return e.mapContainer=t},className:"absolute top right left bottom"}),o.a.createElement(v,{label:"Open Menu",onClick:this.handleToggle,tabindex:"0","aria-label":"restroom list & search"}),o.a.createElement(f.a,null,o.a.createElement(b.a,{docked:!1,width:"25%",open:this.state.open,onRequestChange:function(t){return e.setState({open:t})},style:{textAlign:"center"}},o.a.createElement(k,{updateQuery:this.updateQuery}),o.a.createElement("div",{className:"locations",id:"locations"},o.a.createElement("h2",{className:"title-large"},"Public Restrooms In Manhattan")))))}}]),t}(n.Component));c.a.render(o.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js",{scope:"/"}).then(function(e){console.log("Registration succeeded!",e)}).catch(function(e){console.log("Registration failed with "+e)})},79:function(e,t,a){e.exports=a(197)},84:function(e,t,a){}},[[79,2,1]]]);
//# sourceMappingURL=main.a61d7b14.chunk.js.map
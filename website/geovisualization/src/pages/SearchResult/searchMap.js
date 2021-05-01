import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from "axios";
import NavbarMaps from '../../components/common/navbarMaps';
import '../../pages/Maps/maps.css'

const mapStyles = {
    top: '0',
    buttom: '0',
    width: 'auto',
    height: 'auto',
    left: '300px',
};
class MapContainer extends Component {    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        provinceResponse:[],        
        placeResponse:[],
        placeTarget:[],
        placeList:[], 
        coor:[],
        clickedPlace: '',
        targetProvince: '',
        threadId:'',
        threadTitle: '',
        mapLat: "", 
        mapLon: "", 
        searchTerm: this.props.match.params.searchTerm ,
    };
    
    componentDidMount() {
        axios.get(`api url`, {
            params: {
                provinceTh:  this.state.searchTerm
            }
        })
        .then(res => {
            const provinceResponse = res.data[0];
            this.setState({ provinceResponse });
            this.setState({ targetProvince: this.state.provinceResponse.provinceTh });

            const lat = this.state.provinceResponse.provinceLat;
            const lon = this.state.provinceResponse.provinceLon;
            this.setState({ mapLat: lat });
            this.setState({ mapLon: lon });

            return axios.get(`api url`, {
                params: {
                    provinceTh: this.state.searchTerm

                }
            });
        })
        .then(res => {
            this.setState({ placeResponse: res.data });

            var tmp = []
            this.state.placeResponse.map(row => 
                row.coor.forEach(function(data){
                    tmp.push(data);
                })
            )
            this.setState({coor: tmp});
            console.log( this.props.match.params.searchTerm );
        })  
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        clickedPlace: props.name,
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        const position = {lat: this.state.mapLat, lng: this.state.mapLon};
        const searchTerm =  this.props.match.params.searchTerm ;
        return (  
            <div class="noscroll">
                <Helmet>
                    <title>Travel Guide | {searchTerm}</title>
                </Helmet>

                <NavbarMaps />
                <div class="sidenav">
                    <div class="sidePlaceName">{searchTerm}</div>
                    <div class="sideClickedPlace">{this.state.clickedPlace}</div>

                    {this.state.placeResponse.map( thread => {
                        return thread.placeList.map( place => {
                            return place === this.state.clickedPlace ?
                                <a href={"https://pantip.com/topic/"+thread.threadId}>
                                    <div class="sideLinkBox">
                                        <div class="sideLinkTitle">
                                            {thread.threadTitle}
                                        </div>
                                    </div>  
                                </a>
                                : null
                        })
                    })}
                </div>
                
                <Map google={this.props.google}
                    style={mapStyles}
                    zoom={11}
                    center={position}
                >
                    {this.state.coor.map( place => {
                        return place.province === this.state.targetProvince ?
                            <Marker key={place.placeId}
                                onClick={this.onMarkerClick}
                                name={place.placeName}
                                position={{lat: place.lat,lng: place.lon}}/>
                            : null
                        }
                    )}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <p>{this.state.selectedPlace.name}</p>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('edit google api key here')
})(MapContainer)
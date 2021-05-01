import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import '../../components/common/2columns_layout.css';
import '../../components/common/2columns_layout.css';
import '../../components/common/PlaceBox.css';
import Navbar from '../common/navbarPage.js';
import {Link} from 'react-router-dom';
import arrow from '../../images/TopProvince/12_arrow-right.png';
import styled from 'styled-components';

const StyledButton = styled(Link)`
    width: 60px;
    height: 100%;
    background-color: #5863F8;
    color: white;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
`

export default class TopPlaces extends Component {
    state = {
        rank1:[], rank2:[], rank3:[], rank4:[], rank5:[],
        rank6:[], rank7:[], rank8:[], rank9:[], rank10:[], 
        rank11:[], rank12:[], rank13:[], rank14:[], rank15:[], 
        rank16:[], rank17:[], rank18:[], rank19:[], rank20:[], 
    }

    componentDidMount() {
        axios.all([
            axios.get(`api url 1`),
            axios.get(`api url 2`),
            axios.get(`api url 3`),
            axios.get(`api url 4`),
            axios.get(`api url 5`),
            axios.get(`api url 6`),
            axios.get(`api url 7`),
            axios.get(`api url 8`),
            axios.get(`api url 9`),
            axios.get(`api url 10`),
            axios.get(`api url 11`),
            axios.get(`api url 12`),
            axios.get(`api url 13`),
            axios.get(`api url 14`),
            axios.get(`api url 15`),
            axios.get(`api url 16`),
            axios.get(`api url 17`),
            axios.get(`api url 18`),
            axios.get(`api url 19`),
            axios.get(`api url 20`),
        ])    
        .then( res => {
            this.setState({rank1: res[0].data[0]});
            this.setState({rank2: res[1].data[0]});
            this.setState({rank3: res[2].data[0]});
            this.setState({rank4: res[3].data[0]});
            this.setState({rank5: res[4].data[0]});
            this.setState({rank6: res[5].data[0]});
            this.setState({rank7: res[6].data[0]});
            this.setState({rank8: res[7].data[0]});
            this.setState({rank9: res[8].data[0]});
            this.setState({rank10: res[9].data[0]});
            this.setState({rank11: res[10].data[0]});
            this.setState({rank12: res[11].data[0]});
            this.setState({rank13: res[12].data[0]});
            this.setState({rank14: res[13].data[0]});
            this.setState({rank15: res[14].data[0]});
            this.setState({rank16: res[15].data[0]});
            this.setState({rank17: res[16].data[0]});
            this.setState({rank18: res[17].data[0]});
            this.setState({rank19: res[18].data[0]});
            this.setState({rank20: res[19].data[0]});
        })
    }
    render() {
        const photo01 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank1.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo02 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank2.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo03 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank3.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo04 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank4.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo05 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank5.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo06 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank6.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo07 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank7.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo08 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank8.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo09 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank9.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo10 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank10.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo11 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank11.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo12 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank12.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo13 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank13.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo14 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank14.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo15 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank15.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo16 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank16.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo17 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank17.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo18 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank18.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo19 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank19.photoRef}&key=${REACT_APP_API_KEY}`;
        const photo20 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.state.rank20.photoRef}&key=${REACT_APP_API_KEY}`;
        

        return (
        <div class="top layout placeBox">
            <Helmet>
                <title>Travel Guide | Top 20 Places</title>
            </Helmet>
            <Navbar />
            <div class="BGimg" />
            <div class="LayOut">
                <div class="PageTitle">Popular Places</div>
                <div class="PageBreadCrumbs">Home&emsp;|&emsp;Popular Places</div>
                <div class="Title">Top 20  Places <br /> in Thailand</div>
                <div class="row">
    {/* Left column */}
                    <div class="column">
                        <div class="TopPlaceContainer">
                            <img src={photo01} 
                                alt={this.state.rank1.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankTop">1 ST</div>
                                <div class="PlaceName">{this.state.rank1.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/1" />                            
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo03} 
                                alt={this.state.rank3.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankTop">3 RD</div>
                                <div class="PlaceName">{this.state.rank3.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/3" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo05} 
                                alt={this.state.rank5.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">5 TH</div>
                                <div class="PlaceName">{this.state.rank5.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/5" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo07} 
                                alt={this.state.rank7.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">7 TH</div>
                                <div class="PlaceName">{this.state.rank7.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/7" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo09} 
                                alt={this.state.rank9.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">9 TH</div>
                                <div class="PlaceName">{this.state.rank9.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/9" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo11} 
                                alt={this.state.rank11.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">11 TH</div>
                                <div class="PlaceName">{this.state.rank11.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/11" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo13} 
                                alt={this.state.rank13.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">13 TH</div>
                                <div class="PlaceName">{this.state.rank13.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/13" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo15} 
                                alt={this.state.rank15.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">15 TH</div>
                                <div class="PlaceName">{this.state.rank15.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/15" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo17} 
                                alt={this.state.rank17.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">17 TH</div>
                                <div class="PlaceName">{this.state.rank17.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/17" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo19} 
                                alt={this.state.rank19.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">19 TH</div>
                                <div class="PlaceName">{this.state.rank19.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/19" />
                        </div>


    {/* Right column */}
                    </div>
                    <div class="column">
                        <div class="TopPlaceContainer">
                            <img src={photo02} 
                                alt={this.state.rank2.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankTop">2 ND</div>
                                <div class="PlaceName">{this.state.rank2.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/2" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo04} 
                                alt={this.state.rank4.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">4 TH</div>
                                <div class="PlaceName">{this.state.rank4.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/4" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo06} 
                                alt={this.state.rank6.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">6 TH</div>
                                <div class="PlaceName">{this.state.rank6.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/6" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo08} 
                                alt={this.state.rank8.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">8 TH</div>
                                <div class="PlaceName">{this.state.rank8.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/8" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo10} 
                                alt={this.state.rank10.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">10 TH</div>
                                <div class="PlaceName">{this.state.rank10.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/10" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo12} 
                                alt={this.state.rank12.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">12 TH</div>
                                <div class="PlaceName">{this.state.rank12.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/12" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo14} 
                                alt={this.state.rank14.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">14 TH</div>
                                <div class="PlaceName">{this.state.rank14.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/14" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo16} 
                                alt={this.state.rank16.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">16 TH</div>
                                <div class="PlaceName">{this.state.rank16.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/16" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo18} 
                                alt={this.state.rank18.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">18 TH</div>
                                <div class="PlaceName">{this.state.rank18.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/18" />
                        </div>

                        <div class="TopPlaceContainer">
                            <img src={photo20} 
                                alt={this.state.rank20.placeName}
                                width={168} 
                            />
                            <div class="TextBox">
                                <div class="RankReg">20 TH</div>
                                <div class="PlaceName">{this.state.rank20.placeName}</div>
                            </div>
                            <StyledButton to="/topPlace/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
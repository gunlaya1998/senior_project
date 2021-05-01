import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import '../../components/common/2columns_layout.css';
import '../../components/common/2columns_layout.css';
import '../../components/common/PlaceBox.css';
import Navbar from '../../components/common/navbarPage.js';
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
export default class TopProvince extends Component {
  state = {
    provinceResponse: [],
    rank1:[], rank2:[], rank3:[], rank4:[], rank5:[],
    rank6:[], rank7:[], rank8:[], rank9:[], rank10:[],
  }

  componentDidMount() {
    axios.get(`api url 1`)
    .then(res => {
      this.setState({ rank1 : res.data[0] });
    })
    axios.get(`api url 2`)
    .then(res => {
    this.setState({ rank2 : res.data[0] });
    })
    axios.get(`api url 3`)
    .then(res => {
      this.setState({ rank3 : res.data[0] });
    })
    axios.get(`api url 4`)
    .then(res => {
      this.setState({ rank4 : res.data[0] });
    })
    axios.get(`api url 5`)
    .then(res => {
      this.setState({ rank5 : res.data[0] });
    })
    axios.get(`api url 6`)
    .then(res => {
      this.setState({ rank6 : res.data[0] });
    })
    axios.get(`api url 7`)
    .then(res => {
      this.setState({ rank7 : res.data[0] });
    })
    axios.get(`api url 8`)
    .then(res => {
      this.setState({ rank8 : res.data[0] });
    })
    axios.get(`api url 9`)
    .then(res => {
      this.setState({ rank9 : res.data[0] });
    })
    axios.get(`api url 10`)
    .then(res => {
      this.setState({ rank10 : res.data[0] });
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
    
    return (
      <div class="top layout placeBox">
          <Helmet>
            <title>Travel Guide | Top 10 Provinces</title>
          </Helmet>

          <Navbar />
          <div class="BGimg" />
          <div class="LayOut">
              <div class="PageTitle">Popular Province</div>
              <div class="PageBreadCrumbs">Home&emsp;|&emsp;Popular Province</div>
              <div class="Title">Top 10  Provinces <br /> in Thailand</div>
              <div class="row">
{/* Left column */}
                  <div class="column">
                      <div class="container">
                          <img src={photo01} 
                            alt={this.state.rank1.provinceTh}
                            width={168} 
                          />
                          <div class="TextBox">
                              <div class="RankTop">1 ST</div>
                              <div class="PlaceName">{this.state.rank1.provinceTh}</div>
                              <div class="PlaceDesc">{this.state.rank1.provinceDesc}</div>
                          </div>
                          <StyledButton to="/topProvince/1" />
                      </div>
                      <div class="container">
                        <img src={photo03} 
                          alt={this.state.rank3.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankTop">3 RD</div>
                            <div class="PlaceName">{this.state.rank3.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank3.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/3" />
                      </div>
                      <div class="container">
                        <img src={photo05} 
                          alt={this.state.rank5.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankReg">5 TH</div>
                            <div class="PlaceName">{this.state.rank5.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank5.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/5" />
                      </div>
                      <div class="container">
                        <img src={photo07} 
                          alt={this.state.rank7.provinceTh}
                          width={168} 
                        />

                        <div class="TextBox">
                            <div class="RankReg">7 TH</div>
                            <div class="PlaceName">{this.state.rank7.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank7.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/7" />
                      </div>
                      <div class="container">
                        <img src={photo09} 
                          alt={this.state.rank9.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                          <div class="RankReg">9 TH</div>
                          <div class="PlaceName">{this.state.rank9.provinceTh}</div>
                          <div class="PlaceDesc">{this.state.rank9.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/9" />
                      </div>
{/* Right column */}
                  </div>
                  <div class="column">
                      <div class="container">
                        <img src={photo02} 
                          alt={this.state.rank2.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankTop">2 ND</div>
                            <div class="PlaceName">{this.state.rank2.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank2.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/2" />
                      </div>
                      <div class="container">
                        <img src={photo04} 
                          alt={this.state.rank4.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankReg">4 TH</div>
                            <div class="PlaceName">{this.state.rank4.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank4.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/4" />
                      </div>
                      <div class="container">
                        <img src={photo06} 
                          alt={this.state.rank6.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankReg">6 TH</div>
                            <div class="PlaceName">{this.state.rank6.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank6.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/6" />
                      </div>
                      <div class="container">
                        <img src={photo08} 
                          alt={this.state.rank8.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankReg">8 TH</div>
                            <div class="PlaceName">{this.state.rank8.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank8.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/8" />
                      </div>
                      <div class="container">
                        <img src={photo10} 
                          alt={this.state.rank8.provinceTh}
                          width={168} 
                        />
                        <div class="TextBox">
                            <div class="RankReg">10 TH</div>
                            <div class="PlaceName">{this.state.rank10.provinceTh}</div>
                            <div class="PlaceDesc">{this.state.rank10.provinceDesc}</div>
                        </div>
                        <StyledButton to="/topProvince/10" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
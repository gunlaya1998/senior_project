import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import Navbar from '../../components/common/navbarPage';
import SearchIcon from '../../images/LandingPage/03-search.svg';
import './home.css';


const SearchField = styled(TextField)`
    width:825px;
    height: 51px;
    margin-top: 12px;
    && {
        & .MuiInputBase-fullWidth {
            width: 100%;
            height: 100%;
        }
        & .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child {
            padding-left: 16px;
        }
    }
`

const CustomAutoComplete = styled(Autocomplete)`
    && {
        & .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]{
            padding: 0 0;
        }
    }
`

const StyledButton = styled(Link)`
    width: 51px;
    height: 51px;
    margin-top: 12px;
    margin-left: 10px;
    border: 0;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5863F8;
    background-image: url(${SearchIcon});
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
`
const provinceList = [{'id': 1, 'provinceName': 'กรุงเทพมหานคร'},
{'id': 2, 'provinceName': 'กระบี่'},
{'id': 3, 'provinceName': 'กาญจนบุรี'},
{'id': 4, 'provinceName': 'กาฬสินธุ์'},
{'id': 5, 'provinceName': 'กำแพงเพชร'},
{'id': 6, 'provinceName': 'ขอนแก่น'},
{'id': 7, 'provinceName': 'จันทบุรี'},
{'id': 8, 'provinceName': 'ฉะเชิงเทรา'},
{'id': 9, 'provinceName': 'ชลบุรี'},
{'id': 10, 'provinceName': 'ชัยนาท'},
{'id': 11, 'provinceName': 'ชัยภูมิ'},
{'id': 12, 'provinceName': 'ชุมพร'},
{'id': 13, 'provinceName': 'เชียงราย'},
{'id': 14, 'provinceName': 'เชียงใหม่'},
{'id': 15, 'provinceName': 'ตรัง'},
{'id': 16, 'provinceName': 'ตราด'},
{'id': 17, 'provinceName': 'ตาก'},
{'id': 18, 'provinceName': 'นครนายก'},
{'id': 19, 'provinceName': 'นครปฐม'},
{'id': 20, 'provinceName': 'นครพนม'},
{'id': 21, 'provinceName': 'นครราชสีมา'},
{'id': 22, 'provinceName': 'นครศรีธรรมราช'},
{'id': 23, 'provinceName': 'นครสวรรค์'},
{'id': 24, 'provinceName': 'นนทบุรี'},
{'id': 25, 'provinceName': 'นราธิวาส'},
{'id': 26, 'provinceName': 'น่าน'},
{'id': 27, 'provinceName': 'บึงกาฬ'},
{'id': 28, 'provinceName': 'บุรีรัมย์'},
{'id': 29, 'provinceName': 'ปทุมธานี'},
{'id': 30, 'provinceName': 'ประจวบคีรีขันธ์'},
{'id': 31, 'provinceName': 'ปราจีนบุรี'},
{'id': 32, 'provinceName': 'ปัตตานี'},
{'id': 33, 'provinceName': 'พระนครศรีอยุธยา'},
{'id': 34, 'provinceName': 'พะเยา'},
{'id': 35, 'provinceName': 'พังงา'},
{'id': 36, 'provinceName': 'พัทลุง'},
{'id': 37, 'provinceName': 'พิจิตร'},
{'id': 38, 'provinceName': 'พิษณุโลก'},
{'id': 39, 'provinceName': 'เพชรบุรี'},
{'id': 40, 'provinceName': 'เพชรบูรณ์'},
{'id': 41, 'provinceName': 'แพร่'},
{'id': 42, 'provinceName': 'ภูเก็ต'},
{'id': 43, 'provinceName': 'มหาสารคาม'},
{'id': 44, 'provinceName': 'มุกดาหาร'},
{'id': 45, 'provinceName': 'แม่ฮ่องสอน'},
{'id': 46, 'provinceName': 'ยโสธร'},
{'id': 47, 'provinceName': 'ยะลา'},
{'id': 48, 'provinceName': 'ร้อยเอ็ด'},
{'id': 49, 'provinceName': 'ระนอง'},
{'id': 50, 'provinceName': 'ระยอง'},
{'id': 51, 'provinceName': 'ราชบุรี'},
{'id': 52, 'provinceName': 'ลพบุรี'},
{'id': 53, 'provinceName': 'ลำปาง'},
{'id': 54, 'provinceName': 'ลำพูน'},
{'id': 55, 'provinceName': 'เลย'},
{'id': 56, 'provinceName': 'ศรีสะเกษ'},
{'id': 57, 'provinceName': 'สกลนคร'},
{'id': 58, 'provinceName': 'สงขลา'},
{'id': 59, 'provinceName': 'สตูล'},
{'id': 60, 'provinceName': 'สมุทรปราการ'},
{'id': 61, 'provinceName': 'สมุทรสงคราม'},
{'id': 62, 'provinceName': 'สมุทรสาคร'},
{'id': 63, 'provinceName': 'สระแก้ว'},
{'id': 64, 'provinceName': 'สระบุรี'},
{'id': 65, 'provinceName': 'สิงห์บุรี'},
{'id': 66, 'provinceName': 'สุโขทัย'},
{'id': 67, 'provinceName': 'สุพรรณบุรี'},
{'id': 68, 'provinceName': 'สุราษฎร์ธานี'},
{'id': 69, 'provinceName': 'สุรินทร์'},
{'id': 70, 'provinceName': 'หนองคาย'},
{'id': 71, 'provinceName': 'หนองบัวลำภู'},
{'id': 72, 'provinceName': 'อ่างทอง'},
{'id': 73, 'provinceName': 'อำนาจเจริญ'},
{'id': 74, 'provinceName': 'อุดรธานี'},
{'id': 75, 'provinceName': 'อุตรดิตถ์'},
{'id': 76, 'provinceName': 'อุทัยธานี'},
{'id': 77, 'provinceName': 'อุบลราชธานี'}]
export default class home extends Component {
    state = {
        searchTerm : '',
        value : provinceList[0],
        inputValue : ''
    }

    updateSearchTerm = (e) => {
        this.setState( {searchTerm: e.target.value} )
    }
    render(){
        return (
            <div class="home">
                <Helmet>
                    <title>Travel Guide</title>
                </Helmet>
                <Navbar />
                <div class="BGimg"/>
                <div class="SearchSectionContainer" />
                <div class="SearchContainer">
                    <div class="SearchText">
                        Search By Province
                    </div>
                    <div class="FlexContainer">
                        <CustomAutoComplete
                            value={this.searchTerm}
                            onChange={(event, newValue) => {
                                this.setState({ searchTerm: newValue})
                            }}
                            inputValue={this.inputValue}
                            onInputChange={this.updateSearchTerm}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={provinceList.map((option) => option.provinceName)}
                            renderInput={(params) => (
                            <SearchField
                                {...params}
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                id="Province-SearchField"
                                variant="outlined"
                                placeholder="Province"
                                InputLabelProps={{shrink: true,}}
                                // variant="filled"
                                onChange={this.updateSearchTerm}
                                onClick={this.updateSearchTerm}
                                value={this.state.searchTerm}    
                            />
                            )}
                        />
                        <StyledButton to={`/searchMap/${this.state.searchTerm}`}/>
                    </div>
                </div>
            </div>
        );
    }
}
// export default home;
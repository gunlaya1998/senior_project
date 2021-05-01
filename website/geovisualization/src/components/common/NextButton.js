import React from 'react';
import {Link} from 'react-router-dom';
import arrow from '../../images/TopProvince/12_arrow-right.png';
import styled from 'styled-components';
// import TopProvinceComponents from '../container/TopProvinceComponents';

const StyledButton = styled(Link)`
    width: 60px;
    height: 100%;
    background-color: #5863F8;
    color: white;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export default function NextButton() {
  return (
      <StyledButton to="/maps">
        <img src={arrow} alt="arrow_next" />
      </StyledButton>
  );
}
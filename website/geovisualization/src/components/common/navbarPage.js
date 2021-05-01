import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  /* font-size: 13px; */
  cursor: pointer;
`

const DropdownLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 13px;
  cursor: pointer;
`

const NavButton = styled.div`
  cursor: pointer;
  padding-right: 42px;
  align-items: center;
  display: flex;
  font-size: 13px;
`

const DropDownIcon = styled.div`
  cursor: pointer;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
  DropDownIcon: {
    paddingLeft:'6px',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <DropdownLink to="/province">
        <MenuItem onClick={handleMenuClose}>
          by Province
        </MenuItem>
      </DropdownLink>

      <DropdownLink to="/places">
        <MenuItem onClick={handleMenuClose}>
          by Places
        </MenuItem>
      </DropdownLink> 
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <DropdownLink to="/province">by Province</DropdownLink>
      </MenuItem>
      <MenuItem>
        <DropdownLink to="/places">by Places</DropdownLink>
      </MenuItem>
      <MenuItem>
        <DropdownLink to="/">About Us</DropdownLink>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: 'none' }}>
        <Toolbar>
          <NavButton style={{paddingLeft: '140px'}}>
            <NavLink to="/">
              <h3>Thailand’s Travel Guide</h3>
            </NavLink>
          </NavButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop} style={{paddingRight: '140px'}}>
            <NavButton>
              <NavLink to="/">
                HOME
              </NavLink>
            </NavButton>
            <NavButton 
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}>
                TOP PICKS
              <DropDownIcon >
                <ExpandMoreOutlinedIcon style={{height:'16px'}}/>
              </DropDownIcon>
            </NavButton>
            <NavButton>ABOUT US</NavButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCartTotal, setSearchQuery } from "../features/cartSlice";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../images/ecommerce_logo.png"
import SearchIcon from '@mui/icons-material/Search';
import SearchBox from "./SearchBox";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function App() {

  const { cart, totalQuantity } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  // const handleSearch = (e) => {
  //   dispatch(setSearchQuery(e.target.value));
  // };



  return (
    <MDBNavbar light bgColor="light" className="fixed-top">
      <MDBContainer fluid>
        <Link to='/'>
        <img src={logo} style={{height:40}}></img>
        </Link>
        {/* <span>
          <Link to="/">All Product </Link>
          </span> */}
        <div className="d-flex align-items-center">
          <div className="d-flex me-2">
          {/* <SearchIcon className="d-flex " style={{position:"absolute", start:"30px", top:"21",  paddingLeft:"5px"}} /> */}
          {/* <div> */}
            {/* <input placeholder="search..." style={{paddingLeft:"30px"}} className="pe-2" onChange={handleSearch}  /> */}
          {/* </div> */}
          <SearchBox />
          </div>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon sx={{color:"black", fontSize:"30px"}} />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}

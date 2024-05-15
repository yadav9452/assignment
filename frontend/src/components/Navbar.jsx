import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import Swal from"sweetalert2"

const Navbar = () => {
    const {isLoggedIn,setLoggedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem("accessToken");
      setLoggedIn(false)
      navigate("/login")
      const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Logout successfully"
        });
  }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Box mr="8px">
       
          My University
       
      </Box>

     {isLoggedIn && 
 <Box
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        justifyContent={"space-between"}
      >
        <NavLink to="/studentlist" pr={4}>
          Student List
        </NavLink>
        <NavLink to="/subject" pr={6}>
          Subject
        </NavLink>
        <NavLink to="/marks" pr={4}>
          Marks
        </NavLink>
        <NavLink to="/stream" pr={4}>
          Stream
        </NavLink>
        <NavLink to='/' pr={4} onClick={handleLogout}>
            Logout
        </NavLink>
      </Box>
      
     }
     {!isLoggedIn && 
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        flexGrow={1}
        justifyContent="space-evenly"
      >
        
      
            <NavLink to='/login' mr={4}>
              Login
            </NavLink>
            <NavLink to='/signup' mr={4}>
              Sign Up
            </NavLink>
         
        
       
      </Box>
}
    </Flex>
  );
};

export default Navbar;

import React, { useState } from 'react'
import styled from 'styled-components'
import { SignInBtn, Button } from "./Menu"
import { AccountCircleOutlined,
   SearchOutlined,
    VideoCallOutlined,
    LogoutOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useSelector} from 'react-redux'
import { Upload } from "./utils/allComponents.js"
import {device} from "../devices.js"

const Container =  styled.div`
  background-color: ${({theme}) => theme.bg};
  padding: 15px 20px;
  position: sticky;
  top: 0;

  @media only screen and ${device.mobileL} {
    padding: 0.8rem;
    
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: end;
  
  @media only screen and ${device.mobileL} {
    gap: 1.5rem;
    justify-content: center;

  }

`

const SearchContainer = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  border: 0.2px solid ${({theme}) => theme.textColor};  
  border-radius: 5px;
  color: ${({theme}) => theme.textColor};

  @media only screen and ${device.mobileL} {
    width: 250px;
  }

  `
  
  const InputField = styled.input`
  padding: 10px;
  width: 100%;
  background-color: ${({theme}) => theme.bg};
  border-radius: 5px;
  outline: none;
  border: none;
  caret-color: ${({theme}) => theme.textColor};
  color: ${({theme}) => theme.textColor};

  @media only screen and ${device.mobileL} {
    padding: 5px;
  }
`

const UserInfo = styled.div`
  color: ${({theme}) => theme.textColor};
  display: flex;
  align-items: center;
  gap: 10px;
`

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  background-color: gray;
  border-radius: 50%;
`

const Hamburger = styled.div`
display: none;
@media only screen and ${device.mobileL} {
  width: 30px;
  height: 36px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-evenly;
}

`
const Span = styled.span`
  width: 100%;
  height: 0.2rem;
  background-color: white;
  
`

const NavBar = ({handleSignOut, handleOpenSideBar}) => {

const {currentUser} = useSelector(store => store.user)
const [isOpen, setIsOpen] = useState(false)
const [searchField, setSearchField] = useState("")
const navigate = useNavigate();

const handleOpenUpload = () => {
  setIsOpen(true);
}

  return (
    <>
    <Container>
      <Wrapper type="bg">
        <SearchContainer>
            <InputField
             type="text"
            placeholder="Search..." 
            onChange={(e) => setSearchField(e.target.value)}
            />
            <SearchOutlined style={{cursor: "pointer"}} onClick={() => navigate(`/search?q=${searchField}`)} />
        </SearchContainer>
        <Hamburger  onClick={handleOpenSideBar}>
          <Span></Span>
          <Span></Span>
          <Span></Span>
        </Hamburger>
        { currentUser ?
        <>
          <UserInfo>
            <VideoCallOutlined onClick={handleOpenUpload} />
            <UserImage /> {currentUser.name}
          </UserInfo>
          <SignInBtn>
            <Button onClick={handleSignOut}>
            <LogoutOutlined />
              Sign Out
            </Button>
          </SignInBtn>
          </>
        :
        <SignInBtn type="sm">
          <Link
            to={"/Signin"}
          >
            <Button>
              <AccountCircleOutlined /> Sign In
            </Button>
          </Link>
        </SignInBtn>
        }
      </Wrapper>
    </Container>
      {isOpen && <Upload setIsOpen={setIsOpen} />}
    </>
  )
}

export default NavBar
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { Home,
   ExploreOutlined,
    SubscriptionsOutlined,
     VideoLibraryOutlined,
     HistoryOutlined,
     LibraryMusicOutlined,
     SportsSoccerOutlined,
     SportsEsportsOutlined,
     MovieCreationOutlined,
     NewspaperOutlined,
     LiveTvOutlined,
     SettingsOutlined,
     FlagOutlined,
     HelpOutlineOutlined,
     LightModeOutlined,
     AccountCircleOutlined,
     LogoutOutlined,
     YouTube
} from "@mui/icons-material"
import { useSelector } from 'react-redux'   
import {device} from "../devices.js"



const Container = styled.div`
  flex: 1.3;
  background-color: ${({theme}) => theme.bg};
  height: 100vh;
  color: ${({theme}) => theme.textColor};
  overflow-y: scroll;
  position: sticky;
  top: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  
  @media only screen and ${device.mobileL} {
    position: absolute;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    top: 3rem;
    left: ${(props) => props.open && "-100%"};
  }
`

const Wrapper = styled.div`
  padding: 15px 20px;

`

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 10px ;
  font-size: 14px;
  font-weight: 500;
  :hover {
    background-color: ${({theme}) => theme.hover};
    color: ${({theme}) => theme.hoverColor};
  }
  border-radius: 10px;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  padding: 20px 15px 10px 15px;
  cursor: pointer;
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bg};

  @media and screen ${device.mobileL} {
    width: ${(props) => props.size === "nav-sm" && "20px" }
    height: ${(props) => props.size === "nav-sm" && "10px" }
    color: white;
  }
`

export const LogoImg = styled.img`

  @media and screen ${device.mobileL} {
    // width: ${(props) => props.size === "nav-sm" && "20px" }
    // height: ${(props) => props.size === "nav-sm" && "10px" }
    font-size: ${(props) => props.size === "nav-sm" && "10px" }
  }
`

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.hrLine};
`

export const SignInBtn = styled.div`
    font-size: 14px;
    font-weight: 500;
     @media only screen and ${device.mobileL} {
      display: ${(props) => props.type === "sm" && "none"};
     }
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    color: #1e90ff;
    background-color: ${({theme}) => theme.bg};
    border: 0.5px solid #1e90ff;
    border-radius: 5px;
    cursor: pointer;
`

export const LogoWrapper = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     position: sticky;
     top: 0;
     color: ${({theme}) => theme.textColor};
     background-color: ${({theme}) => theme.bg};
     display: ${(props) => props.type === "bg" && "none"};

     @media only screen and ${device.mobileL} {
      display: ${(props) => props.type === "sm" && "none"};
      display: ${(props) => props.type === "bg" && "inline-flex"};
     }
`


const Menu = ({darkTheme, setDarkTheme, handleSignOut, open, handleOpenSideBar}) => {

  const {currentUser} = useSelector(store => store.user)

  return (
    <Container open={open}>
      <LogoWrapper type="sm" onClick={handleOpenSideBar}>
        <Link to={'/'}
          style={{color: "inherit"}}
        >
          <Logo type="sm" >
            <YouTube style={{color: "red",
             fontSize: "50px",
              }}/>
              YT
          </Logo>
        </Link>
      </LogoWrapper>
      <Wrapper> 
          <Link to={"/"} style={{color: "inherit"}}> 
          <Items onClick={handleOpenSideBar}> 
            <Home />
            Home
          </Items>
        </Link>
        <Link to={"/trending"} style={{color: "inherit"}}>
          <Items onClick={handleOpenSideBar}>
            <ExploreOutlined />
            Explore
          </Items>
        </Link>
        <Link to={!currentUser ? "/signin" : "/subscriptions"} style={{color: "inherit"}}>
          <Items onClick={handleOpenSideBar}>
            <SubscriptionsOutlined />
            Subscriptions
          </Items>
        </Link>
        <Hr />
        <Items onClick={handleOpenSideBar}>
          <VideoLibraryOutlined />
          Library
        </Items>
        <Items onClick={handleOpenSideBar}>
          <HistoryOutlined />
          History
        </Items>
        <Hr />
        {     //jsx element must have parent element
        !currentUser &&
        <>    
        <SignInBtn onClick={handleOpenSideBar}>
          <p>Sign in to like videos, comment, and subscribe.</p>
          <Link
            to={"/signin"}
          >
            <Button>
              <AccountCircleOutlined /> SIGN IN
            </Button>          
          </Link>
        </SignInBtn>
        <Hr />
      </>
      }
        <Items onClick={handleOpenSideBar}>
          <LibraryMusicOutlined />
          Music
        </Items>
        <Items onClick={handleOpenSideBar}>
          <SportsSoccerOutlined />
          Sports
        </Items>
        <Items onClick={handleOpenSideBar}>
          <SportsEsportsOutlined />
          Gaming
        </Items>
        <Items onClick={handleOpenSideBar}>
          <MovieCreationOutlined />
          Movies
        </Items>
        <Items onClick={handleOpenSideBar}>
          <NewspaperOutlined />
          News
        </Items>
        <Items onClick={handleOpenSideBar}>
          <LiveTvOutlined />
          Live
        </Items>
        <Hr />
        <Items onClick={handleOpenSideBar}>
          <SettingsOutlined />
          Settings
        </Items>
        <Items onClick={handleOpenSideBar}>
          <FlagOutlined />
          Report
        </Items>
        <Items onClick={handleOpenSideBar}>
          <HelpOutlineOutlined />
          Help
        </Items>
        <Items onClick={() => setDarkTheme(!darkTheme)}>
          <LightModeOutlined />
          {darkTheme? "LightMode" : "DarkMode"}
        </Items>
        {currentUser && 
        <Items onClick={handleOpenSideBar}>
          <SignInBtn>
            <Button onClick={handleSignOut}>
            <LogoutOutlined />
            Sign Out
            </Button>
          </SignInBtn>
        </Items>
        }
      </Wrapper>
    </Container>
  )
}

export default Menu
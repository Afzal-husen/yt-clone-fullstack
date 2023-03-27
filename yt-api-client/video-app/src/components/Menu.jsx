import React from 'react'
import styled from 'styled-components'
import logo from "../img/logo.png"
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
    // display: none;
    left: ${(props) => props.open && "-100%"};
    // left: -100%;
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
  img {
    width: 40px;
    height: 30px;}
  padding: 20px 15px 10px 15px;
  cursor: pointer;
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bg};
`

export const LogoImg = styled.img`
  
`

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.hrLine};
`

export const SignInBtn = styled.div`
    font-size: 14px;
    font-weight: 500;
     @media only screen and ${device.mobileL} {
      display: none;
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

const LogoWrapper = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
`



const Menu = ({darkTheme, setDarkTheme, handleSignOut, open}) => {

  const {currentUser} = useSelector(store => store.user)

  return (
    <Container open={open}>
      <LogoWrapper>
        <Link to={'/'}
          style={{color: "inherit"}}
        >
          <Logo>
            <LogoImg src={logo} alt="logo"  />
            BestTube
          </Logo>
        </Link>
      </LogoWrapper>
      <Wrapper> 
          <Link to={"/"} style={{color: "inherit"}}> 
          <Items>
            <Home />
            Home
          </Items>
        </Link>
        <Link to={"/trending"} style={{color: "inherit"}}>
          <Items>
            <ExploreOutlined />
            Explore
          </Items>
        </Link>
        <Link to={!currentUser ? "/signin" : "/subscriptions"} style={{color: "inherit"}}>
          <Items>
            <SubscriptionsOutlined />
            Subscriptions
          </Items>
        </Link>
        <Hr />
        <Items>
          <VideoLibraryOutlined />
          Library
        </Items>
        <Items>
          <HistoryOutlined />
          History
        </Items>
        <Hr />
        {     //jsx element must have parent element
        !currentUser &&
        <>    
        <SignInBtn>
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
        <Items>
          <LibraryMusicOutlined />
          Music
        </Items>
        <Items>
          <SportsSoccerOutlined />
          Sports
        </Items>
        <Items>
          <SportsEsportsOutlined />
          Gaming
        </Items>
        <Items>
          <MovieCreationOutlined />
          Movies
        </Items>
        <Items>
          <NewspaperOutlined />
          News
        </Items>
        <Items>
          <LiveTvOutlined />
          Live
        </Items>
        <Hr />
        <Items>
          <SettingsOutlined />
          Settings
        </Items>
        <Items>
          <FlagOutlined />
          Report
        </Items>
        <Items>
          <HelpOutlineOutlined />
          Help
        </Items>
        <Items onClick={() => setDarkTheme(!darkTheme)}>
          <LightModeOutlined />
          {darkTheme? "LightMode" : "DarkMode"}
        </Items>
        {currentUser && 
        <Items>
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
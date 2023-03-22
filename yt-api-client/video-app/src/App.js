import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { Menu, NavBar, Home, Video, SignIn, Search } from "./components/utils/allComponents"
import { darkMode, lightMode } from './components/utils/theme'
import { useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "./features/userSlice.js"
import { clearPersist } from "./features/videoSlice"



const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
`

const Wrapper = styled.div`
background-color: ${({ theme }) => theme.wrapperBg};
height: 100vh;
overflow-y: scroll;
::-webkit-scrollbar {
  display: none;
}
`

const App = () => {

const [ darkTheme, setDarkTheme ] = useState(true);
const dispatch = useDispatch();
const { currentUser } = useSelector((store) => store.user)

//signOut 
const handleSignOut = () => {
  dispatch(logOut());
}

//



  return (
    <ThemeProvider theme={darkTheme ? darkMode : lightMode}>
      <Container>
        <BrowserRouter>
          <Menu handleSignOut={handleSignOut} darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
          <Main>
            <NavBar handleSignOut={handleSignOut} />
            <Wrapper>
              <Routes>
                <Route index element={<Home type="random" />} />
                <Route path="/trending" element={<Home type="trending"/>} />
                <Route path="/subscriptions" element={<Home type="sub"/>} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/search" element={<Search />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>  
  )
}

export default App
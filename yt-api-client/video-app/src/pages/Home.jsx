import React from 'react'
import styled from "styled-components"
import { Card }  from "../components/utils/allComponents.js"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
 

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    color: white;
`



const Home = ({type}) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
    const res = await axios.get(`/videos/${type}`);
    setVideos(res.data);
    }
    fetchVideos(); 
  }, [type])


    return (
      <Container>
         {videos?.map((video) => (
          <Card key={video._id} video={video}/>
          ))}
      </Container>  
    )
}
export default Home
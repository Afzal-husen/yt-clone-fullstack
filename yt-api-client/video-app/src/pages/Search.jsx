import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from "styled-components"
import { Card } from "../components/utils/allComponents.js"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
flex-wrap: wrap;
color: white;
`

const Search = () => {
    
    const query = useLocation();
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchBySearch = async () => {
            const res = await axios.get(`/videos/search${query.search}`)
            setVideos(res.data)
        }
        fetchBySearch()
    }, [query.search])
  return (
    <Container>
        {!videos ?
         "No videos Found" : 
          videos.map((video) => (
            <Card key={video._id} video={video} />
          ))  
        }
    </Container>
  )
}

export default Search
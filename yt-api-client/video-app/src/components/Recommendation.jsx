import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Card} from "./utils/allComponents.js"

const Container = styled.div`
  flex: 3;
  height: 100vh;
`

const Recommendation = ({tags}) => {
const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/tags?tags=${tags}`);
                setVideos(res.data);
            } catch (error) {
                
            }
        }
        fetchVideos()
    }, [tags])


  return (
    <Container>
        {videos.map((video) => (
            <Card video={video} key={video._id} type="sm" />
        ))}
    </Container>
    )
}

export default Recommendation
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import app from "../fireBase.js"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const Container = styled.div`
    background-color: #000000a7;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.textColor};
`
const Wrapper = styled.div`
    width: 500px;
    background-color: ${({theme}) => theme.bg};
    position: relative;
    box-shadow: 0 0 1px ${({theme}) => theme.bg};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    z-index: 10;
`

const CloseIcon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    color: ${({theme}) => theme.closeColor}
`

const Input = styled.input`
    background-color: transparent;
    border: 0.5px solid ${({theme}) => theme.textColor};
    outline: none;
    color: ${({theme}) => theme.textColor};
    padding: 10px;
    color: ${({theme}) => theme.textColor};
    border-radius: 5px;  
`

const Label = styled.label`
    color: ${({theme}) => theme.textColor};
`

const Title = styled.h1`
    text-align: center;
    color: ${({theme}) => theme.textColor};
    margin: 0;
`

const Description = styled.textarea`
background-color: transparent;
border: 0.5px solid ${({theme}) => theme.textColor};
outline: none;
color: ${({theme}) => theme.textColor};
padding: 10px;
color: ${({theme}) => theme.textColor};
border-radius: 5px;
`
const Button = styled.button`
    width: 100px;
    margin: 0 auto;
    padding: 5px 10px;
    background-color: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.textColor};
    border: 1px solid ${({theme}) => theme.textColor};
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.5s all ease;

    :hover {
        background-color: ${({theme}) => theme.textColor};
        color: ${({theme}) => theme.hover};
    }

`


const Upload = ({setIsOpen}) => {
    const navigate = useNavigate()
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [videoPerc, setVideoPerc] = useState(0)
    const [imagePerc, setimagePerc] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState("")

    console.log(inputs)

    const handleChange = (e) => {
        setInputs((prevValue) => {
            const inputResult = {...prevValue, [e.target.name]: e.target.value}
            return inputResult
        })
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","))
    }

    //handles file upload
    const uploadFile = (file, urlType) => {
        //storage and path reference
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);       //this  reference  is used to  upload or download data, get or update metadata or delete the file, arg=> storage, file name or file path 
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers(functions):
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        //state change observer
        const next = (snapshot) => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            urlType === "thumbUrl" ? setimagePerc(Math.round(progress)) : setVideoPerc(Math.round(progress)); 
            //when state changes
            switch(snapshot.state) {
                case "paused":
                    console.log("Upload is Paused");
                    break;
                case "running":
                    console.log("Upload is runnning");
                    break;
                    default:
                    break;
            }
        }
        //Error observer
        const error = (error) => {
            console.log(error)
        }
        //Completion observer
        const complete = () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prevValue) => {
                    return {...prevValue, [urlType]: downloadURL}
                })
              });
        }

        //upload event
        uploadTask.on(
            "state_changed",
            next,
            error,
            complete
        )
    };

    //on upload
    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post("/videos", {...inputs, tags});
        console.log(res)
        setIsOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    useEffect(() => {
        video && uploadFile(video, "vidUrl")
    }, [video])

    useEffect(() => {
        image && uploadFile(image, "thumbUrl")
    }, [image])

  return (
    <Container>
        <Wrapper>
            <CloseIcon onClick={() => setIsOpen(!true)}>x</CloseIcon>
            <Title>Upload a New Video</Title>
            <Label>video</Label>
            {videoPerc > 0 ? (
                `Uploading:  ${videoPerc} %`
            ) : (
                <Input
                    type="file"
                    accept='video/*'
                    onChange={(e) => setVideo(e.target.files[0])}                           
                />
            )}
            <Input
                type="text"
                placeholder='Title...'
                name='title'
                onChange={handleChange}
            />
            <Description
                rows={8}
                type="text"
                placeholder='Description...'
                name='desc'
                onChange={handleChange}
             />
                 
            <Input
                type="text"
                placeholder='separate tags with commas...'
                name='tags'
                onChange={handleTags}
            />
            <Label>Image</Label>
            {imagePerc > 0 ? (
                `Uploading: ${imagePerc} %`

            ) : (
                <Input
                    type="file"
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}                
    
                />
            )}
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
    )
}

export default Upload
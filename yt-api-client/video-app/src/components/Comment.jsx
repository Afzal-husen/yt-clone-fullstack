import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { format } from 'timeago.js'
import { fetchComment } from '../features/commentSlice'


const Container = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
`

const CommentDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const UserName = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.textColor}
`
const Time = styled.span`
    font-size: 12px;
    font-weight: lighter;
    color: ${({theme}) => theme.softText}
`
const CommentDescription = styled.p`
    font-size: 14px;
    color: ${({theme}) => theme.textColor};
    margin: 0;
`

const Button = styled.button`
height: 40px;
border: none;
background-color: #cd0000;
border-radius: 5px;
font-weight: 600;
color: #fff;
cursor: pointer;
padding: 5px 10px;
`
const Wrapper = styled.div`
    display: flex;
    gap: 20px;
`

const Hr = styled.hr`
    margin:  0;
    border: 0.5px solid ${({theme}) => theme.hrLine};
`


const Comment = ({comment}) => {

    const { currentUser } = useSelector(store => store.user);
    const { currentComments } = useSelector(store => store.comment);
    const [user, setUser] = useState([]); 
    const dispatch = useDispatch()

    // fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await axios.get(`/user/find/${comment.userID}`);
                setUser(userRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, [comment.userID])





    const handleDelete = async (id) => {
        if(currentUser._id === comment.userID) {
            const remove = currentComments.filter(item => item._id !== id)
            dispatch(fetchComment(remove))
        }

        try {
            const res = await axios.delete(`/comments/${comment._id}`);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
    <Container>
        <Wrapper>
            <Image src={user.image} />
            <CommentDetail>
                <UserName>
                    {user.name}  <Time>{format(comment.createdAt)}</Time>
                </UserName>
                <CommentDescription>
                {comment.description}
                </CommentDescription>
            </CommentDetail>
        </Wrapper>
        <Button onClick={() => handleDelete(comment._id)}>Delete</Button>
    </Container>
    <Hr />
    </>
  )
}

export default Comment
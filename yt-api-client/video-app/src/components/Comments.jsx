import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchComment } from "../features/commentSlice";
import { Comment } from "./utils/allComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const NewComment = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;
const Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.wrapperBg};
  border-radius: 5px;
  outline: none;
  border: none;
  border-bottom: 0.5px solid ${({ theme }) => theme.hrLine};
  caret-color: ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.textColor};
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Button = styled.button`
  border: none;
  background-color: #cd0000;
  border-radius: 5px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
`;

const Comments = ({ setComments }) => {
  const { currentUser } = useSelector((store) => store.user);
  const { currentVideo } = useSelector((store) => store.video);
  const { currentComments } = useSelector((store) => store.comment);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleAddComment = async () => {
    try {
      const res = await axios.post("/comments", {
        videoID: currentVideo._id,
        description: description,
      });
      setComments((prevValue) => {
        dispatch(fetchComment([...prevValue, res.data]));
        setDescription("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NewComment>
        <Image src={currentUser.image} />
        <Input
          placeholder="Add a comment..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleAddComment}>Add</Button>
      </NewComment>
      {currentComments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: ${(props) => (props.type === "sm" ? "100%" : "320px")};
  height: ${(props) => (props.type === "sm" ? "100px" : "100%")};
  margin-top: 30px;
  border-radius: 10px;
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: ${(props) => props.type === "sm" && "10px"};
  box-sizing: border-box;
  box-shadow: 0 0 1px white;
  object-fit: contain;
`;

const CardImg = styled.img`
  width: ${(props) => (props.type === "sm" ? "150px" : "100%")};
  height: ${(props) => (props.type === "sm" ? "100px" : "170px")};
  background-color: gray;
`;

const ChannelDetail = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  padding: 20px 10px;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Text = styled.div``;
const Title = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
`;
const ChannelName = styled.h1`
  font-size: 15px;
  margin: 0;
  color: #696969;
`;
const Info = styled.div`
  color: #696969;
  font-size: 12px;
  font-weight: 500;
`;

const Card = ({ type, video }) => {
  const { currentUser } = useSelector((store) => store.user);
  const { userID } = video;
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/user/find/${userID}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
  }, [userID]);

  return (
    <Link to={currentUser ? `/video/${video._id}` : "/signin"}>
      <Container type={type}>
        <CardImg src={video.thumbUrl} type={type} />

        <ChannelDetail>
          <ChannelImg src={channel.image} type={type} />
          <Text>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} Views {format(video.createdAt)}
            </Info>
          </Text>
        </ChannelDetail>
      </Container>
    </Link>
  );
};

export default Card;

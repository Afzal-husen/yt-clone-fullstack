import React from "react";
import styled from "styled-components";
import {
  ThumbUpOutlined,
  ThumbUpAlt,
  ThumbDownOutlined,
  ThumbDownAlt,
  ReplyOutlined,
  LibraryAddOutlined,
  ContactSupportOutlined,
  ThreeMpRounded,
} from "@mui/icons-material";

import {
  Comments,
  Card,
  Recommendation,
} from "../components/utils/allComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  disLike,
} from "../features/videoSlice.js";
import { async } from "@firebase/util";
import { subscription } from "../features/userSlice.js";
import { fetchComment } from "../features/commentSlice.js";

//styled components
const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 30px;
`;

const Content = styled.div`
  flex: 7;
  height: 100vh;
  flex-direction: column;
`;

// const Recommendation = styled.div`
//   flex: 3;
//   height: 100vh;
// `

const VideoWrapper = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 24px;
`;

const Info = styled.div`
  color: #a6a6a6;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  border: none;
  background-color: ${({ theme }) => theme.wrapperBg};
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.hrLine};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const ChannelName = styled.span`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 10px;
  font-weight: bold;
`;

const SubscriberCount = styled.span`
  color: ${({ theme }) => theme.softText};
  font-size: 14px;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelDescription = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
`;

const SubscribeContainer = styled.div``;

const SubscribeButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  background-color: #cd0000;
  border-radius: 5px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  width: 100%;
  height: 400px;
`;

const Video = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { currentVideo } = useSelector((store) => store.video);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  !currentUser && navigate("/");

  const path = useLocation();
  const videoId = path.pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  //fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const videoRes = await axios.get(`/videos/find/${videoId}`);
        const channelRes = await axios.get(
          `/user/find/${videoRes.data.userID}`,
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [videoId, dispatch]);

  //handleLike
  const handleLike = async () => {
    if (!currentUser) {
      //route t0 signin page
      navigate("/signin");
    }
    try {
      dispatch(fetchStart());
      await axios.put(`/user/like/${videoId}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      dispatch(fetchFailure());
    }
  };

  //handleDisLike
  const handleDisLike = async () => {
    if (!currentUser) {
      navigate("/signin");
    }
    try {
      dispatch(fetchStart());
      await axios.put(`/user/dislike/${videoId}`);
      dispatch(disLike(currentUser._id));
    } catch (error) {
      dispatch(fetchFailure());
    }
  };

  const handleSubscription = async () => {
    //if no user
    if (!currentUser) {
      navigate("/signin");
    }
    try {
      //sub
      // if(!currentUser.subscribedChannels.includes(currentVideo.userID)){
      //   const subRes =  await axios.put(`/user/sub/${currentVideo.userID}`);
      // } else{
      //   const unSubRes = await axios.put(`/user/unsub/${currentVideo.userID}`)
      // }
      //OR
      currentUser.subscribedChannels.includes(currentVideo.userID)
        ? await axios.put(`/user/unsub/${currentVideo.userID}`)
        : await axios.put(`/user/sub/${currentVideo.userID}`);

      dispatch(subscription(currentVideo.userID));
    } catch (error) {
      console.log(error);
    }
  };

  const [comments, setComments] = useState([]);

  //fecthComments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
        dispatch(fetchComment(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [videoId, dispatch]);

  useEffect(() => {
    const addViews = async () => {
      try {
        await axios.put(`/videos/views/${videoId}`);
      } catch (error) {}
    };
    addViews();
  }, [videoId]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame controls autoPlay poster={currentVideo.thumbUrl}>
            <source src={currentVideo.vidUrl} />
          </VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.Liked.includes(currentUser._id) ? (
                <ThumbUpAlt />
              ) : (
                <ThumbUpOutlined />
              )}{" "}
              {currentVideo.Liked.length} Likes
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo.disLiked.includes(currentUser._id) ? (
                <ThumbDownAlt />
              ) : (
                <ThumbDownOutlined />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>
            <Button>
              <LibraryAddOutlined />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelImage src={channel.image} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <SubscriberCount>
                subscribers {channel.subscriberCount}
              </SubscriberCount>
              <ChannelDescription>{currentVideo.desc}</ChannelDescription>
            </ChannelDetail>
          </ChannelInfo>
          <SubscribeContainer>
            <SubscribeButton onClick={handleSubscription}>
              {currentUser.subscribedChannels.includes(currentUser._id)
                ? "UnSubscribe"
                : "Subscribe"}
            </SubscribeButton>
          </SubscribeContainer>
        </Channel>
        <Hr />
        <Comments comments={comments} setComments={setComments} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;

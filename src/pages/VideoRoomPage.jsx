import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoRoom from '../components/video/VideoRoom';

const VideoRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Check if user is the host of this room
    const hostId = localStorage.getItem('userId');
    // In a real app, you'd check against the webinar's host
    setIsHost(true); // For demo purposes
  }, [id]);

  const handleLeaveRoom = () => {
    navigate('/host');
  };

  return (
    <VideoRoom
      roomId={id}
      isHost={isHost}
      onLeave={handleLeaveRoom}
    />
  );
};

export default VideoRoomPage;
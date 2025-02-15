import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="h-screen overflow-x-hidden flex flex-col md:flex-row bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
      <Sidebar className="w-full md:w-1/4" />
      <div className="flex-grow w-full md:w-3/4">
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;

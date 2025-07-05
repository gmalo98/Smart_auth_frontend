import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
   const user = useSelector((state) => state.auth.user);
   const firstName = user?.username?.split(' ')[0] || 'Guest';
   console.log(user);
  return (
    <div>
      <h1>Hello , {firstName}</h1>
    </div>
  )
}

export default Home

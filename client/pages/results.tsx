import React, {useState, useEffect} from 'react'
import NavBar from '@/comp/NavBar'
import UserList from './userlist';
//import NavBar from '../components/navbar';

function Result() {
  return (
    <div>
      <NavBar />
      <UserList /> {/* This line adds the user list to your results page */}
    </div>
  )
}
export default Result;


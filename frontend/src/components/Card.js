import React, { Component } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Card() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      coucou
      <ul>
        <li>Name: {user?.name}</li>
        <li>gender: {user?.gender}</li>
        <li>URL: {user?.url}</li>
      </ul>
    </div>
  );
}

export default Card;

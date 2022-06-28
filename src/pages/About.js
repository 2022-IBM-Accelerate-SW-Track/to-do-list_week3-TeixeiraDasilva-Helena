import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Helena Dasilva</div>
            <div className="brief_description">
              I will be a junior at Washington University in the fall. I like running and cooking.
              I am majoring in CS and MechE.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

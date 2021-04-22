import React, { useState } from 'react';
// import "../css/appBar.css";

// import MenuImage{ ReactComponent as Image } from "../images/menu-icon.svg";
// import MenuImage from "../images/menu-icon.svg";

// import UserImage from "../images/user-icon.svg";
// const UserImage = require("../images/user-icon.svg");

const AppBar = () => {
  const [showWindow, setShowWindow] = useState(0);

  const showUserBox = (e) => {
    const userBox = document.getElementsByClassName('appBar__icons-userBox')[0];
    userBox.style.visibility = 'visible';
  };

  const hideUserBox = () => {
    const userBox = document.getElementsByClassName('appBar__icons-userBox')[0];
    userBox.style.visibility = 'hidden';
  };

  return (
    <div className="appBar">
      <div className="appBar__menu">
        {/* <img src="../images/menu-icon.svg" alt="" /> */}
        {/* <img src={MenuImage} alt="" /> */}
        {/* <MenuImage /> */}
        <div className="appBar__menu-menuIcon">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.0968 1.45163H2.90323C1.30645 1.45163 0 2.75808 0 4.35486C0 5.95163 1.30645 7.25808 2.90323 7.25808H27.0968C28.6935 7.25808 30 5.95163 30 4.35486C30 2.75808 28.6935 1.45163 27.0968 1.45163Z"
              fill="white"
            />
            <path
              d="M27.0968 12.0968H2.90323C1.30645 12.0968 0 13.4033 0 15C0 16.5968 1.30645 17.9033 2.90323 17.9033H27.0968C28.6935 17.9033 30 16.5968 30 15C30 13.4033 28.6935 12.0968 27.0968 12.0968Z"
              fill="white"
            />
            <path
              d="M27.0968 22.7419H2.90323C1.30645 22.7419 0 24.0484 0 25.6452C0 27.2419 1.30645 28.5484 2.90323 28.5484H27.0968C28.6935 28.5484 30 27.2419 30 25.6452C30 24.0484 28.6935 22.7419 27.0968 22.7419Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="appBar__title">
        <h1>chatApp_react</h1>
      </div>
      <div className="appBar__icons">
        <div
          className="appBar__icons-user"
          onMouseOver={() => showUserBox()}
          onMouseLeave={() => hideUserBox()}
        >
          {/* <img src="../images/user-icon.svg" alt="" /> */}
          {/* <img src={UserImage} alt="" /> */}
          <div className="appBar__icons-userIcon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C6.75 0 0 6.75 0 15C0 23.25 6.75 30 15 30C23.25 30 30 23.25 30 15C30 6.75 23.25 0 15 0ZM15 4.5C17.55 4.5 19.5 6.45 19.5 9C19.5 11.55 17.55 13.5 15 13.5C12.45 13.5 10.5 11.55 10.5 9C10.5 6.45 12.45 4.5 15 4.5ZM15 25.8C11.25 25.8 7.95 23.8501 6 21C6 18 12 16.35 15 16.35C18 16.35 24 18 24 21C22.05 23.85 18.75 25.8 15 25.8Z"
                fill="white"
              />
            </svg>
          </div>

          {/* <div className="appBar__icon-user--profile"></div>
          <div className="appBar__icon-user--setting"></div> */}
        </div>
        <div
          className="appBar__icons-userBox"
          onMouseOver={() => showUserBox()}
          onMouseLeave={() => hideUserBox()}
        >
          <ul>
            <li>
              <span>Profile</span>
            </li>

            <a href="#popupWindow">
              <li>
                <span>Setting</span>{' '}
              </li>
            </a>
            <li>
              <span>Null</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppBar;

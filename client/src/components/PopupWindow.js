import React, { useState } from "react";

const PopupWindow = ({
  changeColor,
  timelineColor: { todayColor, last7DayColor, thisMonthColor },
}) => {
  const [nTodayColor, setNTodayColor] = useState(todayColor);
  const [nLast7DayColor, setNLast7DayColor] = useState(last7DayColor);
  const [nThisMonthColor, setNThisMonthColor] = useState(thisMonthColor);

  return (
    <div id="popupWindow" className="popupWindow">
      <div className="popupWindow-wrap">
        <div className="popupWindow__header">
          <ul>
            <li>
              <span> color</span>{" "}
            </li>
            <li>
              <span> color</span>{" "}
            </li>
            <li>
              <span> color</span>{" "}
            </li>
            <li></li>
          </ul>
          <a href="#chat">
            <div className="popupWindow__header-close">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M19.4872 16.226L3.81314 0.551998C3.12955 -0.13159 2.02128 -0.13159 1.33876 0.551998L0.512691 1.37679C-0.170897 2.06059 -0.170897 3.16886 0.512691 3.85138L16.1867 19.5254C16.8705 20.209 17.9788 20.209 18.6613 19.5254L19.4861 18.7006C20.171 18.0181 20.171 16.9096 19.4872 16.226Z"
                    fill="#F44336"
                  />
                  <path
                    d="M16.1867 0.552158L0.512691 16.2262C-0.170897 16.9098 -0.170897 18.0183 0.512691 18.7008L1.33748 19.5256C2.02128 20.2092 3.12955 20.2092 3.81207 19.5256L19.4872 3.85261C20.171 3.16902 20.171 2.06075 19.4872 1.37823L18.6624 0.55344C17.9788 -0.13143 16.8705 -0.13143 16.1867 0.552158Z"
                    fill="#F44336"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>

        <div className="popupWindow__content">
          <div className="popupWindow__box-container">
            <div className="popupWindow__box">
              <div className="popupWindow__box-title">
                <span>Timeline</span>{" "}
              </div>
              <div className="popupWindow__box-content">
                <ul>
                  <li>
                    <span>Today :</span>
                    <input
                      type="color"
                      name="tdayColor"
                      value={nTodayColor}
                      onChange={(e) => setNTodayColor(e.target.value)}
                    />
                  </li>
                  <li>
                    <span>Last 7 days :</span>
                    <input
                      type="color"
                      name="nLast7DayColor"
                      value={nLast7DayColor}
                      onChange={(e) => setNLast7DayColor(e.target.value)}
                    />
                  </li>
                  <li>
                    <span>This month :</span>
                    <input
                      type="color"
                      name="nThisMonthColor"
                      value={nThisMonthColor}
                      onChange={(e) => setNThisMonthColor(e.target.value)}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div className="popupWindow__box">
              <div className="popupWindow__box-title">
                <span>Timeline</span>{" "}
              </div>
              <div className="popupWindow__box-content">
                <ul>
                  <li>
                    <span>Today :</span>
                    <input type="color" />
                  </li>
                  <li>
                    <span>Last 7 days :</span>
                    <input type="color" />
                  </li>
                  <li>
                    <span>This month :</span>
                    <input type="color" />
                  </li>
                </ul>
              </div>
            </div>

            <a href="#chat">
              <button
                onClick={() =>
                  changeColor({ nTodayColor, nLast7DayColor, nThisMonthColor })
                }
              >
                save
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;

import React from "react";

import "../assets/styles/Home.css";

interface PostItemProps {}

export const PostItem: React.FC = () => {
  return (
    <div className='blogList-wrap'>
      <div className="blogItem-wrap">
        <img className="blogItem-cover" src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg" alt="cover" />
        <p className="banner">Travel</p>
        <h3>7 CSS tools you should be using</h3>
        <p className="blogItem-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </p>
        <footer>
          <div className="blogItem-author">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHSfH9Ueyy72RP1GJwEH5-Oe6w0cjJvojcoBfQ56FnjU_UyLpWRJHBP8a0XpDU4LkCg6o&usqp=CAU" alt="avatar" />
            <div>
              <h6>Gigi Hadid</h6>
              <p>2022</p>
            </div>
          </div>
          ➝
        </footer>
      </div>
      </div>
    
    
  );
};

import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { RiFolderAddLine } from "react-icons/ri";
import { TbClockCheck } from "react-icons/tb";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Todo List Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card">
              <RiFolderAddLine className="white"/>
              <p>Add a Todo Task/Work</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className="card">
              <TbClockCheck />
              <p>Put Reminder To Complete At Estimated Time</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
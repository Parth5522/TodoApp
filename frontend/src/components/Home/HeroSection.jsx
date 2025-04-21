import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1082",
      subTitle: "Todos",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "120",
      subTitle: "Users",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "120",
      subTitle: "Users",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "88 %",
      subTitle: "Efficiency",
      icon: <BsGraphUpArrow />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Add a Todo that helps you to do work based on your choice</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
            </p>
          </div>
          <div className="image">
            <img src="/desk.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default HeroSection
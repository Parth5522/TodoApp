import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <footer className={isAuthenticated ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Parth.</div>
      <div>
        <Link to={"https://www.facebook.com/parth.jogani.50"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/parth-jogani-a9877725b/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link
          to={"https://www.instagram.com/_.parth_jogani._/"}
          target="_blank"
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

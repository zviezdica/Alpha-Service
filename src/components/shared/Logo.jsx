import React from "react";

import { logo, alphaBlack } from "../../images";

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="Alpha Service logo" className="mr-16 inline-block" />
      <img src={alphaBlack} alt="Alpha text" className="inline-block" />
    </div>
  );
};

export default Logo;

import React from "react";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const LazyLoader = () => {
  const loader = useSelector((state) => state.setting.loader);
  return (
    <div className={"Loader " + loader}>
      <FadeLoader
        className="ringLoader"
        color="#8229D0"
        cssOverride={{}}
        loading
        speedMultiplier={1}
      />
    </div>
  );
};

export default LazyLoader;

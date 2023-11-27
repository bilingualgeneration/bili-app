import React from "react";

export const Loading: React.FC = () => {
  const style = {
    backgroundPosition: "center",
    backgroundImage: `url('/assets/img/loading.png')`,
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
  };
  return (
    <>
      <div style={style}></div>
    </>
  );
};

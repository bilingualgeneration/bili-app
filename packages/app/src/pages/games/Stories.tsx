import React from "react";

interface StoriesProps {
  id: string; // Define the id prop
}

const Stories: React.FC<StoriesProps> = ({ id }) => {
  return (
    <>
      {/* Use id prop as needed */}
      <h1>Story ID: {id}</h1>
    </>
  );
};

export default Stories;

import React from "react";
import ImageConatiner from "../ImageContainer/ImageContainer";

interface userPreviewProps {
  data: any;
}
const UserDetails: React.FC<userPreviewProps> = ({ data }) => {
  return (
    <div className="user-details-container">
      <div className="user-heading">{data?.name} details here</div>
      <div className="user-description">{data?.description}</div>
      <div className="image-wrapper">
        <ImageConatiner />
      </div>
    </div>
  );
};

export default UserDetails;

import React from "react";
import Users from "../../Components/Users/Users";

const Home: React.FC = () => {
  return (
    <div className="app">
      <div className="header">Customer Details Portal</div>
      <div className="container">
        <Users />
      </div>
    </div>
  );
};

export default Home;

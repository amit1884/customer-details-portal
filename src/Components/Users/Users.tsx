import React, { useState, useEffect, useCallback } from "react";
import { users as initialData, users } from "../../contants"; // Adjust the path as needed
import "./user.css";
import UserDetails from "./UserDetails";
import Spinner from "../Spinner/Spinner";

interface DataItem {
  id: number;
  name: string;
  description: string;
}

const Users: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DataItem | null>(users[0]);

  useEffect(() => {
    // Load initial data
    setData(users.slice(0, 10)); // Adjust number for initial load
  }, []);

  const loadMoreData = useCallback(() => {
    if (loading) return; // Avoid multiple triggers

    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      const nextPage = page + 1;
      const newData = users.slice(page * 10, nextPage * 10);
      setData((prevData) => [...prevData, ...newData]);
      setPage(nextPage);
      setLoading(false);
    }, 1000); // Simulate network delay
  }, [loading, page]);

  return (
    <div className="main-container">
      <div className="left-container">
        {data.map((item) => (
          <div
            key={item.id}
            className={`card ${
              selectedUser?.id === item.id ? "active-card" : ""
            }`}
            onClick={() => setSelectedUser(item)}
          >
            <div className="user">
              <p className="user-name">{item.name}</p>
              <p className="short-description">{item.description}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="loader flex-center">
            <Spinner />
          </div>
        )}
        {data.length < users.length && (
          <div className="load-more flex-center">
            <button className="load-btn" onClick={() => loadMoreData()}>Load More</button>
          </div>
        )}
      </div>
      <div className="right-container">
        {selectedUser && <UserDetails data={selectedUser} />}
      </div>
    </div>
  );
};

export default Users;

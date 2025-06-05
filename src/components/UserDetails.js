import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true); 
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => {
        setUserDetail(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {userDetail.name}</p>
      <p><strong>Username:</strong> {userDetail.username}</p>
      <p><strong>Email:</strong> {userDetail.email}</p>
      <p><strong>Phone:</strong> {userDetail.phone}</p>
      <p><strong>Website:</strong> {userDetail.website}</p>
    </div>
  );
}

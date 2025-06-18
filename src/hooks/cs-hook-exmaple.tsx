import React from "react";
import useFetch from "../hooks/useFetch";

export default function MessageList() {
  const { data: messages, loading, error } = useFetch<Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    created_at: string;
  }>>("db2/users"); 
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!messages || messages.length === 0) return <p>No messages found.</p>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.name}</strong> ({msg.email})<br />
            <em>{msg.subject}</em>: {msg.message}<br />
            <small>{new Date(msg.created_at).toLocaleString()}</small>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

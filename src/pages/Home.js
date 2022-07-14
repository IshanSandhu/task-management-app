import React, { useState, useEffect } from "react";
import fire from "../fire";
import { Link } from "react-router-dom";
import "./Home.css";
import database from "firebase/compat/database";
import { toast } from "react-toastify";

const Home = ({ handleLogout }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fire
      .database()
      .ref()
      .child("contacts")
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if(window.confirm("Are you sure that the task is completed?")) {
        fire.database().ref().child(`contacts/${id}`).remove((err) => {
            if (err) {
                toast.error(err);
            } else{
                toast.success("Task completed successfully");
            }
        });
    }
    }
  return (
    
      <section className="hero">
        <nav>
         
        </nav>
      
      <div style={{ marginTop: "100px",marginBottom: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Task</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Link</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                        <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button 
                        className="btn btn-delete"
                        onClick={() => onDelete(id)}
                        >Complete</button>
                    <Link to={`/view/${id}`}>
                        <button className="btn btn-view">View</button>
                    </Link>
                    </td>   
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default Home;

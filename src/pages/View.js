import React, {useState, useEffect} from 'react'
import fire from '../fire'
import database from 'firebase/compat/database'
import { useParams, Link } from 'react-router-dom'
import "./View.css"

const View = () => {
  const [user, setUser] = useState({});
  
  const {id} = useParams();

  useEffect(() => {
    fire.database().ref().child(`contacts/${id}`).get().then(snapshot => {
      if (snapshot.exists()){
        setUser({...snapshot.val()});
      } else {
        setUser({});
      }
    });
  }, [id]);

  
  return (
    <div style={{ marginTop: "150px" }}>
      <div className='card'>
        <div className='card-header'>
          <p>User Contact Detail</p>
        </div>
        <div className='container'>
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to='/'>
            <button className='btn btn-edit'>Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View
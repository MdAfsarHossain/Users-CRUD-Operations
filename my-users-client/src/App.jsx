import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, []);

  const handleAddedUser = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};

    // console.log(name, email);
    // console.log(user);

    // Send data to the server side
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const newusers = [...users, data];
      setUsers(newusers);
      form.reset();
    })

  }


  return (
    <>
      
      <h1>Users Management System</h1>
      <h2>Numbers of Users: {users.length}</h2>

      <form onSubmit={handleAddedUser}>
        <input type="text" name='name'/>
        <br />
        <input type="email" name='email'/>
        <br />
        <input type="submit" value="Submit" />
      </form>
      
      {
        users?.map(user => <p key={user.id}>{user.id}: {user.name} ----- {user.email}</p>)
      }
    </>
  )
}

export default App

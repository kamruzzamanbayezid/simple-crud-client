import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
      const users = useLoaderData();
      const [remainingUser, setRemainingUser] = useState(users);
      // console.log(remainingUser);
      // console.log(users);

      const handleRemove = _id => {
            fetch(`http://localhost:5000/users/${_id}`, {
                  method: 'DELETE',
            })
                  .then(res => res.json())
                  .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                              alert('User Deleted SUccessfully');
                              const remaining = users.filter(user => user._id !== _id);
                              setRemainingUser(remaining);
                        }
                  })
      }

      return (
            <div>
                  <h3>Total Users: {remainingUser.length}</h3>
                  {
                        remainingUser.map(user =>
                              <div style={{ border: '2px solid red', padding: '10px', margin: '10px', }} key={user._id}>
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <div>
                                          <button onClick={() => handleRemove(user._id)}>remove</button>
                                          <Link to={`/update/${user._id}`}>
                                                <button>Update</button>
                                          </Link>
                                    </div>
                              </div>
                        )
                  }
            </div>
      );
};

export default Users;
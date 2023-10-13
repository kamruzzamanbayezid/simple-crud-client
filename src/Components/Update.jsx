import { useLoaderData } from "react-router-dom";

const Update = () => {

      const user = useLoaderData();
      console.log(user);

      const handleUpdate = e => {
            e.preventDefault();
            const form = e.target;
            const name = form.name.value;
            const email = form.email.value;

            const updateUser = { name, email };
            console.log(updateUser);

            fetch(`http://localhost:5000/users/${user._id}`, {
                  method: 'PUT',
                  headers: {
                        'content-type': 'application/json'
                  },
                  body: JSON.stringify(updateUser)
            })
                  .then(res => res.json())
                  .then(data => {
                        console.log(data)
                        if (data.modifiedCount > 0){
                              alert('User Updated Successfully')
                              form.reset()
                        }
                  })
      }

      return (
            <div>
                  <h2>The user we want update is {user.name}</h2>
                  <form onSubmit={handleUpdate}>
                        <input type="text" name="name" defaultValue={user.name} id="" />
                        <br />
                        <input type="email" name="email" defaultValue={user.email} id="" />
                        <br />
                        <input type="submit" value="Update" />
                  </form>
            </div>
      );
};

export default Update;
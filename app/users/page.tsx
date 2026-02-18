interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch(process.env.URL_USERS!, { cache: 'no-store' });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>Time: {new Date().toLocaleTimeString()}</p>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-2">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;

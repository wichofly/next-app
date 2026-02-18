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
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;

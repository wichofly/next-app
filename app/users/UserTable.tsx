import { sort } from 'fast-sort';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserTableProps {
  sortOrder?: string;
}

const UserTable = async ({ sortOrder }: UserTableProps) => {
  const res = await fetch(process.env.URL_USERS!, { cache: 'no-store' });
  const users: User[] = await res.json();

  const sortUsers = sort(users).asc(
    sortOrder === 'email'
      ? (user) => user.email
      : sortOrder === 'username'
        ? (user) => user.username
        : (user) => user.name,
  );

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-2">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>
              <Link href="/users?sortOrder=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=username">Username</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

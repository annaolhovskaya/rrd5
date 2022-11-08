import React from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <h1>App Layout</h1>
      <HomePage />
    </>
  );
};

const UsersLayout = () => {
  let { path, url } = useRouteMatch();
  const { userId } = useParams();

  if (url === `/users/${userId}/`) {
    return <Redirect to={`/users/${userId}/profile`} />;
  }

  return (
    <Switch>
      <Route path={path + '/:userId'} component={UserLayot} />
      <Route path={path} component={UsersListPage} />
    </Switch>
  );
};

const UserLayot = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path + '/profile'} component={UserPage} />
      <Route path={path + '/edit'} component={UserEditPage} />
      <Route exact path={path} component={UserPage} />
    </Switch>
  );
};

const HomePage = () => {
  return (
    <>
      <Link to="/users">Users List page</Link>
      <h1>Home Page</h1>
    </>
  );
};

const UsersListPage = () => {
  const users = [
    { id: 1, name: 'user 0' },
    { id: 2, name: 'user 1' },
    { id: 3, name: 'user 2' },
    { id: 4, name: 'user 3' },
    { id: 5, name: 'user 4' },
  ];

  let { url } = useRouteMatch();

  if (url === '/users/') {
    return <Redirect to="/users" />;
  }

  return (
    <>
      <Link to="/">Home Page</Link>

      <h1>Users List page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>User page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
      </ul>
      <p>userId: {userId}</p>
    </>
  );
};

const UserEditPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>Edit user page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${+userId + 1}`}>Another user</Link>
        </li>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
      </ul>
    </>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={AppLayout} />
        <Route path="/users/:userId?" component={UsersLayout} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;

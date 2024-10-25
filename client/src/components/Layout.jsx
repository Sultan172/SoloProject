import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar'

import Stack from 'react-bootstrap/Stack';




function Layout({ user, logoutHandler }) {
  return (
    <Stack direction="horizontal" gap={3}>
<NavBar user={user} logoutHandler={logoutHandler}/>
<Outlet />
    </Stack>
  );
}

export default Layout;

import { Outlet } from 'react-router';

const Layout: React.FC = (): JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;

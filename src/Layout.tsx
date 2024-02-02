import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Suspense fallback={<>Loading...</>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

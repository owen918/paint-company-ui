import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AdminPage } from './layouts/AdminPage/AdminPage';
import { NavBar } from './layouts/NavbarAndFooter/Navbar';
import { InventoryPage } from './layouts/InventoryPage/InventoryPage';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={'/'} exact>
          <Redirect to={'inventory'} />
        </Route>
        <Route path={'/inventory'}>
          <InventoryPage />
        </Route>
        <Route path={'/admin'}>
          <AdminPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

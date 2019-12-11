import Dashboard from './Dashboard';

import { createAppContainer } from 'react-navigation';
 import {createDrawerNavigator} from 'react-navigation-drawer';

const Home = createAppContainer(
    createDrawerNavigator({
    Dashboard: Dashboard,
    // Register: Register,
  })
);

export default Home;
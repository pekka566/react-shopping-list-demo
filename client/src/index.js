import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import configureStore from './store';

import ShoppingList from './containers/ShoppingList';
import { EmptyList } from './components/EmptyList';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Menu tabular size='large' attached='top'>
          <Menu.Item as={Link} color='blue' index={0} to='/'>
            Home</Menu.Item>
          <Menu.Item as={Link} color='blue' index={1} to='/empty'>
            Empty list</Menu.Item>
        </Menu>

        <Route exact path='/' component={ShoppingList} />
        <Route path='/empty' component={EmptyList} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

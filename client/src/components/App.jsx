import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { ShoppingList } from './ShoppingList';

export const App = () => (
  <div className='app'>
    <Header
      as='h1'
      content='Shopping List'
      textAlign='center'
    />
    <Container>
      <ShoppingList />
    </Container>
  </div>
);

export default App;

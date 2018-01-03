import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Segment } from 'semantic-ui-react';
import { NewItem } from '../containers/NewItem';
import { ListOfItems } from './ListOfItems';
import { fetchItems, createItem, removeItem } from '../actions';

class App extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillMount() {
    this.props.fetchItems();
  }

  handleAdd(item) {
    this.props.createItem(item);
  }

  handleRemove(itemId) {
    this.props.removeItem(itemId);
  }

  render() {
    return (
      <div className='App'>
        <Header
          as='h1'
          content='Shopping List'
          textAlign='center'
        />
        <Container>
          <Segment.Group>
            <Segment>
              <Header as='h3' content='Add new item' />
              <NewItem addAction={this.handleAdd} />
            </Segment>
            <Segment>
              <ListOfItems entries={Object.entries(this.props.items)} removeAction={this.handleRemove} />
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading,
});

const mapDispatchToProps = { fetchItems, createItem, removeItem };

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;

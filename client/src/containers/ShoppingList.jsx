import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Segment } from 'semantic-ui-react';
import { NewItem } from '../components/NewItem';
import { ListOfItems } from '../components/ListOfItems';
import { fetchItems, createItem, removeItem } from '../actions';

class ShoppingList extends Component {
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
      <div>
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

const ShoppingListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShoppingList);

export default ShoppingListContainer;

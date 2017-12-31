import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Segment } from 'semantic-ui-react';
import { NewItem } from '../containers/NewItem';
import Client from '../utils/Client';
import { ListOfItems } from './ListOfItems';
import { fetchItems } from '../actions/index';

export class ShoppingList extends Component {
  constructor() {
    super();
    const items = {};
    this.state = {
      items,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    console.log("TODO: fetch items with redux!");
  }

  componentDidMount() {
    Client.listItems((items) => {
      /* eslint-disable no-console */
      // console.info(`items: ${JSON.stringify(items)}`);
      this.setState({
        items,
      });
    });
  }

  handleAdd(item) {
    const items = this.state.items;
    items[item.id] = item;
    this.setState({
      items,
    });
    Client.addItem(item, () => {
      console.info('Item added!');
    });
  }

  handleRemove(index) {
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

    const array = Object.filter(this.state.items, item => item.id !== index);
    this.setState({
      items: array,
    });
    Client.deleteItem(index, () => {
      console.info('Item deleted!');
    });
  }

  render() {
    console.log(this);
    let items = this.state && this.state.items ? this.state.items : [];
    return (
      <Segment.Group>
        <Segment>
          <Header as='h3' content='Add new item' />
          <NewItem addAction={this.handleAdd} />
        </Segment>
        <Segment>
          <ListOfItems entries={Object.entries(items)} removeAction={this.handleRemove} />
        </Segment>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ items }) {
  return { items };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems }, dispatch);
}

export default connect(null, { fetchItems })(ShoppingList);

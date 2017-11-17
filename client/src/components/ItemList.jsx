import React, { Component } from 'react';
import { Item } from './Item';
import { NewItem } from './NewItem';
import { EmptyList } from './EmptyList';
import Client from '../utils/Client';

export class ItemList extends Component {
  constructor() {
    const items = {};
    super();
    this.state = {
      items,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

  render() {
    const entries = Object.entries(this.state.items);
    let content;
    if (entries.length === 0) {
      content = <EmptyList />;
    } else {
      /* eslint-disable no-unused-vars */
      content = Object.entries(this.state.items).map(([ key, item ]) => (<Item
        key={item.id}
        item={item}
        removeAction={this.handleRemove}
      />),
      );
    }

    return (
      <div>
        <div className='itemList'>
          <div className='items'>
            <div>
              <h1>Shopping list</h1>
            </div>
            <div>
              {content}
            </div>
          </div>
          <div className='items'>
            <div>
              <h2>Add new item</h2>
            </div>
            <div className='newItem'>
              <NewItem addAction={this.handleAdd} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemList;

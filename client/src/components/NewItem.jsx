import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import { Form, Button, Dropdown } from 'semantic-ui-react';
import styles from '../AppStyles.css.js';

const uuid = require('node-uuid');

const options = [
  { value: 'all', text: 'All' },
  { value: 'articles', text: 'Articles' },
  { value: 'products', text: 'Products' },
];

export class NewItem extends Component {
  constructor(props) {
    super(props);
    this.errors = {
      name: false,
      count: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(event, data) {
    const category = { category: data.value };
    this.setState(category);
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = this.errors;
    errors.name = this.name.value.trim().length === 0;
    errors.count = this.count.value.length === 0;
    if (errors.name || errors.count) {
      // do nothing
    } else {
      const category = this.state ? this.state.category : '';
      const item = {
        id: uuid.v4(),
        date: new Date(),
        name: this.name.value.trim(),
        count: this.count.value,
        category,
      };
      this.props.addAction(item);
    }
    this.setState(errors);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label
            htmlFor='count' {...this.errors.count && { style: styles.error }}
          >Count:</label>
          <input
            type='number' name='count' ref={input => this.count = input} // eslint-disable-line no-return-assign
            min='1' max='999' defaultValue='1'
          />
        </Form.Field>
        <Form.Field>
          <label
            htmlFor='name' {...this.errors.name && { style: styles.error }}
          >Name:</label>
          <input
            type='text' name='name' ref={input => this.name = input} // eslint-disable-line no-return-assign
          />
        </Form.Field>
        <Form.Field>
          <label
            htmlFor='category'
          >Category:</label>
          <Dropdown
            placeholder='Select...'
            selection
            search
            options={options}
            onChange={this.changeCategory}
          />
        </Form.Field>
        <Button type='submit' content='Add' />
      </Form>
    );
  }
}

NewItem.propTypes = {
  addAction: PropTypes.func.isRequired,
};

export default NewItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

const uuid = require('node-uuid');

export class NewItem extends Component {
  constructor(props) {
    super(props);
    this.errors = {
      name: false,
      count: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = this.errors;
    errors.name = this.name.value.trim().length === 0;
    errors.count = this.count.value.length === 0;
    if (errors.name || errors.count) {
      // do nothing
    } else {
      const item = {
        id: uuid.v4(),
        date: new Date(),
        name: this.name.value.trim(),
        count: this.count.value,
      };
      this.props.addAction(item);
    }
    this.setState(errors);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label
            htmlFor='count' className={this.errors.count ? 'error' : 'ok'}
          >Count:</label>
          <input
            type='number' name='count' ref={input => this.count = input} // eslint-disable-line no-return-assign
            min='1' max='999' defaultValue='1'
          />
        </div>
        <div>
          <label
            htmlFor='name' className={this.errors.name ? 'error' : 'ok'}
          >Name:</label>
          <input
            type='text' name='name' ref={input => this.name = input} // eslint-disable-line no-return-assign
          />
        </div>
        <div className='buttonDiv'>
          <button
            type='button' id='submitButton' onClick={this.handleSubmit}
          >Add</button>
        </div>
      </form>
    );
  }
}

NewItem.propTypes = {
  addAction: PropTypes.func.isRequired,
};

export default NewItem;

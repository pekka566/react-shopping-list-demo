import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

export class Item extends React.Component {
  handleClick = index => (e) => {
    e.preventDefault();
    this.props.removeAction(index);
  }

  render() {
    const {
      id,
      count,
      name: title,
    } = this.props.item;

    return (
      <div className='item'>
        <span>{count} </span>
        <span>{title}</span>
        <a
          href=''
          className='itemRemove' onClick={this.handleClick(id)}
        >Remove</a>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Item;

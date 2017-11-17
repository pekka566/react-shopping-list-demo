/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Item } from './components/Item';
import { ItemList } from './components/ItemList';
import { NewItem } from './components/NewItem';
import { EmptyList } from './components/EmptyList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
});

describe('Item', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Item item={{ test: 'me' }} key='0' />, div);
  });
});

describe('ItemList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemList />, div);
  });
});

describe('EmptyList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmptyList />, div);
  });
});

describe('NewItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const addItem = () => {};
    ReactDOM.render(<NewItem addAction={addItem} />, div);
  });
});

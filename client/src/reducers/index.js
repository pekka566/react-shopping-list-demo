import { combineReducers } from 'redux';
import ItemReducer from './reducer_item';

const rootReducer = combineReducers({
  item: ItemReducer,
});

export default rootReducer;

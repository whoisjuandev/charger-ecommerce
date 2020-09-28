import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Provider from './provider';
import thunk from 'redux-thunk';
import {saveState} from '../localStorage';

export const store = createStore(Provider, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe( function () {
  saveState(store.getState().cart)
})

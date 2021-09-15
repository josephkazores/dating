import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import { reducers } from './redux'

const rootReducer = combineReducers(reducers)

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

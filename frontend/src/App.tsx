import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/authentification/Authentification';
import Home from './components/home/Index';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import user from './redux/user';
import popup from './redux/popup';
import navbar from './redux/navbar';
import CoursePage from './components/course/coursePage';
import GuidePage from './components/guide/guidePage';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

function App() {

    // create the local storage
    const reducers = combineReducers({ user, popup, navbar })
    const persistConfig = {key: 'root', storage};

    // build the local storage
    const store = configureStore({
        reducer: persistReducer(persistConfig, reducers),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });

    // create the persist local storage
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Routes>
                        <Route path="/authentification" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/course" element={<CoursePage />} />
                        <Route path="/guide" element={<GuidePage />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;

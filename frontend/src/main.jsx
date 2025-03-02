import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './components/GlobalStyle/index.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/Store/index.jsx';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyle>
                    <App />
                </GlobalStyle>
            </PersistGate>
        </Provider>
    </StrictMode>,
);

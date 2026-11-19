import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { NoticeProvider } from './context/NoticeContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { store } from './store';

// Không dùng <React.StrictMode> để bộ đếm "Số lần render" không bị nhân đôi
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <NoticeProvider>
        <App />
      </NoticeProvider>
    </ThemeProvider>
  </Provider>
);

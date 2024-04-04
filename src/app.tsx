import './app.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import About from './pages/about';
import Home from './pages/home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
    </Router>
  );
}

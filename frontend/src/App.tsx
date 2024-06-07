import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layout/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
      </Routes>
    </Router>
  );
};

export default App
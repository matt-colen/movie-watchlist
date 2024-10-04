import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchPage from "./components/SearchPage";
import Watchlist from "./components/Watchlist";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

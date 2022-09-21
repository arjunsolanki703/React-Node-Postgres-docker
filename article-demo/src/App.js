import "./App.css";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./pages/articlesList";
import Article from "./pages/article";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { useState } from "react";
function App() {
  const [orderascending, setorderascending] = useState(true);
  return (
    <div className="App">
      <NavBar
        orderascending={orderascending}
        setorderascending={setorderascending}
      />
      <Routes>
        <Route
          path="/"
          element={<ArticlesList orderascending={orderascending} />}
        />
        <Route
          path="/articles"
          element={<ArticlesList orderascending={orderascending} />}
        />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;

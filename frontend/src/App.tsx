import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import Cart from "./Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

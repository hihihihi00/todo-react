import Home from "./page/home/home";
import DetailTodo from "./modules/DetailTodo";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<DetailTodo />} />
    </Routes>
  );
};

export default App;

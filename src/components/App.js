import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';
import Login from './Login';
import '../index.scss'
import Header from './Header';
import { useState } from 'react';



function App() {
  const [userName, setUserName] = useState("");

  console.log(userName)

  const handleName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login change={handleName} name={userName} />}></Route>
        <Route path="/chat" element={<ChatPage nickname={userName} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

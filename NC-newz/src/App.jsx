import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import './App.css'
import { Header } from './components/Header'
import { UserProvider } from '../Contexts/User'
import { HomePosts } from './components/HomePosts'
import { SingleArticle } from './components/SingleArticle';

function App() {
  const [searchTerm, setSearchTerm] = useState([])

  return <>
    <UserProvider> <Header setSearchTerm={setSearchTerm} /></UserProvider>
    <Routes>
      <Route path="/" element={<HomePosts />}></Route>
      <Route path='/articles/:article_id' element={<SingleArticle />}></Route>
    </Routes>

  </>
}

export default App

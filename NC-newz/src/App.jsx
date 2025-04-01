import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { UserProvider } from '../Contexts/User'
import { HomePosts } from './components/HomePosts'

function App() {
  return <>
  <UserProvider><Header/></UserProvider>
  <HomePosts />
  <Route></Route>
  </>
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Homepage from './pages/Homepage'
import Gallery from './pages/Gallery'
import PromptDetail from './pages/PromptDetail'
import SearchResults from './pages/SearchResults'
import Trending from './pages/Trending'
import Category from './pages/Category'
import Favorites from './pages/Favorites'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/prompts/:slug" element={<PromptDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

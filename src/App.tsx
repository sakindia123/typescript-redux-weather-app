import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Favourites from './components/favourites/Favourites'
import Search from './components/search/Search'
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
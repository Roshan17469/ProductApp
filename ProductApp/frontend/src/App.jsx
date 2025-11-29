import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserList from './pages/UserList'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>User Management System</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<UserList />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  )
}

export default App


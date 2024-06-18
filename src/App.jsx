import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import { useDispatch } from "react-redux"
import { localToState } from "./store/newsSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(localToState(JSON.parse(localStorage.getItem('liked'))))
  }, [])

  return (
    <main className="max-w-7xl py-5 px-4 mx-auto">
      <HomePage />
    </main>
  )
}

export default App

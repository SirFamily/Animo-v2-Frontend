import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";


function App() {

  const {loading} = useAuth()

  if(loading) {
    return (
      <span>Loding</span>
    )
  }
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App

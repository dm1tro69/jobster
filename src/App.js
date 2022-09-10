import Landing from "./pages/Landing";
import {Error,  Register} from './pages'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {AddJob, AllJob, Profile, SharedLayout, Stats} from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
                <Route index element={<Stats/>}/>
                <Route path={'/all-jobs'} element={<AllJob/>}/>
                <Route path={'/add-jobs'} element={<AddJob/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
            </Route>
            <Route path={'/landing'} element={<Landing/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
        <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;

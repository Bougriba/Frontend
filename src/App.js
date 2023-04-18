import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/Login';
import UserDashboard from './pages/user/RecruiterDashboard';
import UserRoute from './component/UserRoute';
import AdminRoute from './component/AdminRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/JobhistoryDashboard';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDadhboard from './pages/admin/AdminDadhboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs'
import Register from './pages/Register';

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC=Layout(UserJobsHistory)
const UserInfoDashboardHOC = Layout(UserInfoDashboard)
const AdminDadhboardHOC = Layout(AdminDadhboard)
const DashUsersHOC = Layout(DashUsers)
const DashJobsHOC = Layout(DashJobs)
const App = () => {

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/search/location/:location' element={<Home />} />
                           <Route path='/search/tag/:tagFilter' element={<Home />} />
                           <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path="/admin/dashboard" element={<AdminRoute><AdminDadhboardHOC /></AdminRoute>} />
                            <Route path="/admin/users" element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path="/admin/jobs" element={<AdminRoute><DashJobsHOC/></AdminRoute>} />
                            <Route path='/recruiter/dashboard' element={<UserRoute>< UserDashboardHOC /></UserRoute>} />
                            <Route path='/job_seeker/dashboard' element={<UserRoute>< UserDashboardHOC /></UserRoute>} />
                            <Route path='/recruiter/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC/></UserRoute>} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App
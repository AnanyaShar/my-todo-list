import {Routes, Route } from 'react-router-dom';
import Login from '../../screens/Login/Login';
import Registration from '../../screens/Register/Registration';
import DashBoard from '../../screens/DashBoard/DashBoard';

const AppRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Registration />} />
            <Route exact path='/dashboard/:userId' element={<DashBoard />} />
        </Routes>
    )
}

export default AppRouter
import React from 'react';
import SideNav from './component/SideNav';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Liked from './pages/Liked';
import Follow from './pages/Follow';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/liked" exact element={<Liked />}></Route>
                    <Route path="/follow" exact element={<Follow />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
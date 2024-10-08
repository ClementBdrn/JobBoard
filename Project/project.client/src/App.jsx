import React from 'react';
import SideNav from './component/SideNav';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Setting from './pages/Setting';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/about" exact element={<About />}></Route>
                    <Route path="/setting" exact element={<Setting />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
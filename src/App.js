import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';

import Browse from './Browse';
import Books from './Books';
import Collectables from './Collectables';
import Electronics from './Electronics';

import Cart from './Cart';
import Error from "./Error";
import Login from "./Login";
import MyOrders from "./MyOrders";
import ComMyProfile from "./ComMyProfile";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/books" element={<Books />} />
                <Route path="/collectables" element={<Collectables />} />
                <Route path="/electronics" element={<Electronics />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/commyprofile" element={<ComMyProfile />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
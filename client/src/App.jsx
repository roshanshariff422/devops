import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddListing from "./pages/AddListing";
import BrowseItems from "./pages/BrowseItems";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import ProductDetails from "./pages/ProductDetails";
import Messages from "./pages/Messages";


function App() {
  return (

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

  );
}

export default App;
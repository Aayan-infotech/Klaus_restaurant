import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ManagerManagement } from "./components/ManagerManagement";
import { AllergensManagement } from "./components/AllergensManagement";
import { MenuManagement } from "./components/MenuManagement";
import MyDashboard from "./components/MyDashboard";
import { AllMenuItems } from "./components/AllMenuItems";
import { SubMenuItemsDetails } from "./components/SubMenuItemsDetails";
import { AllMenuCategories } from "./components/AllMenuCategories";
import { RecentMenuDetails } from "./components/RecentMenuDetails";
import { ManagerDetails } from "./components/ManagerDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import {SubMenuCategory} from "./components/SubMenuCategory";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="" element={<MyDashboard />} />
          <Route path="manager-management" element={<ManagerManagement />} />
          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="allergens-management" element={<AllergensManagement />} />
          <Route path="recent-menu-list/:id" element={<AllMenuItems />} />
          <Route path="recent-submenu" element={<SubMenuItemsDetails />} />
          <Route path="all-categories/:id" element={<AllMenuCategories />} />
          {/* <Route path="sub-category/:menuId/:categoryId" element={<SubMenuCategory />} /> */}
          <Route path="sub-category" element={<SubMenuCategory />} />
          <Route path="recent-menu-details" element={<RecentMenuDetails />} />
          <Route path="manager-details" element={<ManagerDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

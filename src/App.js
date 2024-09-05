// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Sidebar } from "./components/Sidebar";
// import { Navbar } from "./components/Navbar";
// import MyDashboard from "./components/MyDashboard";
// import { ManagerManagement } from "./components/ManagerManagement";
// import { MenuManagement } from "./components/MenuManagement";
// import { AllergensManagement } from "./components/AllergensManagement";
// import { Home } from "./components/Home";
// import { AllMenuItems } from "./components/AllMenuItems";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { SubMenuItemsDetails } from "./components/SubMenuItemsDetails";
// import { MenuManagementDetails } from "./components/MenuManagementDetails";
// import { RecentMenuDetails } from "./components/RecentMenuDetails";
// import { ManagerDetails } from "./components/ManagerDetails";

// const drawerWidth = 300;

// function App() {
//   const [drawerOpen, setDrawerOpen] = useState(true);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route path="*" element={
//             <>
//               <div style={{ flexGrow: 1, marginLeft: drawerOpen ? `${drawerWidth}px` : "0px", transition: "margin-left 0.3s ease", backgroundColor: "#272437", overflowX: "hidden", }}>
//                 <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
//                 <Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
//                 <main style={{ padding: "1rem", transition: "width 0.3s ease", marginTop: "64px", }} >
//                   <Routes>
//                     <Route path="/my-Dashboard" element={<MyDashboard />} />
//                     <Route path="/manager-management" element={<ManagerManagement />} />
//                     <Route path="/menu-management" element={<MenuManagement />} />
//                     <Route path="/allergens-management" element={<AllergensManagement />} />
//                     <Route path="/recent-menu-list" element={<AllMenuItems />} />
//                     <Route path="/recent-submenu/:id" element={<SubMenuItemsDetails />} />
//                     <Route path="/menu-details" element={<MenuManagementDetails />} />
//                     <Route path="/recent-menu-details" element={<RecentMenuDetails />} />
//                     <Route path="/manager-details" element={<ManagerDetails />} />
//                   </Routes>
//                 </main>
//               </div>
//             </>
//           } /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

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
import { MenuManagementDetails } from "./components/MenuManagementDetails";
import { RecentMenuDetails } from "./components/RecentMenuDetails";
import { ManagerDetails } from "./components/ManagerDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="recent-menu-list" element={<AllMenuItems />} />
          <Route path="recent-submenu/:id" element={<SubMenuItemsDetails />} />
          <Route path="menu-details" element={<MenuManagementDetails />} />
          <Route path="recent-menu-details" element={<RecentMenuDetails />} />
          <Route path="manager-details" element={<ManagerDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

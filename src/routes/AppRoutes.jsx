// // src/routes/AppRoutes.jsx
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import Inventory from "../pages/Inventory";
// import Reports from "../pages/Reports";
// import Suppliers from "../pages/Suppliers";
// import Orders from "../pages/Orders";
// import ManageStore from "../pages/ManageStore";
// import Login from "../pages/Login";
// import InventorySnapshot from "../pages/InventorySnapshot";
// import Retail from "../pages/Retail";
// import QuickCommerce from "../pages/QuickCommerce";

// const isAuthenticated = () => {
//   return localStorage.getItem("isLoggedIn") === "true";
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/" element={<Login />} />

//       {/* Protected Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated() ? <Dashboard /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/inventory"
//         element={
//           isAuthenticated() ? <Inventory /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/retail"
//         element={
//           isAuthenticated() ? <Retail /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/quick-commerce"
//         element={
//           isAuthenticated() ? <QuickCommerce /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           isAuthenticated() ? <Orders /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/reports"
//         element={
//           isAuthenticated() ? <Reports /> : <Navigate to="/" replace />
//         }
//       />
//       <Route
//         path="/suppliers"
//         element={
//           isAuthenticated() ? <Suppliers /> : <Navigate to="/" replace />
//         }
//       />
      
//       <Route
//         path="/manage-store"
//         element={
//           isAuthenticated() ? <ManageStore /> : <Navigate to="/" replace />
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;



// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";
import Suppliers from "../pages/Suppliers";
import Orders from "../pages/Orders";
import ManageStore from "../pages/ManageStore";
import Login from "../pages/Login";
import InventorySnapshot from "../pages/InventorySnapshot";
import Retail from "../pages/Retail";
import QuickCommerce from "../pages/QuickCommerce";
import ChannelDashboard from "../pages/ChannelPerformance";

const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? <Dashboard /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/inventory"
        element={
          isAuthenticated() ? <Inventory /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/retail"
        element={
          isAuthenticated() ? <Retail /> : <Navigate to="/" replace />
        }
      />
      {/* <Route
        path="/quick-commerce"
        element={
          isAuthenticated() ? <QuickCommerce /> : <Navigate to="/" replace />
        }
      >
        <Route index element={<QuickCommerce defaultTab="quickCommerce" />} />
        <Route path="channel-performance" element={<QuickCommerce defaultTab="channelPerformance" />} />
        <Route path="channel/:channelName" element={<ChannelDashboard />} />
      </Route> */}
      <Route
      path="/quick-commerce"
      element={
        isAuthenticated() ? <QuickCommerce /> : <Navigate to="/" replace />
      }
    >
      <Route index element={<QuickCommerce defaultTab="quickCommerce" />} />
      <Route path="channel-performance" element={<QuickCommerce defaultTab="channelPerformance" />} />
      <Route path="channel/:channelName" element={<ChannelDashboard />} />
    </Route>
      <Route
        path="/orders"
        element={
          isAuthenticated() ? <Orders /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/reports"
        element={
          isAuthenticated() ? <Reports /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/suppliers"
        element={
          isAuthenticated() ? <Suppliers /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/manage-store"
        element={
          isAuthenticated() ? <ManageStore /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
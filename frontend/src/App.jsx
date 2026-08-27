import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Navbar, ToastProvider, LeftSidebar } from './components';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Aliases from './pages/Aliases';
import Settings from './pages/Settings';
import Logins from './pages/Logins';
import Profile from './pages/Profile';
import Login from './pages/Login';

import Container from 'react-bootstrap/Container'; // Import Container
import Row from 'react-bootstrap/Row'; // Import Row
import Col from 'react-bootstrap/Col'; // Import Col

import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth'; // must include any elements that will interact with auth

// 1. Create a specialized layout wrapper strictly for Authenticated states
const ProtectedLayout = () => {
  return (
    <div className="app-viewport-wrapper">
      <Navbar />
      {/* Container fluid holds our two side-by-side sections */}
      <Container fluid className="app-content-container p-0">
        <div className="app-layout-body">
          {/* Sidebar controls its own width now */}
          <div className="sidebar-col">
            <LeftSidebar />
          </div>
          {/* Main content expands to fill all remaining horizontal space */}
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </Container>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public Route: Wipes the screen completely clean of Navbars and Sidebars */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes: Nesting them inside the layout guards everything simultaneously */}
          <Route
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard key="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
            <Route
              path="/logins"
              element={
                <ProtectedRoute isAdmin>
                  <Logins key="logins" />
                </ProtectedRoute>
              }
            />
            <Route path="/accounts" element={<Accounts key="accounts" />} />
            <Route path="/aliases" element={<Aliases key="aliases" />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute isAdmin>
                  <Settings key="settings" />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile key="profile" />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
export default App;

// const ProtectedLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Container fluid>
//         <Row>
//           <Col md={2} className="p-0 sidebar-col">
//             <LeftSidebar />
//           </Col>
//           <Col md={10} className="main-content">
//             {/* Outlet acts as a portal that swaps your sub-pages in dynamically */}
//             <Outlet />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//     <div>
//       <Navbar />
//       <Container fluid>
//         <Row>

//           <Col md={2} className="p-0 sidebar-col">{' '}
//             <LeftSidebar />
//           </Col>

//           <Col md={10} className="main-content">{' '}
//               <Routes>
//                 <Route path="/"           element={<ProtectedRoute>        <Dashboard key="dashboard" /></ProtectedRoute>} />
//                 <Route path="/login"      element={                        <Login          />} />
//                 <Route path="/dashboard"  element={<ProtectedRoute        ><Dashboard key="dashboard" /></ProtectedRoute>} />
//                 <Route path="/logins"     element={<ProtectedRoute isAdmin><Logins    key="logins"    /></ProtectedRoute>} />
//                 <Route path="/accounts"   element={<ProtectedRoute        ><Accounts  key="accounts"  /></ProtectedRoute>} />
//                 <Route path="/aliases"    element={<ProtectedRoute        ><Aliases   key="aliases"   /></ProtectedRoute>} />
//                 <Route path="/settings"   element={<ProtectedRoute isAdmin><Settings  key="settings"  /></ProtectedRoute>} />
//                 <Route path="/profile"    element={<ProtectedRoute        ><Profile   key="profile"   /></ProtectedRoute>} />
//               </Routes>
//           </Col>{' '}

//         </Row>{' '}

//       </Container>{' '}

//     </div>
//     </AuthProvider>
//   );
// }

// const ProtectedLayout = () => {
//   return (
//     <div className="app-viewport-wrapper">
//       <Navbar />
//       {/* Container fluid holds two side-by-side sections */}
//       <Container fluid className="app-content-container">
//         <Row className="h-100 align-items-stretch">
//           <Col md={2} className="p-0 sidebar-col position-sticky top-0 align-self-start">
//             <LeftSidebar />
//           </Col>
//           <Col md={10} className="main-content">
//             {/* Outlet acts as a portal that swaps your sub-pages in dynamically */}
//             <Outlet />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

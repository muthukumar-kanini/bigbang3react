import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInSide from './Component/SignInSide';
import Header from './Component/AHeader';
import SignInSideUser from './Component/SignInSideUser';
import SignUp from './Component/SignUp';


import { ProSidebar, ProSidebarProvider } from 'react-pro-sidebar';

import Bookings from './Component/Bookings';
import PaymentForm from './Component/PaymentForm';

import Adminn from './AdminComponents/Adminn';
import Card from './AdminComponents/Card';
import CardNew from './AdminComponents/Card';

import AgentDrawerComp from './AgentComponent/AgentDrawerComp';
import Agent from './AgentComponent/Agent';
import AgentCard from './AgentComponent/AgentCard';
import AdminGallery from './AdminComponents/AdminGallery';
import Agentpost from './AgentComponent/Agentpost';
import AgentSignIn from './AgentComponent/AgentSignIn';
import InvoiceComponent from './Component/InvoiceComponent';

import Contact from './Component/Contact';
import AdminDashboardProtected from './AdminComponents/AdminDashboardProtected';






const App = () => {
  const token = localStorage.getItem('token')
  return (
    <Router>
       <ProSidebarProvider>
      <Routes>
        <Route path="/" element={<AdminDashboardProtected token={token}><Header/></AdminDashboardProtected>} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/loginuser" element={<SignInSideUser />} />
        <Route path="/agentlogin" element={<AgentSignIn />} />
        <Route path="/Signup" element={<SignUp />} />
       
        <Route path="/Bookings" element={<Bookings/>} />
        <Route path="/Payment" element={<PaymentForm/>} />
        <Route path="/Adminn" element={<Adminn/>} />
        <Route path="/Card" element={<CardNew/>} />


        {/* agent */}
        <Route path="/Agent" element={<Agent/>} />
        <Route path="/Agentcard" element={<AgentCard/>} />
        {/* <Route path="/invoice" element={<InvoiceComponent/>} /> */}
        <Route path="/Admingallery" element={<AdminGallery/>} />
        <Route path="/Agentpost" element={<Agentpost/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<Home/>} />
        

        
      
      </Routes>
      </ProSidebarProvider>
    </Router>
  );
};

export default App;

function Home(){
  return(
      <div>Page not found</div>
  )
}

import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import ApprovalSuccess from '../views/smartconTables/ApprovalSuccess';

const VerifyRoute = () => {
  return (
    <Routes>
        <Route path="/ApprovalSuccess/:leaveId" element={<ApprovalSuccess/>}></Route>
    </Routes>
  );
};

export default VerifyRoute;

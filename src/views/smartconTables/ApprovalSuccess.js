
import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';


const ApprovalSuccess = () => {
 

  const {leaveId}=useParams();
  //const { pathname } = location;
  //state variable
  const [leavesDetails, setLeavesDetails] = useState({});
  console.log( 'leavesDetails',leavesDetails)
 // const { pathname } = location;

  //const history=useHistory();
  
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
  
    useEffect(() => {
      // const urlSearchParams = new URLSearchParams(location?.search);
      // const query = urlSearchParams.get("leaveId")? urlSearchParams.get("leaveId"):null;
      // console.log('query',query)
      // console.log('urlSearchParams',urlSearchParams)
      // const q = query!==null ?query:'';
      // console.log('q',q)
      // const leaveId=q.replaceAll('"', '');
      // console.log('leaveId',leaveId)
      api
          .post("commonApi/resetVerification", {  Leaves: leaveId })
          .then(() => {
            console.log('leaveId',leaveId)
           console.log('leavesDetails',leavesDetails)
            api
            .post('/leave/getLeaveByid', { leave_id: leaveId })
            .then((res) => {
              setLeavesDetails(res.data.data[0]);
              setSuccess(true)
              console.log('leavesDetails',leavesDetails.email)
              const to = res.data.data[0].email; 
              const subject = "Leave Confirm Mail";
              const name = res.data.data[0].employee_name
            const fromDate = res.data.data[0].from_date;
            const toDate = res.data.data[0].to_date;
            const leaveType = res.data.data[0].leave_type;
            api
              .post('/commonApi/sendUseremailStaff', {
                to,
                subject,
                fromDate,
                toDate,
                leaveType,
                name,
              })
              .then(response => {
                if (response.status === 200) {
                  alert('Leave Confirm Email Sent successfully');
                } else {
                  console.error('Error');
                }
              });
      
            })
            .catch(() => {
             
            });
          })
          .catch((err) => {
            setError(true)
            console.log(err);
          });
    }, []);
 
  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        
         {success && 
        
        <div>
             <i  style={{ marginLeft :700, color:"green", fontSize: 150,fontStyle:'bold'}} className="checkmark order-i">✓</i>
        <h4  
        style={{ textAlign :"center", color:"green", fontSize: 50,fontStyle:'bold'}} >Leave is Approved </h4>
        </div>}
       {error && 
       <div>
       <h4>Your Account is not verified</h4>
       </div>} 
    
      </div>
    </div>
  );
};

export default ApprovalSuccess;

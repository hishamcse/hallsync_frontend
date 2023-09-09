// components/ComplaintView.js
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_COMPLAINTS,
  GET_COMPLAINT_BY_TYPE,
  GET_COMPLAINT_FROM_DATE,
  GET_COMPLAINT_BY_STD_ID,
} from "../../graphql/operations";
import { MyDatePicker } from "../DatePicker";
import useResidencyStatus from "../../hooks/useResidencyStatus";
import MyCard from "../card";
import { ComplaintTypeDropDown } from "./complaintTypeDropDown";
import { Dayjs } from "dayjs";





const ComplaintView = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null); // State for date filter 
  const [complaintType, setComplaintType] = useState(""); // State for complaint type filter
  const [studentId, setStudentId] = useState(""); // State for student ID filter
  const { attached, resident, messManager, authority } = useResidencyStatus();

  const { data, loading, error } = useQuery(GET_COMPLAINTS, {
    // Fetch all complaints
    fetchPolicy: "network-only",
    });
    const { data: complaintTypeData, loading: complaintTypeLoading, error: complaintTypeError } = useQuery(GET_COMPLAINT_BY_TYPE, {
        // Fetch all complaints
        fetchPolicy: "network-only",
    });
    const { data: complaintDateData, loading: complaintDateLoading, error: complaintDateError } = useQuery(GET_COMPLAINT_FROM_DATE, {
        // Fetch all complaints
        fetchPolicy: "network-only",
    });
    const { data: complaintStudentIdData, loading: complaintStudentIdLoading, error: complaintStudentIdError } = useQuery(GET_COMPLAINT_BY_STD_ID, {
        // Fetch all complaints
        fetchPolicy: "network-only",
    });
    if (loading || complaintTypeLoading || complaintDateLoading || complaintStudentIdLoading) return <p>Loading...</p>;
    
    

  // Filter complaints based on user roles
  const filteredComplaints = data?.getComplaints.filter((complaint) => {
    if (resident) {
      // Students and residents can view all complaints
        // and add complaints
      
        
      return true;
    } else if ((authority && !messManager) || attached) {
      // Provosts and students with attached role can view complaints
      // but not add complaints
      return true;
    }
    // Handle other roles if needed
    return false;
  });



  // Handle filtering based on the selected date
  const handleDateFilter = () => {
    if (startDate) {
        // Use the GET_COMPLAINT_FROM_DATE query to fetch complaints from date

    } else {
        // Handle case when no date is selected
    }
    

  // Handle filtering based on complaint type
  const handleTypeFilter = () => {
    if (complaintType) {
      // Use the GET_COMPLAINT_BY_TYPE query to fetch complaints by type
    } else {
      // Handle case when no type is selected
    }
  };

  // Handle filtering based on student ID
  const handleStudentIdFilter = () => {
    if (studentId) {
      // Use the GET_COMPLAINT_BY_STD_ID query to fetch complaints by student ID
    } else {
      // Handle case when no student ID is entered
    }
  };

  return (
    <div>
      {/* Date picker */}
        <MyDatePicker
            date = {startDate}
            handleDate = {setStartDate}
        />
        <button onClick={handleDateFilter}>Filter by Date</button>


        {/* Student ID filter */}
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
      />
      
        <button onClick={handleStudentIdFilter}>Filter by Student ID</button>


      {/* Complaint type dropdown */}
        <ComplaintTypeDropDown val={complaintType} setVal={setComplaintType} />
        <button onClick={handleTypeFilter}>Filter by Type</button>



      <select
        value={complaintType}
        onChange={(e) => setComplaintType(e.target.value)}
      >
        <option value="">Select Complaint Type</option>
        {/* Populate options based on complaint types */}
        


    
      </select>
      <button onClick={handleTypeFilter}>Filter by Type</button>

      



      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={handleStudentIdFilter}>Filter by Student ID</button>

      {/* Display filtered complaints */}
      <div>
        {filteredComplaints?.map((complaint) => (
          <div key={complaint.complaintId}>
            {/* Render complaint card */}
            {/* You can create a separate ComplaintCard component */}
            <h3>{complaint.title}</h3>
            <p>{complaint.details}</p>
            {/* Add more complaint details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

}

export default ComplaintView;

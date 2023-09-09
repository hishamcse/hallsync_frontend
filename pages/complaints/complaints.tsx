import Complaints from "../../components/Complaints/complaints";
import useResidencyStatus from "../../hooks/useResidencyStatus";
import ComplaintsP from "../../components/Complaints/complaintsP";

const ComplaintPage = () => {

    const {authority, resident} = useResidencyStatus();

    return (
        <div className='contentRoot'>
            {
                resident &&
                <Complaints />
            }
            {
                authority &&
                <ComplaintsP />
            }
        </div>
    )
}

export default ComplaintPage;
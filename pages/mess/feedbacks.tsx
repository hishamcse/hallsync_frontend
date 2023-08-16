import { GiveFeedback } from "../../components/GiveFeedback";
import { RatingBarChart } from "../../components/RatingsStat";
import useResidencyStatus from "../../hooks/useResidencyStatus";

export default function Feedback(){


    const {messManager, resident, authority} = useResidencyStatus()

    return (
        <div className="contentRoot">
            
            {
                resident && !messManager &&
                <GiveFeedback />
            }
            {
                (authority || messManager) && 
                <RatingBarChart />
            }


            
        </div>
    )
}
import { GiveFeedback } from "../../components/StatAndFeedback/GiveFeedback";
import { RatingBarChart } from "../../components/StatAndFeedback/RatingsStat";
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
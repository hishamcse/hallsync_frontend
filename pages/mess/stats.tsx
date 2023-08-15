import { OptInPieChart } from "../../components/OptInPieChart";
import { MealPreferencesBarChart } from "../../components/PreferencesBarChart";

export default function StatsView(){

    return (
        <div className="contentRoot">
            <OptInPieChart />
            <MealPreferencesBarChart />
        </div>
    )
}
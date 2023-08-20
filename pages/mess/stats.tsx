import { AbsenteesBarChart } from "../../components/StatAndFeedback/AbsenteesBarChart";
import { OptInPieChart } from "../../components/StatAndFeedback/OptInPieChart";
import ParticipationBarChart from "../../components/StatAndFeedback/ParticipationBarChart";
import { MealPreferencesBarChart } from "../../components/StatAndFeedback/PreferencesBarChart";
import useResidencyStatus from "../../hooks/useResidencyStatus";
import styles from '../../styles/stats.module.scss'

export default function StatsView(){

    let {messManager, authority} = useResidencyStatus()

    return (
        <div className="contentRoot">
            <div className={styles.rootContainer}>
                {   messManager &&
                    <div>
                        <OptInPieChart />
                    </div>
                }
                {
                    messManager &&
                    <div>
                        <MealPreferencesBarChart />
                    </div>
                }
                {
                    authority &&
                    <div>
                        <ParticipationBarChart />
                    </div>
                }
                {
                    authority &&
                    <div>
                        <AbsenteesBarChart />
                    </div>
                }
            </div>
        </div>
    )
}
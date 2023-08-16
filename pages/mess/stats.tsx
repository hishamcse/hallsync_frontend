import { AbsenteesBarChart } from "../../components/AbsenteesBarChart";
import { OptInPieChart } from "../../components/OptInPieChart";
import ParticipationBarChart from "../../components/ParticipationBarChart";
import { MealPreferencesBarChart } from "../../components/PreferencesBarChart";
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
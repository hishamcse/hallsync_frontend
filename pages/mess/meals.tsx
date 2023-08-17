import MealView from "../../components/StudentMeals/meals";
import useResidencyStatus from "../../hooks/useResidencyStatus";
import ManagerMealView from "../../components/ManagerMeals/managerMeals";


function CreateMealView(){

    const {messManager, resident, authority} = useResidencyStatus();

    return (
        <div className={"contentRoot"}>
            {
                resident && !messManager &&
                <MealView />
            }
            {
                messManager &&
                <ManagerMealView />
            }
        </div>
    )
}

export default CreateMealView;


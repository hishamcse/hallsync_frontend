// import { RocketInventoryList } from "../components/client";

// function Mess(){
//     return (
//         <div style={{
//             height : "1000px",
//             backgroundColor : "green"
//         }}>
//             Mess
//             <RocketInventoryList />
//         </div>
//     )
// }

// export default Mess;

import MealView from "../components/Meals/meals";
//import StudentView from "../components/Meals/meals";

function CreateMealView(){
    return (
        <div className={"contentRoot"}>
            <MealView />
        </div>
    )
}

export default CreateMealView;
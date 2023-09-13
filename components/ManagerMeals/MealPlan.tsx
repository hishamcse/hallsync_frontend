import {GetMealPlansQuery} from "../../graphql/__generated__/graphql";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const SingleMealPlanView = (props: { mealPlan: GetMealPlansQuery['getMealPlans'][0] }) => {

    const importedImgPath = (imgName: string) => {
        return "/images/" + imgName;
    }

    return (
        <div>
            <Typography style={{marginTop: 15, marginBottom: 5}}>
                <b>{props.mealPlan.mealTime.toString()}</b>
            </Typography>

            <div style={{borderTop: "1px solid #ccc"}}>
                <div style={{display: "flex", margin: "16px"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: 'space-between', margin: 10}}>
                        {props.mealPlan.meal.items.map((item, index: number) => {
                                let cupcountA = props.mealPlan.cupCount.filter(c => c.itemId == item.itemId);
                                let cupcount = "NA"
                                if (cupcountA.length > 0) {
                                    cupcount = cupcountA[0].cupcount.toString();
                                }
                                return (
                                    <div key={index} style={{margin: 10}}>
                                        <Image src={importedImgPath(item.photo?.file.fileName ?? 'default.png')}
                                               alt='foodItem'
                                               width={820 / props.mealPlan.meal.items.length}
                                               height={650 / props.mealPlan.meal.items.length}/>
                                        <Typography variant="body2" textAlign='center'>
                                            {item.name}
                                            {item.type.toString().toLowerCase() != 'rice' &&
                                            item.type.toString().toLowerCase() != 'veg' ?
                                                `(${cupcount} cups)` : ""}
                                        </Typography>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleMealPlanView;
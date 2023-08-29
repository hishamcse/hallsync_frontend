import { Typography } from "@mui/material";
import { GetMealPlansQuery } from "../graphql/__generated__/graphql";
import Image from "next/image";

export function MealItem(props : {
    imagePath : string,
    item : GetMealPlansQuery['getMealPlans'][0]['meal']['items'][0],
    children? : React.ReactNode
}){
    return (
        <div  style={{margin: 10}}>
            <Image loader={({src})=>src}  src={props.imagePath}
                    alt='foodItem'
                    width={140}
                    height={120}
                    
                    />
            <Typography variant="body2" textAlign='center'>
                {props.item.name}
                
            </Typography> 
            {
                props.children
            }
                
        </div>
    )
}
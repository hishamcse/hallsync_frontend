import { Typography } from "@mui/material";
import { GetMealPlansQuery } from "../graphql/__generated__/graphql";
import Image from "next/image";
import { CSSProperties } from "react";

export function MealItem(props : {
    imagePath : string,
    item : {
        name : string
    },
    style? : CSSProperties,
    children? : React.ReactNode,
    width? : number,
    height? : number
}){
    return (
        <div  style={{margin: 10, ... props.style}}>
            <Image loader={({src})=>src}  src={props.imagePath}
                    alt='foodItem'
                    width={props.height ?? 140}
                    height={props.width ?? 120}
                    
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
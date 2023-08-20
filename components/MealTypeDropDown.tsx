import { SelectChangeEvent } from "@mui/material";
import MuiDropdown from "./MUIDropdown";

export function MealTypeDropDown(
    props : {
        val? : string,
        setVal : (v : string)=>void,
        width? : number
    }
){
    function handleOptionChange(e : SelectChangeEvent){
        props.setVal(e.target.value);
    }
    return (
        <MuiDropdown sx={{
            backgroundColor : "black",
        }}
            change={handleOptionChange} options={['RICE', 'VEG', 'NON_VEG']}
        val={props.val} width={ props.width ?? 160} />
    )
}
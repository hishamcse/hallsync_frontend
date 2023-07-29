
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

export default function MultipleSelectCheckmarks(props : {
    val : string[],
    setVal : (s : string[]) => void,
    items : string[],
    placeHolder : string
}) {
  
    
    const handleChange = (event: SelectChangeEvent<typeof props.val>) => {
      const {
        target: { value },
      } = event;
      props.setVal(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 180}}>
          <Select
            sx={{
                color : "white",
                border : "1.5px white solid",
                height : "40px",
                backgroundColor : "#111111"
            }}
            displayEmpty
            multiple
            value={props.val}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>{
                if (selected.length === 0) {
                    return <span>{props.placeHolder}</span>;
                }
      
                return selected.join(', ');
            }}
            MenuProps={{
                sx : {
                    '& .MuiPaper-root': {
                        maxHeight : "200px",
                        "&::-webkit-scrollbar": {
                            width: 10
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#111111"
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "grey",
                            borderRadius: 2
                        }
                    }
                }
            }}
          >
            {props.items.map((val) => (
              <MenuItem key={val} value={val}>
                <Checkbox checked={props.val.indexOf(val) > -1} />
                <ListItemText primary={val} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

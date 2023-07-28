import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

const MuiDropdown = (props: {
    width: number,
    options: string[],
    val: string,
    change: (event: SelectChangeEvent) => void
}) => {

    return (
        <Box sx={{width: props.width}}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.val}
                    defaultValue={props.options[0]}
                    onChange={props.change}
                    size='small'
                >
                    {props.options.map((v) => (
                        <MenuItem key={Math.random().toString()} value={v}>{v}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default MuiDropdown;
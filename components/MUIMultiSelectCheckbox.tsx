
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import React, { ReactNode } from "react";

type CheckBoxProps = {
	type: 'multiple',
	vals: string[],
	setVals: (s: string[]) => void
}
type SigleSelectProps = {
	type: 'single',
	val: string,
	setVal: (v: string) => void
}
type Props = {
	items: string[],
	placeHolder: string,
	prefix? : string,
	width? : number,
	disabled? : boolean

} & (CheckBoxProps | SigleSelectProps);

export default function MUISelectStyled(props: Props) {


	let singleProps: SelectProps<string> = {};
	let multiProps: SelectProps<string[]> = {}
	if (props.type == 'single') {
		let handleChange = (event: SelectChangeEvent<typeof props.val>) => {
			const {
				target: { value },
			} = event;
			props.setVal(value);
		};
		singleProps = {
			value: props.val,
			onChange: (e)=>handleChange(e),
			renderValue: (s) => {
				if (s.length == 0)
					return <span>{props.placeHolder}</span>;
				return  (props.prefix ?? '') + s;
			}
		}
	}
	else {
		let handleChange = (event: SelectChangeEvent<typeof props.vals>) => {
			const {
				target: { value },
			} = event;
			props.setVals(
				typeof value === 'string' ? value.split(',') : value,
			);
		};
		multiProps = {
			multiple: true,
			value: props.vals,
			onChange: (e)=>handleChange(e),
			renderValue: (selected) => {
				if (selected.length === 0) {
					return <span>{props.placeHolder}</span>;
				}
				return (props.prefix ?? '') + selected.join(', ');
			}
		}
	}



	return (
		<div>
			<FormControl sx={{ m: 1, width: props.width ?? 180 }}>
				<SelectWrapper option1={props.type == 'single' ? singleProps : undefined}
					option2={props.type == 'multiple' ? multiProps : undefined}
					disabled = {props.disabled}
				>
					{props.items.map((val) => (
						<MenuItem key={val} value={val}>
							{
								props.type == 'multiple' &&
								<Checkbox checked={props.vals.indexOf(val) > -1} />
							}
							<ListItemText primary={val} />
						</MenuItem>
					))}
				</SelectWrapper>
			</FormControl>
		</div>
	);
}


function SelectWrapper(props: {
	children: ReactNode
	option1?: SelectProps<string>,
	option2?: SelectProps<string[]>,
	disabled?: boolean
}
) {
	let sx = {
		color: "white",
		border: "1.5px white solid",
		height: "40px",
		backgroundColor: "#111111"
	};
	let sxMenuProps = {
		'& .MuiPaper-root': {
			maxHeight: "200px",
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
	};
	if(props.option1){
		return (
			<Select
				disabled = {props.disabled}
				sx={sx}
				displayEmpty
				input={<OutlinedInput />}
				MenuProps={{
					sx: sxMenuProps
				}}
				{... props.option1}
			>
				{props.children}
			</Select>
		)
	}
	else if(props.option2){
		return (
			<Select
				disabled = {props.disabled}
				sx={sx}
				displayEmpty
				input={<OutlinedInput />}
				MenuProps={{
					sx: sxMenuProps
				}}
				{... props.option2}
			>
				{props.children}
			</Select>
		)
	}
	return (
		<Select
			disabled = {props.disabled}
			sx={sx}
			displayEmpty
			input={<OutlinedInput />}
			MenuProps={{
				sx: sxMenuProps
			}}
		>
			{props.children}
		</Select>
	)
}
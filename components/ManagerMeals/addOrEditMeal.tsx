import {GetMealPlanQuery, GetMealPlansQuery, GetOldItemsQuery} from "../../graphql/__generated__/graphql";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_OLD_MEAL_ITEMS, ADD_MEAL_PLAN} from "../../graphql/operations";
import MUISelectStyled from "../MUIMultiSelectCheckbox";
import { Dayjs } from "dayjs";
import SelectedItemsList from './SelectedItem';
import {Button} from "@mui/material";
import { MyButton } from "../button";

const AddOrEditMealView = (props : {
	selectedMealTime : string,
	setSelectedMealTime : (v : string)=>void,
	selectedDate : Dayjs | null,
	setSelectedDate : (newValue: Dayjs | null) => void,
	selectedMeal? : GetMealPlanQuery['getMealPlan']['meal'],
}) => {


	const {selectedDate, setSelectedDate, selectedMealTime, setSelectedMealTime} = props;

	const [reqError, setReqError] = useState(false);
	const [reqErrorMsg, setReqErrorMsg] = useState('');

	const [selectedRiceItems, setSelectedRiceItems] = useState<GetOldItemsQuery['getOldItems']>(
		[]
	);
	const [selectedVegItems, setSelectedVegItems] = useState<GetOldItemsQuery['getOldItems']>(
		[]
	);
	const [selectedNonVegItems, setSelectedNonVegItems] = useState<GetOldItemsQuery['getOldItems']>([])

	useEffect(()=>{
		// console.log(";laksdjf;lkasjdfljk")
		if(props.selectedMeal){

			setSelectedRiceItems(props.selectedMeal.items.filter(i => i.type === 'RICE'));
			setSelectedVegItems(props.selectedMeal.items.filter(i => i.type === 'VEG'));
			setSelectedNonVegItems(props.selectedMeal.items.filter(i => i.type === 'NON_VEG'));
		}
	}, [props.selectedMeal])

	const [nonVegCupCount, setNonVegCupCount] = useState<Record<string, number>>({});

	const [addMealPlan, {loading : addMealPlanLoading}] = useMutation(
		ADD_MEAL_PLAN, {
			onError: (error) => {
				console.log(error);
				setReqError(true)
				setReqErrorMsg(error.message)
			},
			onCompleted: (data) => {
				console.log(data);
				// router.reload();
			}
		}
	)

	const { loading, error, data } = useQuery(GET_OLD_MEAL_ITEMS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const oldItems = data?.getOldItems ?? [];

	// Separate arrays for different types of items
	const riceItems = oldItems.filter((item) => item.type === 'RICE');
	const vegItems = oldItems.filter((item) => item.type === 'VEG');
	const nonVegItems = oldItems.filter((item) => item.type === 'NON_VEG');

	// Callback function to update the quantities of NON_VEG items
	const handleNonVegCupCount = (itemName: string, cupCount: number) => {
		setNonVegCupCount(prevCupCount => ({ ...prevCupCount, [itemName]: cupCount }));
	};

	const handleCancel = () => {
		// Reset all selections to initial state
		setSelectedDate(null);
		setSelectedMealTime('LUNCH');
		setSelectedRiceItems([]);
		setSelectedVegItems([]);
		setSelectedNonVegItems([]);
	};


	const handleComplete = () => {

		const selected = [...selectedRiceItems, ...selectedVegItems, ...selectedNonVegItems];

		console.log(nonVegCupCount, selectedDate?.toDate().toLocaleDateString(), selectedMealTime)

		if(selected.length === 0 || !nonVegCupCount || !selected) {
			setReqError(true)
			setReqErrorMsg('Please try again!!')
			return;
		}
		if(!selectedDate) {
			setReqError(true)
			setReqErrorMsg('date undefined');
			return;
		}

		setReqError(false);

		let addedItems = []
		let notModified = props.selectedMeal?.items.length === selected.length;

		for(let i = 0; i < selected.length; i++){
			let item = selected[i];
			let cupCount = 150;
			if(props.selectedMeal && notModified){
				notModified = notModified && props.selectedMeal.items.some(i => i.itemId === item.itemId);
			}
			if(item.type === 'NON_VEG'){
				if(!nonVegCupCount[item.name]){
					setReqErrorMsg('cup count not found for ' + item.name);
					setReqError(true);
					return;
				}
				cupCount = nonVegCupCount[item.name];
			}
			addedItems.push({
				itemId: item.itemId,
				cupCount : cupCount
			})
		}

		console.log(addedItems)

		addMealPlan({
			variables: {
				mealTime: selectedMealTime,
				date: selectedDate?.toDate().toLocaleDateString(),
				items: {
					items : addedItems
				},
				mealId : props.selectedMeal?.mealId
			}
		}).then((data) => {
			setSelectedDate(null);
			console.log(data);
		}).catch((error) => {
			console.log(error);
		});
	}


	let arr = [
		{
			items : riceItems.map(r => r.name),
			title : "RICE Items",
			vals : selectedRiceItems.map(i => i.name),
			setVals : (s : string[]) => setSelectedRiceItems(riceItems.filter(r => s.some(s => r.name == s))),
			placeHolder : "RICE",
			selectedItems : selectedRiceItems
		},
		{
			items : vegItems.map(r => r.name),
			title : "VEG Items",
			vals : selectedVegItems.map(i => i.name),
			setVals : (s : string[]) => setSelectedVegItems(vegItems.filter(r => s.some(s => r.name == s))),
			placeHolder : "VEG",
			selectedItems : selectedVegItems

		},
		{
			items : nonVegItems.map(r => r.name),
			title : "NON-VEG Items",
			vals : selectedNonVegItems.map(i => i.name),
			setVals : (s : string[]) => setSelectedNonVegItems(nonVegItems.filter(r => s.some(s => r.name == s))),
			placeHolder : "NON_VEG",
			selectedItems : selectedNonVegItems

		},
		
	]

	return (

		<div>
			{
				arr.map((a, i) =>(
					<div key = {i}>
						<div style={{
							display : "flex",
							justifyContent : "space-between",
							alignItems : "center"
						}}>
							<h6>
								{a.title}
							</h6>
							<MUISelectStyled
								type="multiple"
								items={a.items}
								placeHolder={a.placeHolder}
								vals={a.vals} 
								setVals={a.setVals}
							/>
						</div>
						<SelectedItemsList selectedItems={a.selectedItems} type={a.placeHolder} onChangeCupCount={handleNonVegCupCount} />
					</div>
				))
			}

			{
				reqError &&
				<div style={{color: 'red', textAlign : 'center'}}>{reqErrorMsg}</div>
			}

			<div style={{ marginTop: 10 , textAlign : "center"}}>
				<MyButton text="Complete" buttonProps={{
					disabled : addMealPlanLoading
				}} type="submit" onClick={handleComplete} style={{
					marginRight : 10, width : 110
				}} />
				<MyButton text="Cancel" type="cancel" onClick={handleCancel} style={{
					width : 110
				}} />

				{/* <Button variant="outlined" color="primary" onClick={handleComplete} style = {{
					marginRight : 10
				}}>
					Complete
				</Button>
				<Button variant="outlined" color="primary" onClick={handleCancel}>
					Cancel
				</Button> */}
			</div>
			{/* ... Other content ... */}
		</div>
	);
};

export default AddOrEditMealView;
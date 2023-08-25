import {GetMealPlansQuery, GetOldItemsQuery, Item, ItemType} from "../../graphql/__generated__/graphql";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_OLD_MEAL_ITEMS, ADD_MEAL_PLAN} from "../../graphql/operations";
import MUISelectStyled from "../MUIMultiSelectCheckbox";
import { Dayjs } from "dayjs";
import SelectedItemsList from './SelectedItem';
import {Button} from "@mui/material";

const AddOrEditMealView = (props : {
	selectedMealTime : string,
	setSelectedMealTime : (v : string)=>void,
	selectedDate : Dayjs | null,
	setSelectedDate : (newValue: Dayjs | null) => void
}) => {

	const router = useRouter();

	const [strList, setStrList] = useState<string[]>([]);

	const {selectedDate, setSelectedDate, selectedMealTime, setSelectedMealTime} = props;

	const [reqError, setReqError] = useState(false);
	const [reqErrorMsg, setReqErrorMsg] = useState('');

	const [selectedRiceItems, setSelectedRiceItems] = useState<GetOldItemsQuery['getOldItems']>([]);
	const [selectedVegItems, setSelectedVegItems] = useState<GetOldItemsQuery['getOldItems']>([]);
	const [selectedNonVegItems, setSelectedNonVegItems] = useState<GetOldItemsQuery['getOldItems']>([])

	const [nonVegCupCount, setNonVegCupCount] = useState<Record<string, number>>({});

	const [addMealPlan, {}] = useMutation(
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

	const getSelecteds = (names: string[]) => {
		let selecteds: GetMealPlansQuery['getMealPlans'][0]['meal']['items'] = [];
		names.forEach((name) => {
			selecteds.push(oldItems.filter((item) => {
				return item.name.toLowerCase() == name.toLowerCase();
			})[0]);
		});

		return selecteds;
	}


	const handleComplete = () => {

		const riceNames = selectedRiceItems.map(item => item.name)
		const vegNames = selectedVegItems.map(item => item.name)
		const nenVegNames = selectedNonVegItems.map(item => item.name)


		const str: string[] = [...riceNames, ...vegNames, ...nenVegNames];

		setStrList(str)

		const selected = getSelecteds(strList);

		console.log(nonVegCupCount, selectedDate?.toDate().toLocaleDateString(), selectedMealTime)

		if(str.length === 0 || selected.length === 0 || !nonVegCupCount || !selected) {
			setReqError(true)
			setReqErrorMsg('Please try again!!')
			return;
		}

		const addedItems = str.map(itemName => {
			let itemId;
			while(!itemId){
				itemId = selected
					.filter(s => s.name.toLowerCase() === itemName.toLowerCase())[0]?.itemId;
			}
			let cupCount = nonVegCupCount[itemName] ?? 150;

			return {itemId, cupCount}
		})

		if(!selectedDate) {
			setReqError(true)
			setReqErrorMsg('date undefined');
			return;
		}

		setReqError(false)

		const items = {
			items: addedItems
		}

		console.log(addedItems)

		addMealPlan({
			variables: {
				mealTime: selectedMealTime,
				date: selectedDate?.toDate().toLocaleDateString(),
				items: items
			}
		}).then((data) => {
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
				<p style={{color: 'red'}}>{reqErrorMsg}</p>
			}

			<div style={{ marginTop: 10 , textAlign : "center"}}>
				<Button variant="outlined" color="primary" onClick={handleComplete} style = {{
					marginRight : 10
				}}>
					Complete
				</Button>
				<Button variant="outlined" color="primary" onClick={handleCancel}>
					Cancel
				</Button>
			</div>
			{/* ... Other content ... */}
		</div>
	);
};

export default AddOrEditMealView;
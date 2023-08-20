import {GetMealPlansQuery, Item, ItemType} from "../../graphql/__generated__/graphql";
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

	const [selectedRiceItems, setSelectedRiceItems] = useState<Item[]>([]);
	const [selectedVegItems, setSelectedVegItems] = useState<Item[]>([]);
	const [selectedNonVegItems, setSelectedNonVegItems] = useState<Item[]>([])

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

	// done with departments for now. need replacing with food items
	const { loading, error, data } = useQuery(GET_OLD_MEAL_ITEMS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const oldItems = data?.getOldItems ?? [];

	// Separate arrays for different types of items
	const riceItems = oldItems.filter((item) => item.type === 'RICE').map((item) => item.name);
	const vegItems = oldItems.filter((item) => item.type === 'VEG').map((item) => item.name);
	const nonVegItems = oldItems.filter((item) => item.type === 'NON_VEG').map((item) => item.name);

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
	// let disabled = !!props.mealPlan.optedOut;

	// let prefDisabled = (props.mealPlan.preferences && props.mealPlan.preferences.length > 0) || false;


	const importedImgPath = (imgName: string) => {
		return "/images/" + imgName;
	}

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

		console.log(riceNames, vegNames, nenVegNames)

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

	return (

		<div>
			{/* ... Other content ... */}
			{/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
				<MealTimeDropDown
					val={selectedMealTime}
					setVal={handleMealTimeChange}
					width={160}
				/>
				<div style={{ width: 20 }} />
				<MyDatePicker date={selectedDate} handleDate={handleDateChange} />
			</div> */}

			{/* Render SelectedItemsList */}
			{/* <SelectedItemsList selectedItems={selectedItems} /> */}
			<div>
				<div style={{
					display : "flex",
					justifyContent : "space-between",
					alignItems : "center"
				}}>
					<h6>
						RICE Items
					</h6>
					<MUISelectStyled
						type="multiple"
						items={riceItems}
						placeHolder="RICE"
						vals={selectedRiceItems.map(item => item.name)} // Convert to string[]
						setVals={(s: string[]) => setSelectedRiceItems(s.map(name => ({ name } as Item)))}
					/>
				</div>
				<SelectedItemsList selectedItems={selectedRiceItems} type="RICE" onChangeCupCount={handleNonVegCupCount} />
			</div>
			<div>
				<div style={{
					display : "flex",
					justifyContent : "space-between",
					alignItems : "center"
				}}>
					<h6>
						VEG Items
					</h6>
					<MUISelectStyled
						type="multiple"
						items={vegItems}
						placeHolder="VEG"
						vals={selectedVegItems.map(item => item.name)} // Convert to string[]
						setVals={(s: string[]) => setSelectedVegItems(s.map(name => ({ name } as Item)))}
					/>
				</div>
				<SelectedItemsList selectedItems={selectedVegItems} type="VEG" onChangeCupCount={handleNonVegCupCount} />
			</div>
			<div>

				<div style={{
					display : "flex",
					justifyContent : "space-between",
					alignItems : "center"
				}}>
					<h6>
						NON-VEG Items
					</h6>
					<MUISelectStyled
						type="multiple"
						items={nonVegItems}
						placeHolder="NON_VEG"
						vals={selectedNonVegItems.map(item => item.name)} // Convert to string[]
						setVals={(s: string[]) => setSelectedNonVegItems(s.map(name => ({ name } as Item)))}
					/>
				</div>
				<SelectedItemsList selectedItems={selectedNonVegItems} type="NON_VEG" onChangeCupCount={handleNonVegCupCount} />
			</div>

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
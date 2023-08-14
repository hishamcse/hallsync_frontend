import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface FoodItem {
  name: string;
  preference: number;
}

interface Meal {
  foodItems: FoodItem[];
  optInOut: boolean;
}

interface DateInfo {
  date: string;
  lunch: Meal;
  dinner: Meal;
}

const dummyData: DateInfo[] = [
  {
    date: "2023-08-14",
    lunch: {
      foodItems: [
        { name: "Rice", preference: 3 },
        { name: "Meat", preference: 2 },
        { name: "Vegetable", preference: 1 },
      ],
      optInOut: true,
    },
    dinner: {
      foodItems: [
        { name: "Fish", preference: 3 },
        { name: "Egg", preference: 2 },
        { name: "Vegetable", preference: 1 },
      ],
      optInOut: false,
    },
  },
  // Add more dummy data entries here...
];

const SampleFoodPage: React.FC = () => {
  return (
    <div>
      {dummyData.map((dateInfo, index) => (
        <Card key={index} style={{ marginBottom: "16px" }}>
          <CardContent>
            <Typography variant="h6">Date: {dateInfo.date}</Typography>
            <div>
              <Typography variant="subtitle1">Lunch:</Typography>
              <ul>
                {dateInfo.lunch.foodItems.map((foodItem, foodIndex) => (
                  <li key={foodIndex}>
                    {foodItem.name} (Preference: {foodItem.preference})
                  </li>
                ))}
              </ul>
              <Typography variant="body2">
                Opt In/Out: {dateInfo.lunch.optInOut ? "In" : "Out"}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1">Dinner:</Typography>
              <ul>
                {dateInfo.dinner.foodItems.map((foodItem, foodIndex) => (
                  <li key={foodIndex}>
                    {foodItem.name} (Preference: {foodItem.preference})
                  </li>
                ))}
              </ul>
              <Typography variant="body2">
                Opt In/Out: {dateInfo.dinner.optInOut ? "In" : "Out"}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SampleFoodPage;

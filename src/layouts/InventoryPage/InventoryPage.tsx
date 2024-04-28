import React, { useEffect, useState } from "react";
import InventoryModel from "../../models/InventoryModel";
import Actions from "./components/Actions";
import TableView from "./components/TableView";
import Header from "./components/Header";
import KanbanView from "./components/KanbanView";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const defaultData: InventoryModel[] = require("../../data/inventory.json");
const defaultColumnConfig: string[] = ["Name", "Amount", "Status"];

interface ViewProp {
  currentView: string;
  data: InventoryModel[];
  columnConfig: string[];
}

const InventoryPageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px 8px;
`;

const View = ({ currentView, data, columnConfig }: ViewProp) => {
  if (currentView === "table") {
    return <TableView data={data} columnConfig={columnConfig}></TableView>;
  }
  return <KanbanView data={data}></KanbanView>;
};

export const InventoryPage = () => {
  const [currentView, setCurrentView] = useState("kanban");

  const onAddInventory = () => {
    console.log("Clicked Add Inventory Button");
  };

  const onConsumeInventory = () => {
    console.log("Clicked consume inventory button");
  };

  return (
    <InventoryPageBox>
      <Header currentView={currentView}></Header>
      <Actions
        onAddInventory={onAddInventory}
        onConsumeInventory={onConsumeInventory}
        onSwitchView={setCurrentView}
        currentView={currentView}
      />
      <View
        data={defaultData}
        columnConfig={defaultColumnConfig}
        currentView={currentView}
      ></View>
    </InventoryPageBox>
  );
};

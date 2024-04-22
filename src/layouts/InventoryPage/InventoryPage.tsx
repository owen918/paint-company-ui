import React, { useEffect, useState } from "react";
import InventoryModel from "../../models/InventoryModel";
// import ListView from "./components/ListView";
// import KanbanView from "./components/KanbanView";
import Modal from "../../utils/Modal";
import Actions from "./components/Actions";
import TableView from "./components/TableView";
import Header from "./components/Header";
import KanbanView from "./components/KanbanViewV2";

const defaultData = [
  {
    id: 1,
    name: "blue",
    amount: 15,
    status: "running_low",
  },
  {
    id: 2,
    name: "black",
    amount: 100,
    status: "available",
  },
  {
    id: 3,
    name: "white",
    amount: 80,
    status: "available",
  },
  {
    id: 4,
    name: "purple",
    amount: 0,
    status: "out_of_stock",
  },
  {
    id: 5,
    name: "grey",
    amount: 30,
    status: "running_low",
  },
];
const defaultColumnConfig = ["Name", "Amount", "Status"];

const View = ({
  currentView,
  data = defaultData,
  columnConfig = defaultColumnConfig,
}) => {
  if (currentView === "table") {
    return <TableView data={data} columnConfig={columnConfig}></TableView>;
  }
  return <KanbanView data={data}></KanbanView>;
};

export const InventoryPage = () => {
  const [currentView, setCurrentView] = useState("table");

  return (
    <div className="container-lg my-5">
      <Header currentView={currentView}></Header>
      <Actions onSwitchView={setCurrentView} />
      <View currentView={currentView}></View>
    </div>
  );
};

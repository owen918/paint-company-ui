import { useState } from "react";
import InventoryModel from "../../models/InventoryModel";
import Actions from "./components/Actions";
import TableView from "./components/TableView";
import Header from "./components/Header";
import KanbanView from "./components/KanbanView";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditDialog from "./components/EditModal";

const defaultData: InventoryModel[] = require("../../data/inventory.json");
const defaultColumnConfig: string[] = ["Name", "Amount", "Status"];
const dialogColumnConfig: string[] = ["Name", "Amount"];

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
  const [inventory, setInventory] = useState(defaultData);
  const [modalData, setModalData] = useState(inventory);
  const [currentView, setCurrentView] = useState("kanban");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState("ADD");

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);

  const addInventory = () => {
    handleDialogClose();
    setInventory(modalData);
  };
  const consumeInventory = () => {
    handleDialogClose();
    setInventory(modalData);
  };

  const dialogSave = mode === "ADD" ? addInventory : consumeInventory;
  const title = mode === "ADD" ? "Add Inventory" : "Consume Inventory";

  const onClickAddInventory = () => {
    handleDialogOpen();
    setMode("ADD");
  };
  const onClickConsumeInventory = () => {
    handleDialogOpen();
    setMode("CONSUME");
  };

  const handleModalOnChange = (e) => {
    setModalData(
      modalData.map((paint) => {
        if (paint.name === e.target.name) {
          return { ...paint, amount: e.target.valueAsNumber + paint.amount };
        } else {
          return paint;
        }
      })
    );
  };

  return (
    <InventoryPageBox>
      <EditDialog
        handleOnClose={handleDialogClose}
        data={modalData}
        columnConfig={dialogColumnConfig}
        open={dialogOpen}
        title={title}
        handleDialogSave={dialogSave}
        handleModalOnChange={handleModalOnChange}
      />
      <Header view={currentView}></Header>
      <Actions
        onClickAddInventory={onClickAddInventory}
        onClickConsumeInventory={onClickConsumeInventory}
        onSwitchView={setCurrentView}
        currentView={currentView}
      />
      <View
        data={inventory}
        columnConfig={defaultColumnConfig}
        currentView={currentView}
      ></View>
    </InventoryPageBox>
  );
};

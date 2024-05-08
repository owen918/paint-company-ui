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
const dialogColumnConfig: string[] = [
  "Name",
  "Original Amount",
  "Amount",
  "Updated Amount",
];

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

const View = ({
  currentView,
  data,
  columnConfig,
  onClickEditCard,
}: {
  currentView: string;
  data: InventoryModel[];
  columnConfig: string[];
  onClickEditCard: (e: any) => void;
}) => {
  if (currentView === "table") {
    return <TableView data={data} columnConfig={columnConfig}></TableView>;
  }
  return (
    <KanbanView data={data} onClickEditCard={onClickEditCard}></KanbanView>
  );
};

export const InventoryPage = () => {
  const [inventory, setInventory] = useState(defaultData);

  const [currentView, setCurrentView] = useState("kanban");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [editPaintId, setEditPaintId] = useState(0);

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);

  const onClickAddInventory = () => {
    setMode("ADD");
    handleDialogOpen();
  };
  const onClickConsumeInventory = () => {
    setMode("CONSUME");
    handleDialogOpen();
  };

  const onClickEditCard = (e: any) => {
    setMode("EDIT_SINGLE");
    setEditPaintId(Number(e.currentTarget.id));
    handleDialogOpen();
  };

  return (
    <InventoryPageBox>
      <EditDialog
        handleOnClose={handleDialogClose}
        columnConfig={dialogColumnConfig}
        open={dialogOpen}
        mode={mode}
        inventory={inventory}
        setInventory={setInventory}
        editPaintId={editPaintId}
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
        onClickEditCard={onClickEditCard}
      ></View>
    </InventoryPageBox>
  );
};

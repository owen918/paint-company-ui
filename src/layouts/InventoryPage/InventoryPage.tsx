import { useState } from "react";
import InventoryModel from "../../models/InventoryModel";
import Actions from "./components/Actions";
import TableView from "./components/TableView";
import Header from "./components/Header";
import KanbanView from "./components/KanbanView";
import { Alert, Box, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditDialog from "./components/EditModal";
import Status from "../../models/InventoryStatusModel";

const defaultData: InventoryModel[] = require("../../data/inventory.json");
const defaultColumnConfig: string[] = ["Name", "Amount", "Status"];

const InventoryPageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px 8px;
`;

const Banner = ({
  barOpen,
  handleBarClose,
}: {
  barOpen: boolean;
  handleBarClose: () => void;
}) => {
  return (
    <Snackbar
      open={barOpen}
      autoHideDuration={6000}
      onClose={handleBarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleBarClose} severity="success" variant="filled">
        You have successfully updated the paint inventory !
      </Alert>
    </Snackbar>
  );
};

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
  const [barOpen, setBarOpen] = useState(false);

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);

  const handleBarOpen = () => setBarOpen(true);
  const handleBarClose = () => setBarOpen(false);

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

  const setPaintStatus = (n: number) => {
    if (n <= 0) {
      return Status.out_of_stock;
    } else if (n <= 30) {
      return Status.running_low;
    } else {
      return Status.available;
    }
  };

  return (
    <InventoryPageBox>
      <Banner barOpen={barOpen} handleBarClose={handleBarClose} />
      <EditDialog
        handleOnClose={handleDialogClose}
        handleBarOpen={handleBarOpen}
        open={dialogOpen}
        mode={mode}
        inventory={inventory}
        setInventory={setInventory}
        editPaintId={editPaintId}
        setPaintStatus={setPaintStatus}
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

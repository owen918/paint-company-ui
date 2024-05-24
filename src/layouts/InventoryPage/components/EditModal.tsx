import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import InventoryModel from "../../../models/InventoryModel";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Status from "../../../models/InventoryStatusModel";

const EditDialogTable = ({
  data,
  mode,
  handleOnChange,
}: {
  data: {
    id: number;
    name: string;
    amount: number | undefined;
    originalAmount: number;
    updatedAmount: number | undefined;
  }[];
  mode: string;
  handleOnChange: (e: any) => void;
}) => {
  const renderEditCell = (params: GridRenderEditCellParams) => {
    console.log("in renderEditCell", params);
    const { error } = params;
    return (
      <Tooltip open={!!error} title={error}>
        <span>
          <GridEditInputCell {...params} />
        </span>
      </Tooltip>
    );
  };

  const preProcessEditCellProps = (params: GridPreProcessEditCellProps) => {
    console.log("Before", params);
    if (params.props.value < 0 || params.props.value == null) {
      return {
        ...params.props,
        error: "Amount must be greater than or equal to 0",
      };
    } else if (mode === "CONSUME") {
      const hasError =
        params.props.value >= params.row.originalAmount
          ? "Amount cannot be greater than current amount"
          : "";
      return { ...params.props, error: hasError };
    } else {
      return { ...params.props };
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name" },
    {
      field: "originalAmount",
      headerName: "Original Amount",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      editable: true,
      type: "number",
      preProcessEditCellProps: preProcessEditCellProps,
      renderEditCell: renderEditCell,
    },
    {
      field: "updatedAmount",
      headerName: "Updated Amount",
      flex: 1,
      type: "number",
    },
  ];
  const processRowUpdate = (newRow: any) => {
    handleOnChange(newRow);
    if (mode === "ADD") {
      return {
        ...newRow,
        updatedAmount: newRow.amount + newRow.originalAmount,
      };
    } else if (mode === "CONSUME") {
      return {
        ...newRow,
        updatedAmount: newRow.originalAmount - newRow.amount,
      };
    } else {
      return { ...newRow, updatedAmount: newRow.amount };
    }
  };
  const handleProcessRowUpdateError = (error: Error) => {
    console.log(error);
  };
  return (
    <DataGrid
      columns={columns}
      rows={data}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
    />
  );
};

const EditDialogContext = ({
  data,
  mode,
  handleOnChange,
}: {
  data: {
    id: number;
    name: string;
    amount: number | undefined;
    originalAmount: number;
    updatedAmount: number | undefined;
  }[];
  mode: string;
  handleOnChange: (e: any) => void;
}) => {
  return (
    <DialogContent>
      <DialogContentText>
        To modify the inventory of paints, please enter the amount in the table
        below.
      </DialogContentText>
      <EditDialogTable
        data={data}
        handleOnChange={handleOnChange}
        mode={mode}
      />
    </DialogContent>
  );
};

const EditDialog = ({
  open,
  handleOnClose,
  mode,
  inventory,
  setInventory,
  editPaintId,
  handleBarOpen,
  setPaintStatus,
}: {
  open: boolean;
  handleOnClose: () => void;
  mode: string;
  inventory: InventoryModel[];
  setInventory: (d: InventoryModel[]) => void;
  editPaintId: number;
  handleBarOpen: () => void;
  setPaintStatus: (n: number) => Status;
}) => {
  const getDefaultModalData = (
    inventory: InventoryModel[],
    mode: string,
    editPaintId: number
  ): {
    id: number;
    name: string;
    amount: number;
    originalAmount: number;
    updatedAmount: number;
  }[] => {
    let modalInventory = [...inventory];
    if (mode === "EDIT_SINGLE") {
      modalInventory = modalInventory.filter(
        (paint) => paint.id === editPaintId
      );
    }
    return modalInventory.map((paint) => ({
      id: paint.id,
      name: paint.name,
      amount: 0,
      originalAmount: paint.amount,
      updatedAmount: paint.amount,
    }));
  };

  const getTitle = (mode: string) => {
    if (mode === "ADD") {
      return "Add Inventory";
    } else if (mode === "CONSUME") {
      return "Consume Inventory";
    } else {
      return "Edit Inventory";
    }
  };

  const [modalData, setModalData] = useState<
    {
      id: number;
      name: string;
      amount: number;
      originalAmount: number;
      updatedAmount: number;
    }[]
  >([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    // init();
    if (open === true) {
      setModalData(getDefaultModalData(inventory, mode, editPaintId));
    } else {
      setModalData([]);
    }
  }, [open]);

  const handleConfirmModalClose = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirmModalOpen = () => {
    setConfirmModalOpen(true);
  };

  const addInventoryOnChange = (e: any) => {
    setModalData(
      modalData.map((paint) => {
        const num = !isNaN(e.amount) ? e.amount : 0;
        if (paint.name === e.name) {
          return {
            ...paint,
            amount: num,
            updatedAmount: paint.originalAmount + num,
          };
        } else {
          return paint;
        }
      })
    );
  };

  const consumeInventoryOnChange = (e: any) => {
    setModalData(
      modalData.map((paint) => {
        const num = !isNaN(e.amount) ? e.amount : 0;
        if (paint.name === e.name) {
          return {
            ...paint,
            amount: num,
            updatedAmount: paint.originalAmount - num,
          };
        } else {
          return paint;
        }
      })
    );
  };

  const editInventoryOnChange = (e: any) => {
    setModalData(
      modalData.map((paint) => {
        const num = !isNaN(e.amount) ? e.amount : 0;
        if (paint.name === e.name) {
          return {
            ...paint,
            amount: num,
            updatedAmount: num,
          };
        } else {
          return paint;
        }
      })
    );
  };

  const handleModalOnChange = (e: any) => {
    if (mode === "ADD") {
      return addInventoryOnChange(e);
    } else if (mode === "CONSUME") {
      return consumeInventoryOnChange(e);
    } else {
      return editInventoryOnChange(e);
    }
  };

  return (
    <>
      <ConfirmModal
        open={confirmModalOpen}
        handleConfirmModalClose={handleConfirmModalClose}
        handleBarOpen={handleBarOpen}
        handleEditModalClose={handleOnClose}
        modalData={modalData}
        mode={mode}
        setInventory={setInventory}
        inventory={inventory}
        editPaintId={editPaintId}
        setPaintStatus={setPaintStatus}
      />
      <Dialog open={open} onClose={handleOnClose}>
        <DialogTitle>{getTitle(mode)}</DialogTitle>
        <EditDialogContext
          data={modalData}
          mode={mode}
          handleOnChange={handleModalOnChange}
        />
        <DialogActions>
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button onClick={handleConfirmModalOpen}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;

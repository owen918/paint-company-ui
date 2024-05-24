import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import InventoryModel from "../../../models/InventoryModel";
import Status from "../../../models/InventoryStatusModel";

const ConfirmDialogTable = ({ data }: { data: InventoryModel[] }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name" },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
    },
  ];
  return <DataGrid rows={data} columns={columns} />;
};

const ConfirmModal = ({
  open,
  handleConfirmModalClose,
  handleEditModalClose,
  handleBarOpen,
  modalData,
  mode,
  setInventory,
  inventory,
  editPaintId,
  setPaintStatus,
}: {
  open: boolean;
  handleConfirmModalClose: () => void;
  handleEditModalClose: () => void;
  handleBarOpen: () => void;
  modalData: {
    id: number;
    name: string;
    amount: number;
    originalAmount: number;
    updatedAmount: number;
  }[];
  mode: string;
  setInventory: (d: InventoryModel[]) => void;
  inventory: InventoryModel[];
  editPaintId: number;
  setPaintStatus: (n: number) => Status;
}) => {
  const [confirmModalData, setConfirmModalData] = useState<InventoryModel[]>(
    []
  );

  const getDefaultConfirmModalData = (
    mode: string,
    editPaintId: number,
    modalData: {
      id: number;
      name: string;
      amount: number;
      originalAmount: number;
      updatedAmount: number;
    }[]
  ) => {
    let confirmData = [...modalData];
    if (mode === "ADD" || mode === "CONSUME") {
      return confirmData.map((paint) => ({
        id: paint.id,
        name: paint.name,
        amount: paint.updatedAmount,
        status: setPaintStatus(paint.updatedAmount),
      }));
    } else {
      return confirmData
        .filter((paint) => paint.id === editPaintId)
        .map((paint) => ({
          id: paint.id,
          name: paint.name,
          amount: paint.updatedAmount,
          status: setPaintStatus(paint.updatedAmount),
        }));
    }
  };

  useEffect(() => {
    if (open === true) {
      setConfirmModalData(
        getDefaultConfirmModalData(mode, editPaintId, modalData)
      );
    } else {
      setConfirmModalData([]);
    }
  }, [open]);

  const dialogSave = () => {
    if (mode === "ADD" || mode === "CONSUME") {
      return addOrConsumeInventory;
    } else {
      return editInventory;
    }
  };

  const addOrConsumeInventory = () => {
    handleConfirmModalClose();
    handleEditModalClose();
    handleBarOpen();
    setInventory(confirmModalData);
  };
  const editInventory = () => {
    handleConfirmModalClose();
    handleEditModalClose();
    handleBarOpen();
    setInventory(
      inventory.map((paint) =>
        paint.name === confirmModalData[0].name
          ? {
              ...paint,
              amount: confirmModalData[0].amount,
              status: setPaintStatus(confirmModalData[0].amount),
            }
          : paint
      )
    );
  };
  return (
    <Dialog open={open} onClose={handleConfirmModalClose}>
      <DialogTitle>Are you sure ?</DialogTitle>
      <ConfirmDialogTable data={confirmModalData} />
      <DialogActions>
        <Button onClick={handleConfirmModalClose}>No</Button>
        <Button type="button" onClick={dialogSave()}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;

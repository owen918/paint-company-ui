import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import InventoryModel from "../../../models/InventoryModel";
import { useEffect, useState } from "react";

const EditDialogTableRow = ({
  name,
  originalAmount,
  updatedAmount,
  handleOnChange,
}: {
  name: string;
  originalAmount: number;
  updatedAmount: number;
  handleOnChange: (e: any) => void;
}) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{originalAmount}</TableCell>
      <TableCell>
        <TextField
          name={name}
          type="number"
          variant="standard"
          onChange={handleOnChange}
        />
      </TableCell>
      <TableCell>{updatedAmount}</TableCell>
    </TableRow>
  );
};

const EditDialogTableBody = ({
  data,
  handleOnChange,
}: {
  data: {
    name: string;
    amount: number;
    originalAmount: number;
    updatedAmount: number;
  }[];
  handleOnChange: (e: any) => void;
}) => {
  return (
    <TableBody>
      {data.map((paint) => (
        <EditDialogTableRow
          key={paint.name}
          name={paint.name}
          originalAmount={paint.originalAmount}
          updatedAmount={paint.updatedAmount}
          handleOnChange={handleOnChange}
        />
      ))}
    </TableBody>
  );
};

const EditDialogTableHeader = ({
  columnConfig,
}: {
  columnConfig: string[];
}) => {
  return (
    <TableHead>
      <TableRow>
        {columnConfig.map((column) => (
          <TableCell key={column}>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EditDialogTable = ({
  columnConfig,
  data,
  handleOnChange,
}: {
  data: {
    name: string;
    amount: number;
    originalAmount: number;
    updatedAmount: number;
  }[];
  columnConfig: string[];
  handleOnChange: (e: any) => void;
}) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="edit-table">
        <EditDialogTableHeader columnConfig={columnConfig} />
        <EditDialogTableBody data={data} handleOnChange={handleOnChange} />
      </Table>
    </TableContainer>
  );
};

const EditDialogContext = ({
  data,
  columnConfig,
  handleOnChange,
}: {
  data: {
    name: string;
    amount: number;
    originalAmount: number;
    updatedAmount: number;
  }[];
  columnConfig: string[];
  handleOnChange: (e: any) => void;
}) => {
  return (
    <DialogContent>
      <DialogContentText>
        To modify the inventory of paints, please enter the amount in the table
        below.
      </DialogContentText>
      <EditDialogTable
        columnConfig={columnConfig}
        data={data}
        handleOnChange={handleOnChange}
      />
    </DialogContent>
  );
};

const EditDialog = ({
  open,
  handleOnClose,
  columnConfig,
  mode,
  inventory,
  setInventory,
  editPaintId,
}: {
  open: boolean;
  handleOnClose: () => void;
  columnConfig: string[];
  mode: string;
  inventory: InventoryModel[];
  setInventory: any;
  editPaintId: number;
}) => {
  const getDefaultModalData = (
    inventory: InventoryModel[],
    mode: string,
    editPaintId: number
  ): {
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
      name: paint.name,
      amount: 0,
      originalAmount: paint.amount,
      updatedAmount: 0,
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
      name: string;
      amount: number;
      originalAmount: number;
      updatedAmount: number;
    }[]
  >([]);

  useEffect(() => {
    // init();
    if (open === true) {
      setModalData(getDefaultModalData(inventory, mode, editPaintId));
    } else {
      setModalData([
        { name: "", amount: 0, originalAmount: 0, updatedAmount: 0 },
      ]);
    }
    console.log("inside", modalData);
  }, [open]);

  const handleModalOnChange = (e: any) => {
    setModalData(
      modalData.map((paint) => {
        const num = !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0;
        if (paint.name === e.target.name) {
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

  const addInventory = (e: any) => {
    handleOnClose();
    setInventory(
      inventory.map((paint) => {
        const data = modalData.filter((d) => d.name === paint.name)[0];
        return { ...paint, amount: data.amount + paint.amount };
      })
    );
  };

  const consumeInventory = () => {
    handleOnClose();
    setInventory(
      inventory.map((paint) => {
        const data = modalData.filter((d) => d.name === paint.name)[0];
        return { ...paint, amount: paint.amount - data.amount };
      })
    );
  };

  const editInventory = () => {
    handleOnClose();
    setInventory(
      inventory.map((paint) =>
        paint.name === modalData[0].name
          ? { ...paint, amount: modalData[0].amount }
          : paint
      )
    );
  };

  const dialogSave = () => {
    if (mode === "ADD") {
      return addInventory;
    } else if (mode === "CONSUME") {
      return consumeInventory;
    } else {
      return editInventory;
    }
  };

  console.log("outside", modalData);
  return (
    <Dialog open={open} onClose={handleOnClose}>
      <form>
        <DialogTitle>{getTitle(mode)}</DialogTitle>
        <EditDialogContext
          data={modalData}
          columnConfig={columnConfig}
          handleOnChange={handleModalOnChange}
        />
        <DialogActions>
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button type="button" onClick={dialogSave()}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;

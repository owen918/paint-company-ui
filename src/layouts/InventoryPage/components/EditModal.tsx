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

const EditDialogTableRow = ({ name, amount, handleOnChange }) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        <TextField
          name={name}
          type="number"
          variant="standard"
          onChange={handleOnChange}
        />
      </TableCell>
    </TableRow>
  );
};

const EditDialogTableBody = ({ data, handleOnChange }) => {
  return (
    <TableBody>
      {data.map((paint) => (
        <EditDialogTableRow
          key={paint.name}
          name={paint.name}
          amount={paint.amount}
          handleOnChange={handleOnChange}
        />
      ))}
    </TableBody>
  );
};

const EditDialogTableHeader = ({ columnConfig }) => {
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

const EditDialogTable = ({ columnConfig, data, handleOnChange }) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="edit-table">
        <EditDialogTableHeader columnConfig={columnConfig} />
        <EditDialogTableBody data={data} handleOnChange={handleOnChange} />
      </Table>
    </TableContainer>
  );
};

const EditDialogContext = ({ data, columnConfig, handleOnChange }) => {
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
  title,
  data,
  columnConfig,
  handleDialogSave,
  handleModalOnChange,
}) => {
  return (
    <Dialog open={open} onClose={handleOnClose}>
      <form>
        <DialogTitle>{title}</DialogTitle>
        <EditDialogContext
          data={data}
          columnConfig={columnConfig}
          handleOnChange={handleModalOnChange}
        />
        <DialogActions>
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button type="button" onClick={handleDialogSave}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDialog;

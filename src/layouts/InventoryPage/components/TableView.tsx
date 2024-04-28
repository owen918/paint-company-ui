import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import InventoryModel from "../../../models/InventoryModel";
import InventoryStatusModel from "../../../models/InventoryStatusModel";

interface Prop {
  data: InventoryModel[];
  columnConfig: string[];
}

const Status = ({ status }: { status: InventoryStatusModel }) => {
  if (status === InventoryStatusModel.available) {
    return <span className="badge text-bg-success">Available</span>;
  }
  if (status === InventoryStatusModel.running_low) {
    return <span className="badge text-bg-warning">Running Low</span>;
  }
  if (status === InventoryStatusModel.out_of_stock) {
    return <span className="badge text-bg-danger">Out of stock</span>;
  }
};

const Header = ({ columnConfig }: { columnConfig: string[] }) => {
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

const Row = ({
  name,
  amount,
  status,
}: {
  name: string;
  amount: number;
  status: InventoryStatusModel;
}) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>
        <Status status={status} />
      </TableCell>
    </TableRow>
  );
};

const TableView = ({ data, columnConfig }: Prop) => {
  return (
    <TableContainer>
      <Table aria-label="table">
        <Header columnConfig={columnConfig} />
        <TableBody>
          {data.map((row) => (
            <Row
              key={row.id}
              name={row.name}
              amount={row.amount}
              status={row.status}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;

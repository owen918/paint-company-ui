const Status = ({ status }) => {
  if (status === "available") {
    return <span className="badge text-bg-success">available</span>;
  }
  if (status === "running_low") {
    return <span className="badge text-bg-warning">running_low</span>;
  }
  if (status === "out_of_stock") {
    return <span className="badge text-bg-danger">out_of_stock</span>;
  }
};

const TableHeader = ({ columnConfig }) => {
  return (
    <thead className="table-light">
      <tr>
        {columnConfig.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};
const TableRow = ({ name, amount, status }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{amount}</td>
      <td>
        <Status status={status} />
      </td>
    </tr>
  );
};

const TableView = ({ data, columnConfig }) => {
  return (
    <table className="table align-middle mt-3 table-striped">
      <TableHeader columnConfig={columnConfig} />
      <tbody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            name={row.name}
            amount={row.amount}
            status={row.status}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableView;

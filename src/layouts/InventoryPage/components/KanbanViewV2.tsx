const defaultBoardData = [
  {
    name: "black",
    amount: 100,
  },
  {
    name: "white",
    amount: 80,
  },
];
const Card = ({ title, amount }) => {
  return (
    <div className="d-flex flex-column">
      <div>{title}</div>
      <div className="d-flex justify-content-between">
        <div>{amount}</div>
        <button type="button">Add</button>
      </div>
    </div>
  );
};

// data: an array
const Board = ({ title, data }) => {
  return (
    <div>
      <div>{title}</div>
      {data.map((card) => (
        <Card key={card.name} title={card.name} amount={card.amount} />
      ))}
    </div>
  );
};

const KanbanView = ({ data }) => {
  const getAvailableData = (data) => {
    return data.filter((paint) => paint.status === "available");
  };
  const getRunningLowData = (data) => {
    return data.filter((paint) => paint.status === "running_low");
  };
  const getOutOfStockData = (data) => {
    return data.filter((paint) => paint.status === "out_of_stock");
  };

  return (
    <div className="d-flex">
      <Board title={"Available"} data={getAvailableData(data)} />
      <Board title={"Running Low"} data={getRunningLowData(data)} />
      <Board title={"Out of Stock"} data={getOutOfStockData(data)} />
    </div>
  );
};

export default KanbanView;

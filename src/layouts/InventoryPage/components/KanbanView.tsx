import { Box } from "@mui/material";
import InventoryModel from "../../../models/InventoryModel";
import { styled } from "@mui/material/styles";

const StyledKanban = styled(Box)`
  gap: 8px;
  margin-top: 8px;
  display: flex;
`;

const StyledBoard = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  flex: 1;
  background-color: #f2f2f3;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BoardTitle = styled(Box)`
  font-size: large;
  font-weight: bold;
  padding-inline: 8px;
`;

const StyledBoardCard = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-inline: 8px;
`;

const StyledCard = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Card = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <StyledCard>
      <div>{title}</div>
      <div className="d-flex justify-content-between">
        <div>{amount}</div>
        <button type="button">Add</button>
      </div>
    </StyledCard>
  );
};

const BoardCard = ({ data }: { data: InventoryModel[] }) => {
  return (
    <StyledBoardCard>
      {data.map((card) => (
        <Card key={card.name} title={card.name} amount={card.amount} />
      ))}
    </StyledBoardCard>
  );
};

// data: an array
const Board = ({
  title,
  data,
  bgColor,
}: {
  title: string;
  data: InventoryModel[];
  bgColor?: any;
}) => {
  return (
    <StyledBoard>
      <BoardTitle item $color={bgColor}>
        {title}
      </BoardTitle>
      <BoardCard data={data} />
    </StyledBoard>
  );
};

const KanbanView = ({ data }: { data: InventoryModel[] }) => {
  const getData = (data: InventoryModel[], status: string) => {
    return data.filter((paint) => paint.status === status);
  };

  return (
    <StyledKanban>
      <Board
        title={"Available"}
        data={getData(data, "available")}
        bgColor={"#B9EFB2"}
      />
      <Board title={"Running Low"} data={getData(data, "running_low")} />
      <Board title={"Out of Stock"} data={getData(data, "out_of_stock")} />
    </StyledKanban>
  );
};

export default KanbanView;

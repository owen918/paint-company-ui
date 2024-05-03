import { Box, IconButton } from "@mui/material";
import InventoryModel from "../../../models/InventoryModel";
import { styled } from "@mui/material/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const StyledKanban = styled(Box)`
  gap: 8px;
  margin-top: 8px;
  display: flex;
`;

const StyledBoard = styled(Box)<{ $color?: string }>`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  flex: 1;
  background-color: ${(props) => props.$color || "#f2f2f3"};
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
  row-gap: 8px;
  padding-bottom: 8px;
`;

const StyledCard = styled(Box)`
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  padding: 8px;
`;

const StyledCardTitle = styled("div")`
  font-size: medium;
  font-weight: bold;
`;

const StyledCardDetail = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = () => {
  return (
    <IconButton>
      <EditRoundedIcon fontSize="small" />
    </IconButton>
  );
};

const Card = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <StyledCard>
      <StyledCardTitle>{title}</StyledCardTitle>
      <StyledCardDetail>
        <div>{amount}</div>
        <EditButton />
      </StyledCardDetail>
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
  color,
}: {
  title: string;
  data: InventoryModel[];
  color: string;
}) => {
  return (
    <StyledBoard $color={color}>
      <BoardTitle>{title}</BoardTitle>
      <BoardCard data={data} />
    </StyledBoard>
  );
};

const KanbanView = ({ data }: { data: InventoryModel[] }) => {
  const getData = (data: InventoryModel[], status: string) => {
    return data.filter((paint) => paint.status === status);
  };

  const getCardColor = (status: string) => {
    if (status === "available") {
      return "#B9EFB2";
    }
    if (status === "running_low") {
      return "#F9EE97";
    }
    if (status === "out_of_stock") {
      return "#FFC3AE";
    }
  };

  return (
    <StyledKanban>
      <Board
        title={"Available"}
        data={getData(data, "available")}
        color={getCardColor("available")}
      />
      <Board
        title={"Running Low"}
        data={getData(data, "running_low")}
        color={getCardColor("running_low")}
      />
      <Board
        title={"Out of Stock"}
        data={getData(data, "out_of_stock")}
        color={getCardColor("out_of_stock")}
      />
    </StyledKanban>
  );
};

export default KanbanView;

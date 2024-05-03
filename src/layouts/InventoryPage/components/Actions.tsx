import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

/**
 * Styled Components
 */
const ButtonBox = styled(Box)`
  display: flex;
  gap: 5px;
`;

const ActionButtonBox = styled(ButtonBox)`
  justify-content: space-between;
`;

const Actions = ({
  currentView,
  onClickAddInventory,
  onClickConsumeInventory,
  onSwitchView,
}: {
  currentView: string;
  onClickAddInventory: () => void;
  onClickConsumeInventory: () => void;
  onSwitchView: (viewType: string) => void;
}) => {
  return (
    <ActionButtonBox>
      <ButtonBox>
        <Button variant="contained" onClick={onClickAddInventory}>
          Add
        </Button>
        <Button variant="outlined" onClick={onClickConsumeInventory}>
          Consume
        </Button>
      </ButtonBox>
      <ButtonBox>
        <Button
          variant={currentView === "kanban" ? "contained" : null}
          onClick={() => onSwitchView("kanban")}
        >
          <ViewKanbanOutlinedIcon />
        </Button>
        <Button
          variant={currentView === "table" ? "contained" : null}
          onClick={() => onSwitchView("table")}
        >
          <ListAltOutlinedIcon />
        </Button>
      </ButtonBox>
    </ActionButtonBox>
  );
};

export default Actions;

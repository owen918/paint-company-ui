import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface InventoryButtonProp {
  onAddInventory: () => void;
  onConsumeInventory: () => void;
}

interface ViewButtonProp {
  currentView: string;
  onSwitchView: (viewType: string) => void;
}

interface Prop extends InventoryButtonProp, ViewButtonProp {}

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

/**
 *  COMPONENTS
 */
const InventoryButtonsBox = ({
  onAddInventory,
  onConsumeInventory,
}: InventoryButtonProp) => {
  return (
    <ButtonBox>
      <Button variant="contained" onClick={onAddInventory}>
        Add
      </Button>
      <Button variant="outlined" onClick={onConsumeInventory}>
        Consume
      </Button>
    </ButtonBox>
  );
};

const ViewButtonsBox = ({ currentView, onSwitchView }: ViewButtonProp) => {
  return (
    <ButtonBox>
      <Button
        variant={currentView === "kanban" ? "contained" : null}
        onClick={() => onSwitchView("kanban")}
      >
        <i className="bi bi-kanban"></i>
      </Button>
      <Button
        variant={currentView === "table" ? "contained" : null}
        onClick={() => onSwitchView("table")}
      >
        <i className="bi bi-card-list"></i>
      </Button>
    </ButtonBox>
  );
};

const Actions = ({
  currentView,
  onAddInventory,
  onConsumeInventory,
  onSwitchView,
}: Prop) => {
  return (
    <ActionButtonBox>
      <InventoryButtonsBox
        onAddInventory={onAddInventory}
        onConsumeInventory={onConsumeInventory}
      />
      <ViewButtonsBox currentView={currentView} onSwitchView={onSwitchView} />
    </ActionButtonBox>
  );
};

export default Actions;

const Actions = ({
    onAddInventory = () => {},
    onConsumeInventory = () => {},
    onSwitchView,
  }) => {
    return (
      <div className="d-flex mt-5 justify-content-between">
        <div className="d-flex" style={{ gap: 10 }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddInventory}
          >
            Add Inventory
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onConsumeInventory}
          >
            Consume Inventory
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSwitchView('kanban')}
          >
            View Kanban
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSwitchView('table')}
          >
            View Table
          </button>
        </div>
      </div>
    );
  };

  export default Actions;
  
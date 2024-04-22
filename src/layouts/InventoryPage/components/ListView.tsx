import React from "react";
import InventoryModel from "../../../models/InventoryModel";
import Status from "../../../models/InventoryStatusModel";

const ListView = ({
  inventory,
  setModalTitle,
}: {
  inventory: InventoryModel[];
  setModalTitle: (s: string) => void;
}) => {
  return (
    <table className="table align-middle mt-3 table-striped">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((paint) => (
          <tr key={paint.id}>
            <td>{paint.name}</td>
            <td>{paint.amount}</td>
            <td>
              <span
                className={
                  "badge text-bg-" +
                  (paint.amount === 0
                    ? "danger"
                    : paint.amount < 50
                    ? "warning"
                    : "success")
                }
              >
                {Status[paint.status]}
              </span>
            </td>
            <td>
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={() => setModalTitle("Adjust Inventory")}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListView;

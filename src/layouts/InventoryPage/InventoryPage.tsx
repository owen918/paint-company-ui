import React, { useEffect, useState } from "react";
import InventoryModel from "../../models/InventoryModel";
import ListView from "./components/ListView";
import KanbanView from "./components/KanbanView";
import Modal from "../../utils/Modal";

export const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryModel[]>([]);
  const [selectedView, setSelectedView] = useState("table");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const data = require("../../data/inventory.json");
    setInventory(data);
  }, [inventory]);

  return (
    <>
      <Modal title={modalTitle} />
      <div className="container-lg my-5">
        <h4>Paint Inventory</h4>
        <div className="d-flex mt-5 justify-content-between">
          <div className="d-flex" style={{ gap: 10 }}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setModalTitle("Add Inventory")}
            >
              Add Inventory
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => setModalTitle("Consume Inventory")}
            >
              Consume Inventory
            </button>
          </div>
          <div className="d-flex">
            <button
              type="button"
              className={selectedView === "table" ? "btn btn-secondary" : "btn"}
              onClick={() => setSelectedView("table")}
            >
              <i className="bi bi-list-ul"></i>
            </button>
            <button
              type="button"
              className={
                selectedView === "kanban" ? "btn btn-secondary" : "btn"
              }
              onClick={() => setSelectedView("kanban")}
            >
              <i className="bi bi-kanban"></i>
            </button>
          </div>
        </div>
        {selectedView === "table" ? (
          <ListView setModalTitle={setModalTitle} inventory={inventory} />
        ) : (
          <KanbanView />
        )}
      </div>
    </>
  );
};

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

        {selectedView === "table" ? (
          <ListView setModalTitle={setModalTitle} inventory={inventory} />
        ) : (
          <KanbanView />
        )}
      </div>
    </>
  );
};

import InventoryStatusModel from "./InventoryStatusModel"

interface InventoryModel {
    id: number,
    name: string,
    amount: number,
    status: InventoryStatusModel
}

export default InventoryModel
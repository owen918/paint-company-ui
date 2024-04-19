import React, { useEffect, useState } from 'react'
import SpinnerLoading from '../../utils/SpinnerLoading';
import InventoryModel from '../../models/InventoryModel';
import ListView from './components/ListView';
import KanbanView from './components/KanbanView';

export const InventoryPage = () => {

  const [inventory, setInventory] = useState<InventoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [selectedView, setSelectedView] = useState('table')
  
  useEffect(() => {
    const data = require('../../data/inventory.json')
    setInventory(data)
    setIsLoading(false)
  
  }, [inventory])

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }
  
  return (
    <div className='container my-5'>
      <h4>Paint Inventory</h4>
      <div className="d-flex mt-5 justify-content-between">
        <div className="d-flex" style={{gap: 10}}>
          <button type="button" className="btn btn-primary">Add Inventory</button>
          <button type="button" className="btn btn-secondary">Consume Inventory</button>
        </div>
        <div className="d-flex">
          <button type='button' className={selectedView === 'table' ? 'btn btn-secondary' : 'btn'} onClick={() => setSelectedView('table')}>
            <i className="bi bi-list-ul"></i>
          </button>
          <button type='button' className={selectedView === 'kanban' ? 'btn btn-secondary' : 'btn'} onClick={() => setSelectedView('kanban')}>
            <i className="bi bi-kanban"></i>
            </button>
        </div>
      </div>
      {selectedView === 'table' ? <ListView inventory={inventory} /> : <KanbanView />}
    </div>
  )
}

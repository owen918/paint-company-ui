import React from "react";

const KanbanView = () => {
    const number: number[] = [1,2,3,4,5,6,7,8,9,0]
  return (
    <div className="container-lg text-center mt-3">
      <div className="row">
        <div className="board board-available col mx-1 flex-column">
            <div className="board-title my-3">
                <h5>
                    Available
                </h5>
            </div>
            <div className="board-card d-flex flex-column">
            {number ? number.map(n => (
                <div className="card-details">
                    <div className="card-title text-start">Black</div>
                    <div className="card-details d-flex justify-content-between align-items-center">
                        <div className="inventory">15</div>
                        <button type='button' className="btn">
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </div>
                </div>

            )) : null}
            </div>
        </div>
        <div className="board board-running-low col mx-1 flex-column">
            <div className="board-title my-3">
                <h5>
                    Running Low
                </h5>
            </div>
            <div>Card 3</div>
            <div>Card 4</div>
        </div>
        <div className="board board-out-of-stock col mx-1 flex-column">
            <div className="board-title my-3">
                <h5>
                    Out of Stock
                </h5>
            </div>
            <div>Card 5</div>
        </div>
      </div>
    </div>
  );
};

export default KanbanView;

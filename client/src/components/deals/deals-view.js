import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { onDragEnd, generateDealsStageColumns } from "./deals-view-dnd-helpers";
import { Scrollbars } from 'react-custom-scrollbars-2';
import EditDeal from './edit-deal'
import './styles.css'

function DealsView(props) {
  const dispatch = useDispatch();
  const { deals } = props;
  
  const dealStageColumns = generateDealsStageColumns(deals);
  const [columns, setColumns] = useState({});

  useEffect(() => {
      setColumns(dealStageColumns);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deals])

  return (
    <div className="deals-view-outer">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns, dispatch)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="deal-area" key={columnId}>
              <div className="deal-view">
                <div className="deals-column-header">
                  <div className="deals-column-name">{column.name}</div>
                  <div className="deals-column-quantity" >{column.quantity}</div>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                    
                      <div className="deal-column-body"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                        }}
                      >
                          <Scrollbars>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="deal-item"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      ...provided.draggableProps.style
                                    }}
                                    >
                                    <EditDeal deal={item}></EditDeal>
                                    <div>{item.company['name']}</div>
                                    <div className="deal-amount">${item.amount}</div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                         </Scrollbars>
                        {provided.placeholder} 
                      </div>
                     
                    );
                  }}
                </Droppable>
     
                <div className="deals-column-footer">
                  <div className="deals-column-total"> Total ${column.amount}</div>
                </div>
         
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default DealsView;

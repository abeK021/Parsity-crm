import uuid from 'uuid/dist/v4';
import { putDeal } from '../../../actions';

export const onDragEnd = (result, columns, setColumns, dispatch) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    dispatch(
      putDeal(result.draggableId, columns[result.destination.droppableId].name)
    );
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const generateDealsStageColumns = (deals) => {
  const calculateAmountTotal = (dealStage) =>
    dealStage
      .map((deal) => deal.amount)
      .reduce((acc, dealAmount) => acc + dealAmount, 0)
      .toFixed(2);

  const dealStageColumnItems = Object.keys(deals).map((stageName) => ({
    name: deals[stageName].name,
    items: deals[stageName].items,
    quantity: deals[stageName].items.length,
    amount: calculateAmountTotal(deals[stageName].items),
  }));

  const dealStageColumnsObj = {};

  dealStageColumnItems.forEach(
    (columnDeals) => (dealStageColumnsObj[[uuid()]] = columnDeals)
  );

  return dealStageColumnsObj;
};

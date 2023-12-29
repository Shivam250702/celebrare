import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Utility function to preserve formatting from HTML content
const parseHtmlWithFormatting = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const formattedContent = doc.body.innerHTML;
  return { formattedContent, formatting: doc.body.style.cssText };
};

const Show = ({ task, setTask, history, setHistory }) => {
  const historyLength = history && history.length ? history.length : 0;
  const data = historyLength > 0 ? history[historyLength - 1][0] : [];

  const handleDelete = (toDoIndex) => {
    if (history) {
      let prevData = history[history.length - 1][0];
      let newHistData = prevData.filter((ind) => ind !== toDoIndex);
      let undo = history.length - 1;
      let redo = null;
      let newHist = [newHistData, undo, redo];
      let Hist = [...history, newHist];
      setHistory(Hist);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (startIndex !== endIndex) {
      // Reorder the items
      const newOrder = Array.from(data);
      const [removed] = newOrder.splice(startIndex, 1);
      newOrder.splice(endIndex, 0, removed);

      // Update state
      let undo = history.length - 1;
      let redo = null;
      let newHist = [newOrder, undo, redo];
      let Hist = [...history, newHist];
      setHistory(Hist);
    }
  };

  return (
    <div className="px-3 pt-2 pt-md-0">
      <div className="row justify-content-center bg-light pb-2 border border-secondary border-3 rounded shadow">
        <div className="col-12 text-center h3 bg-info text-light mb-2 p-2">
          New Text
        </div>
        {data.length === 0 && (
          <div className="col-10 rounded text-center bg-complete h4 p-4">
            Add Some text
          </div>
        )}
        {task !== undefined && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((d, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="col-12 text-left list py-2 mt-1" key={index}>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </button>
                            <span
                              className="pl-5 list-content"
                              dangerouslySetInnerHTML={{
                                __html: parseHtmlWithFormatting(task[d]).formattedContent,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default Show;

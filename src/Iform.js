import { useState } from "react";
import JoditEditor from "jodit-react";

const Iform = ({ task, setTask, history, setHistory }) => {
  const [editorContent, setEditorContent] = useState("");

  const handleAdd = (event) => {
    var form = document.querySelector(".needs-validation");
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");

    if (form.checkValidity()) {
      let preState =
        task !== undefined ? [...task, editorContent] : [editorContent];
      setTask(preState);

      let newIndex = preState.length - 1;

      let newHistData =
        history[history.length - 1][0].length === 0
          ? [newIndex]
          : [...history[history.length - 1][0], newIndex];

      let undo = history.length - 1;
      let redo = null;

      let newHist = [newHistData, undo, redo];
      let Hist = [...history, newHist];

      setHistory(Hist);

      form.reset();
      form.classList.remove("was-validated");

      setEditorContent("");
    }
  };

  const handleUndo = (e) => {
    let prevUndo = history[history.length - 1][1];
    if (prevUndo != undefined) {
      let newHistData = history[prevUndo][0];
      let undo = history[prevUndo][1];
      let redo = history.length - 1;
      let newHist = [newHistData, undo, redo];
      let Hist = [...history, newHist];

      setHistory(Hist);
    }
  };

  const handleRedo = (e) => {
    let prevRedo = history[history.length - 1][2];
    if (prevRedo != undefined) {
      let newHistData = history[prevRedo][0];
      let undo = history.length - 1;
      let redo = history[prevRedo][2];
      let newHist = [newHistData, undo, redo];
      let Hist = [...history, newHist];

      setHistory(Hist);
    }
  };

  return (
    <div className="bg-light py-5 border border-secondary border-3 rounded shadow">
      <form
        className="row g-3 justify-content-center needs-validation mt-3 pb-4"
        noValidate
      >
        <div className="col-md-8 mt-2">
          <JoditEditor
            value={editorContent}
            onChange={(newContent) => setEditorContent(newContent)}
          />
          <div className="invalid-feedback">Enter ToDo Task</div>
        </div>

        <div className="col-2 mt-2">
          <button className="btn btn-success" type="button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </form>
      <div className="row justify-content-center mt-5">
        <div className="col-5 text-right">
          <button className="btn btn-info" onClick={handleUndo}>
            Undo
          </button>
        </div>
        <div className="col-5 text-left">
          <button className="btn btn-primary" onClick={handleRedo}>
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Iform;

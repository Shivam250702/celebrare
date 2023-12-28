import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Iform from "./Iform";
import Show from "./Show";

function App() {
  const [task, setTask] = useState();
  let [history, setHistory] = useState([[[], null, null]]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-2 bg-warning rounded">
        <div className="col-md-6 text-center h2 py-2">Assignment</div>
      </div>
      <div className="row justify-centent-center pt-4">
        <div className="col-12 col-md-6 text-center">
          <Iform
            task={task}
            setTask={setTask}
            history={history}
            setHistory={setHistory}
          />
        </div>
        <div className="col-12 col-md-6 text-center">
          <Show
            task={task}
            setTask={setTask}
            history={history}
            setHistory={setHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

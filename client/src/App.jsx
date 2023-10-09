import Form from "./components/Form";
import Table from "./components/Table";
import { useAppContext } from "./context/ContextProvider";

function App() {
  const { showForm } = useAppContext();
  return (
    <div className="pt-20">
      <Table />
      {showForm && <Form />}
    </div>
  );
}

export default App;

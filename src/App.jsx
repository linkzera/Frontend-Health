import "./App.css";
import { useEffect } from "react";
import { InputTable } from "./InputTable";
import { useLocalDB } from "./context/LocalDB";
import { Button } from "@material-ui/core";
import { deleteMedicine, getAll } from "./services/services";
import { toast } from "react-toastify";

export const App = () => {
  const { tableItem, setTableITem, updateData } = useLocalDB();

  useEffect(() => {
    async function fetchData() {
      try {
        const AllData = await getAll();
        const allDataParsed = JSON.parse(AllData.response);
        setTableITem(allDataParsed);
      } catch (error) {
        toast("Erro ao buscar dados", { type: "error" });
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteMedicine(id);
      toast("Deletado com sucesso", { type: "success" });
      await updateData();
    } catch (error) {
      toast("Erro ao deletar", { type: "error" });
    }
  }

  function Table() {
    return (
      <table className="ui single line table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>COMP</th>
            <th>LAB</th>
            <th>VALID</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {tableItem?.map((item) => (
            <tr key={item.Key}>
              <td>{item.Key}</td>
              <td>{item.Record.name}</td>
              <td>{item.Record.components}</td>
              <td>{item.Record.lab}</td>
              <td>{item.Record.valid}</td>
              <td>
                <Button
                  variant="outlined"
                  color="default"
                  style={{ borderColor: "red", color: "red" }}
                  onClick={()=>{handleDelete(item.Key)}}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <div className="form">
        <InputTable />
        <Table />
      </div>
    </div>
  );
};

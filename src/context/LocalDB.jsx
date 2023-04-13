import { createContext, useState, useContext } from "react";
import { getAll } from "../services/services";
import { toast } from "react-toastify";

const LocalDBContext = createContext();

export default function LocalDBProvider({ children }) {
  const [tableItem, setTableITem] = useState([]);

  //use this function to update the table when you add or delete an item from the database
  async function updateData() {
    try {
      const data = await getAll();
      const dataParsed = JSON.parse(data.response);
      setTableITem(dataParsed);
    } catch (error) {
      toast("Erro ao atualizar dados, atualize a página e tente novamente", {
        type: "error",
      });
    }
  }

  return (
    <LocalDBContext.Provider
      value={{
        tableItem,
        setTableITem,
        updateData,
      }}
    >
      {children}
    </LocalDBContext.Provider>
  );
}

export function useLocalDB() {
  const context = useContext(LocalDBContext);
  if (!context) throw new Error("useImport precisa de um Arquivo importado");
  const { tableItem, setTableITem, updateData } = context;
  return {
    tableItem,
    setTableITem,
    updateData,
  };
}

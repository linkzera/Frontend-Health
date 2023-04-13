import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useLocalDB } from "./context/LocalDB";
import { addMedicine } from "./services/services";
import { toast } from "react-toastify";

export const InputTable = () => {
  const { tableItem, updateData } = useLocalDB();
  const initialState = {
    id: "",
    name: "",
    lab: "",
    valid: "",
    owner: "",
  };
  const [item, setItem] = useState(initialState);

  async function handleAddItem(e) {
    try {
      e.preventDefault();
      const dateFormattedToBrazil = new Date(item.valid).toLocaleDateString({
        region: "pt-BR",
        language: "pt-BR",
      });

      const itemReturn = {
        id: tableItem ? "MED" + (tableItem.length + 1) : item.id,
        name: item.name,
        lab: item.lab,
        valid: dateFormattedToBrazil,
        owner: item.owner,
      };
      console.log(itemReturn)
      setItem(initialState);
      await addMedicine(itemReturn);
      await updateData();
      toast("Adicionado com sucesso", { type: "success" });
    } catch (error) {
      toast("Erro ao adicionar", { type: "error" });
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setItem({ ...item, [name]: value });
  }

  return (
    <form onSubmit={handleAddItem} autoComplete="off" style={{display:"flex", gap:"1rem"}}>
      <TextField
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          padding: "0px 10px",
        }}
        placeholder="ID"
        name="id"
        value={tableItem ? "MED" + (tableItem.length + 1) : item.Key}
      />
      <TextField
       style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "5px",
        padding: "0px 10px",
      }}
        placeholder="NAME"
        name="name"
        required
        value={item.name}
        onChange={handleChange}
      />
      <TextField
       style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          padding: "0px 10px",
        }}
        placeholder="LAB"
        name="lab"
        value={item.lab}
        required
        onChange={handleChange}
      />
      <TextField
       style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          padding: "0px 10px",
        }}
        type="text"
        onFocus={(e) => (e.target.type = "date")}
        placeholder="VALID"
        name="valid"
        value={item.valid}
        required
        onChange={handleChange}
      />
      <TextField
       style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "5px",
          padding: "0px 10px",
        }}
        placeholder="OWNER"
        name="owner"
        value={item.owner}
        required
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="default"
        type="submit"
        style={{ backgroundColor: "lightgreen", fontWeight: "bold" }}
      >
        ADD
      </Button>
    </form>
  );
};

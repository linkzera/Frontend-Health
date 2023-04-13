import { useState } from "react";
import { useLocalDB } from "../context/LocalDB";
import { Button, Modal, TextField } from "@material-ui/core";
import { changeOwner } from "../services/services";

export const EditModal = ({ item, open, setOpen }) => {
  const { updateData } = useLocalDB();
  const [name, setName] = useState(item?.Record?.name || "");

  async function handleEditItem(e) {
    try {
      e.preventDefault();

      await changeOwner(item?.Key, name);
      await updateData();
      toast("Editado com sucesso", { type: "success" });
      setOpen(false);
    } catch (error) {
      toast("Erro ao editar", { type: "error" });
    }
  }


  return (

    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        color="default"
        style={{ borderColor: "blue", color: "blue" }}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            backgroundColor: "white",
            border: "2px solid #1e2a63",
            boxShadow: 24,
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <h2 id="simple-modal-title" style={{textAlign:'center'}}>Edit</h2>
          <form onSubmit={handleEditItem} autoComplete="off" style={{display:"flex", flexDirection:"column"}}>
            <TextField
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "5px",
                padding: "0px 10px",
                width: "100%",
              }}
          
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "1rem 0 0 0", width: "30%", alignSelf: "center", display: "flex" }}
            >
              Save
            </Button>

          </form>
        </div>
      </Modal>
    </>
  );
};

import axios from "axios";

const url = "http://localhost:8000/health";
const path = {
  getAll: "getAll",
  create: "create",
  getHisMed: "getHistoryMed",
  changeOwn: "changeOwner",
  getOne: "queryOne",
};

export async function getAll() {
  try {
    const { data } = await axios(`${url}/${path.getAll}/`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getOne(id) {
  try {
    const { data } = await axios(`${url}/${path.getOne}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getHistoryMedicine(id) {
  try {
    const { data } = await axios(`${url}/${path.getHisMed}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeOwner(id, item) {
  try {
    const { data } = await axios.post(`${url}/${path.changeOwn}/${id}`, item);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addMedicine(item) {
  try {
    const { data } = await axios.post(`${url}/${path.create}/`, item);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteMedicine(id) {
  try {
    const { data } = await axios.delete(`${url}/${path.delete}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

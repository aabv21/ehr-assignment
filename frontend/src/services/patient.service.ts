// axios
import { axiosManager } from "./axiosManager";

// dto
import { CreatePatientDto } from "@/components/dtos/create-patient.dto";
import { UpdatePatientDto } from "@/components/dtos/update-patient.dto";

export const createPatient = async (data: [{ patient: CreatePatientDto }]) => {
  const res = await axiosManager.POST(`/patients`, data);
  return res.data;
};

export const getPatients = async () => {
  const res = await axiosManager.GET(`/patients/list`);
  return res.data;
};

export const getPatient = async (id: string) => {
  const res = await axiosManager.GET(`/patients/${id}`);
  return res.data;
};

export const editPatient = async (id: string, data: UpdatePatientDto) => {
  const res = await axiosManager.PUT(`/patients/${id}`, data);
  return res.data;
};

export const deletePatient = async (id: string) => {
  const res = await axiosManager.DELETE(`/patients/${id}`);
  return res.data;
};

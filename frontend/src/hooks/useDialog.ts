import { useContext } from "react";
import { DialogContext } from "@/contexts/dialogContext";

export const useDialog = () => {
  return useContext(DialogContext);
};

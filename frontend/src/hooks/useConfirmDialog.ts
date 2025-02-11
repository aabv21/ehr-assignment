import { useContext } from "react";
import { ConfirmDialogContext } from "@/contexts/confirmDialogContext";

export const useConfirmDialog = () => {
  return useContext(ConfirmDialogContext);
};

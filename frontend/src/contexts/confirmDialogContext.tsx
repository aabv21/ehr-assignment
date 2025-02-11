import { createContext, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { refresDataRevision } from "@/store/tools/revisionSlice";
import { toast } from "@/hooks/use-toast";

export const ConfirmDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const [{ props: dialogProps, ...dialogParams }, setDialog] = useState({
    children: null,
  });
  const [open, setOpen] = useState(false);

  const openConfirmDialog = (dialog) => {
    setDialog(dialog);
    setOpen(true);
  };

  const closeConfirmDialog = () => {
    setOpen(false);
  };

  const contextValue = useRef({ openConfirmDialog, closeConfirmDialog });

  const onClick = async () => {
    try {
      await dialogParams.onContinue();

      // state refresh
      if (dialogParams.triggerEvent) {
        dispatch(refresDataRevision({ event: dialogParams.triggerEvent }));
      }

      toast({
        description:
          dialogParams.successMessage ?? "Action successfully executed.",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({ variant: "destructive", description: err.message });
      }
    }
  };

  return (
    <ConfirmDialogContext.Provider value={contextValue.current}>
      {children}
      <AlertDialog
        open={open}
        modal
        onClose={closeConfirmDialog}
        {...dialogProps}
        onOpenChange={closeConfirmDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            {dialogParams.description && (
              <AlertDialogDescription>
                {dialogParams.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {dialogParams.onContinue && (
              <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
};

export const ConfirmDialogContext = createContext();

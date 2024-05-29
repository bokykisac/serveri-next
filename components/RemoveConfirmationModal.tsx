import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/ui/Button";
import { Dispatch, SetStateAction, PropsWithChildren } from "react";
import { AlertCircle } from "lucide-react";

interface RemoveConfirmationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeAction: () => void;
}

const RemoveConfirmationModal = ({
  open,
  setOpen,
  removeAction,
  children,
}: PropsWithChildren<RemoveConfirmationModalProps>) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-full max-w-3xl overflow-y-auto pb-2">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            <div className="flex items-center justify-center gap-3">
              <AlertCircle className="my-4 h-10 w-10 text-primary" />
              Are you sure?
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <p>{children}</p>
        </div>
        <DialogDescription className="text-center">
          This operation cannot be undone.
        </DialogDescription>
        <div className="flex flex-row justify-between pt-4">
          <DialogClose asChild>
            <Button size="lg" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" type="submit" onClick={removeAction}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveConfirmationModal;

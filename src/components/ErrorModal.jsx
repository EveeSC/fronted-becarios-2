'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ErrorModal({ isOpen, onClose, errorMessage }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription className="mt-2">
          {errorMessage}
        </DialogDescription>
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="default">Aceptar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
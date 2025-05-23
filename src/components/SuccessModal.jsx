'use client';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SuccessModal({ isOpen, onClose, message }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Éxito</DialogTitle>
        <DialogDescription className="mt-2">
          {message}
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
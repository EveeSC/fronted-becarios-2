'use client';
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function SuccessModal1({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <div className="flex flex-col items-center gap-2 py-6">
          <CheckCircle2 className="h-24 w-24 text-[#253A69]" />
          <p className="text-xl font-medium text-[#253A69] mb-4">
            Actividad inscrita correctamente
          </p>
          <Button 
            onClick={onClose}
            className="bg-[#253A69] hover:bg-[#1E2E56] text-white px-10 py-2"
          >
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


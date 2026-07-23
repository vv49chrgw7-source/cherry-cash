"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface DeleteTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTransactionModal({
  open,
  onClose,
  onConfirm,
}: DeleteTransactionModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-5"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-sm rounded-[32px] border border-white/40 p-7"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <Trash2
                size={38}
                className="text-red-500"
              />
            </div>

            <h2 className="text-center text-2xl font-black">
              Удалить операцию?
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Это действие нельзя отменить.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                className="glass flex-1 rounded-2xl border border-white/40 py-3 font-semibold"
              >
                Отмена
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 rounded-2xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
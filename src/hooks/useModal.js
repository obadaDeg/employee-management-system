import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState(null);

  const openModal = (newContext = null) => {
    setContext(newContext);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContext(null);
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, context };
}
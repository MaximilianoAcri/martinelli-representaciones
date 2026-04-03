"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Producto } from "@/types";

interface CotizacionContextType {
  isOpen: boolean;
  productoSeleccionado: Producto | null;
  openModal: (producto?: Producto) => void;
  closeModal: () => void;
}

const CotizacionContext = createContext<CotizacionContextType | null>(null);

export function CotizacionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const openModal = (producto?: Producto) => {
    setProductoSeleccionado(producto || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductoSeleccionado(null);
  };

  return (
    <CotizacionContext.Provider value={{ isOpen, productoSeleccionado, openModal, closeModal }}>
      {children}
    </CotizacionContext.Provider>
  );
}

export function useCotizacion() {
  const context = useContext(CotizacionContext);
  if (!context) {
    throw new Error("useCotizacion must be used within a CotizacionProvider");
  }
  return context;
}

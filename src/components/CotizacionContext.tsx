"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Producto } from "@/types";

export interface ItemCotizacion {
  id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
}

interface CotizacionContextType {
  isOpen: boolean;
  productoSeleccionado: Producto | null;
  items: ItemCotizacion[];
  toast: { show: boolean; mensaje: string };
  openModal: (producto?: Producto) => void;
  closeModal: () => void;
  addItem: (producto: Producto | any) => void; // Using any for partial compat if needed
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearItems: () => void;
  hideToast: () => void;
}

const CotizacionContext = createContext<CotizacionContextType | null>(null);

// Cargar desde localStorage
function loadFromStorage(): ItemCotizacion[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("cotizacion-items");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Guardar en localStorage
function saveToStorage(items: ItemCotizacion[]) {
  if (typeof window === "undefined") return;
  try {
    if (items.length > 0) {
      localStorage.setItem("cotizacion-items", JSON.stringify(items));
    } else {
      localStorage.removeItem("cotizacion-items");
    }
  } catch {
    // Silent fail
  }
}

export function CotizacionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [items, setItems] = useState<ItemCotizacion[]>([]);
  const [toast, setToast] = useState({ show: false, mensaje: "" });
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar desde localStorage alhydratarse
  useEffect(() => {
    const guardados = loadFromStorage();
    setItems(guardados);
    setIsHydrated(true);
  }, []);

  // Guardar en localStorage cuando cambian los items
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(items);
    }
  }, [items, isHydrated]);

  // Para saber si mostrar el floating cart (aunque items esté vacío antes de hydrate)
  const tieneItems = items.length > 0;

  const addItem = (producto: any, mostrarToast = true) => {
    setItems((prev) => {
      const yaExiste = prev.find(i => i.id === producto.id);
      if (!yaExiste) {
        // Mostrar toast solo si es nuevo
        if (mostrarToast) {
          setToast({ show: true, mensaje: `${producto.nombre} agregado a tu solicitud` });
          setTimeout(() => setToast({ show: false, mensaje: "" }), 3000);
        }
        return [...prev, {
          id: producto.id,
          nombre: producto.nombre,
          unidad: producto.unidad || "unidad",
          cantidad: 1,
        }];
      }
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad < 1) return;
    setItems((prev) => prev.map(i => i.id === id ? { ...i, cantidad } : i));
  };

  const clearItems = () => setItems([]);

  const hideToast = () => setToast({ show: false, mensaje: "" });

  const openModal = (producto?: Producto) => {
    setProductoSeleccionado(producto || null);
    if (producto) {
      addItem(producto);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductoSeleccionado(null);
  };

  return (
    <CotizacionContext.Provider value={{ 
      isOpen, productoSeleccionado, items, toast,
      openModal, closeModal, addItem, removeItem, updateQuantity, clearItems, hideToast 
    }}>
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

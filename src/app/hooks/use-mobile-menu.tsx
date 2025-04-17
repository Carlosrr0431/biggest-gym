"use client"

import { create } from "zustand"

type MobileMenuStore = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useMobileMenu = create<MobileMenuStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))

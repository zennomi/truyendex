"use client";

import {
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";

import { useCookies } from "@/hooks/useCookies";

import type {
  SettingsState,
  SettingsContextValue,
  SettingsProviderProps,
} from "@/types";

const STORAGE_KEY = "truyendex-settings";

export const defaultSettings: SettingsState = {} as const;

// ----------------------------------------------------------------------

export const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

export const SettingsConsumer = SettingsContext.Consumer;

// ----------------------------------------------------------------------

export function SettingsProvider({
  children,
  settings,
}: SettingsProviderProps) {
  const values = useCookies<SettingsState>(
    STORAGE_KEY,
    settings,
    defaultSettings,
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...values.state,
      canReset: values.canReset,
      onReset: values.resetState,
      onUpdate: values.setState,
      onUpdateField: values.setField,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    }),
    [
      values.canReset,
      values.resetState,
      values.setField,
      values.setState,
      values.state,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    ],
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
}

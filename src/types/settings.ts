export type SettingsState = {
  filteredLanguages: string[];
  originLanguages: string[];
  filteredContent: string[];
  dataSaver: boolean;
  maxImageWidth?: number;
};

export type SettingsContextValue = SettingsState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<SettingsState>) => void;
  onUpdateField: (
    name: keyof SettingsState,
    updateValue: SettingsState[keyof SettingsState],
  ) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  settings: SettingsState | null;
  children: React.ReactNode;
};

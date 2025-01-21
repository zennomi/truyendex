"use client";

import { useSettingsContext } from "@/contexts/settings";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/react";
import { Button } from "./Button";
import CheckboxList from "./checkbox-list";
import MultiSelectDropdown from "./multiselect-dropdown";
import Iconify from "../iconify";

export default function SettingsDialog() {
  const {
    openDrawer,
    onCloseDrawer,
    filteredLanguages,
    filteredContent,
    originLanguages,
    dataSaver,
    onUpdateField,
    onReset,
    onUpdate,
  } = useSettingsContext();

  return (
    <>
      <Dialog
        open={openDrawer}
        onClose={onCloseDrawer}
        className="relative z-50 dark:text-white"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded border bg-black p-12 shadow">
            <DialogTitle className="font-bold">Tuỳ chỉnh</DialogTitle>
            <Description>
              Những tuỳ chỉnh này được lưu tại thiết bị hiện tại.
            </Description>
            <div className="font-bold">Ngôn ngữ bản dịch:</div>
            <div className="flex items-center justify-between">
              <div>Tiếng Anh</div>
              <Switch
                checked={filteredLanguages.includes("vi")}
                onChange={(value) =>
                  onUpdateField("filteredLanguages", value ? ["vi"] : ["en"])
                }
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
              </Switch>
              <div>Tiếng Việt</div>
            </div>
            <div className="font-bold">Chất lượng ảnh:</div>
            <div className="flex items-center justify-between">
              <div>Nét căng</div>
              <Switch
                checked={dataSaver}
                onChange={(value) => onUpdateField("dataSaver", value)}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
              </Switch>
              <div>Tiết kiệm</div>
            </div>
            <div className="font-bold">Truyện của quốc gia:</div>
            <MultiSelectDropdown
              options={[
                { label: "Nhật (manga)", value: "ja" },
                { label: "Hàn (manhwa)", value: "ko" },
                { label: "Trung (manhua)", value: "zh" },
                { label: "Việt Nam", value: "vi" },
              ]}
              selectedValues={originLanguages}
              onChange={(values) => onUpdateField("originLanguages", values)}
            />
            <div className="font-bold">Nội dung:</div>
            <CheckboxList
              options={[
                { label: "An toàn", value: "safe" },
                { label: "Hơi ấy", value: "suggestive" },
                { label: "Không an toàn", value: "erotica" },
                { label: "Bùng lổ", value: "pornographic" },
              ]}
              selectedValues={filteredContent}
              onChange={(value) => onUpdateField("filteredContent", value)}
            />
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  onCloseDrawer();
                  onUpdate({
                    filteredContent,
                    filteredLanguages,
                    dataSaver,
                    originLanguages,
                  });
                }}
              >
                Lưu
              </Button>
              <Button icon={<Iconify icon="fa:refresh" />} onClick={onReset}>
                Reset
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

"use client";

import { MouseEvent, useCallback } from "react";

import { Button } from "./Button";
import MultiSelectDropdown from "./multiselect-dropdown";
import Iconify from "../iconify";
import { Slider } from "../shadcn/slider";
import { Switch } from "../shadcn/switch";
import { useSettingsContext } from "@/contexts/settings";
import useWindowSize from "@/hooks/useWindowSize";

export default function SettingsDialog() {
  const {
    openDrawer,
    onCloseDrawer,
    filteredLanguages,
    filteredContent,
    originLanguages,
    dataSaver,
    maxImageWidth,
    onUpdateField,
    onReset,
    onUpdate,
  } = useSettingsContext();

  const { width: windowWidth } = useWindowSize();

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.id === "settings-backdrop") {
        onCloseDrawer();
      }
    },
    [onCloseDrawer],
  );

  if (!openDrawer) return null;

  return (
    <div
      id="settings-backdrop"
      className="fixed inset-0 z-10 flex items-center justify-center bg-neutral-950 bg-opacity-90 text-white"
      onClick={handleBackdropClick}
    >
      <div className="max-w-lg space-y-4 rounded border bg-neutral-900 p-12 shadow">
        <div className="font-bold">Tuỳ chỉnh</div>
        <div>Những tuỳ chỉnh này được lưu tại thiết bị hiện tại.</div>
        <div className="font-bold">Ngôn ngữ bản dịch:</div>
        <div className="flex items-center justify-between">
          <div>Tiếng Anh</div>
          <Switch
            checked={filteredLanguages.includes("vi")}
            onCheckedChange={(value) =>
              onUpdateField("filteredLanguages", value ? ["vi"] : ["en"])
            }
          />
          <div>Tiếng Việt</div>
        </div>
        <div className="font-bold">Chất lượng ảnh:</div>
        <div className="flex items-center justify-between">
          <div>Nét căng</div>
          <Switch
            checked={dataSaver}
            onCheckedChange={(value) => onUpdateField("dataSaver", value)}
          />
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
          anyLabel="Tất cả quốc gia"
          language
        />
        <div className="font-bold">Lọc nội dung:</div>
        <MultiSelectDropdown
          options={[
            { label: "An toàn", value: "safe" },
            { label: "16+", value: "suggestive" },
            { label: "18+", value: "erotica" },
            { label: "18++", value: "pornographic" },
          ]}
          selectedValues={filteredContent}
          onChange={(values) => onUpdateField("filteredContent", values)}
          anyLabel="Tất cả nội dung"
        />
        <div className="flex items-center gap-2">
          <Switch
            checked={maxImageWidth !== undefined}
            onCheckedChange={(value) =>
              onUpdateField("maxImageWidth", value ? 0 : undefined)
            }
          />
          <div className="font-bold">Chiều rộng ảnh</div>
          {maxImageWidth !== undefined && (
            <span className="font-normal text-muted-foreground">
              {"(" + maxImageWidth + "px)"}
            </span>
          )}
        </div>
        {maxImageWidth !== undefined && (
          <Slider
            min={0}
            max={windowWidth || 0}
            value={
              maxImageWidth ? [maxImageWidth] : [(windowWidth || 0) * 0.8 || 0]
            }
            onValueChange={(value) =>
              onUpdateField("maxImageWidth", value[0] || 0)
            }
          />
        )}
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
      </div>
    </div>
  );
}

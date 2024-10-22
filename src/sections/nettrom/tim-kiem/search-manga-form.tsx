"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import { MangadexApi } from "@/api";
import { Tag } from "@/types/mangadex";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { tags } from "@/constants";
import { getSearchNetTromUrl } from "@/utils/url";
import {
  normalizeParams,
  translateContentRating,
  translateStatus,
} from "@/utils/mangadex";

type Inputs = MangadexApi.Manga.GetSearchMangaRequestOptions & {
  orderType?: string;
};

const getCheckboxIcon = (state: number) => {
  switch (state) {
    case 1:
      return "icon-tick";
    case 0:
      return "icon-checkbox";
    default:
      return "icon-cross";
  }
};

const optionlize = (
  t: string,
  parser: (t: string) => string = (t) => t.toUpperCase(),
) => ({ value: t, label: parser(t) });

const selectStyles: StylesConfig<{ value: string; label: string }, true> = {
  control: (styles) => ({ ...styles }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    color: "black",
    // backgroundColor: isDisabled
    // ? undefined
    // : isSelected
    // ? data.color
    // : isFocused
    // ? color.alpha(0.1).css()
    // : undefined,
  }),
};

export default function SearchMangaForm() {
  const router = useRouter();
  const params = useSearchParams();

  const { register, handleSubmit, watch, reset, setValue, control } =
    useForm<Inputs>({});
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(getSearchNetTromUrl(data));
  };
  const values = watch();

  const getStateTag = (tag: Tag) => {
    if (values.includedTags?.includes(tag.id)) return 1;
    if (values.excludedTags?.includes(tag.id)) return -1;
    return 0;
  };

  const updateStateTag = (tag: Tag) => {
    switch (getStateTag(tag)) {
      case 1:
        setValue("includedTags", [
          ...(values.includedTags?.filter((t) => t !== tag.id) || []),
        ]);
        setValue("excludedTags", [...(values.excludedTags || []), tag.id]);
        break;
      case 0:
        setValue("includedTags", [...(values.includedTags || []), tag.id]);
        break;
      default:
        setValue("includedTags", [
          ...(values.includedTags?.filter((t) => t !== tag.id) || []),
        ]);
        setValue("excludedTags", [
          ...(values.excludedTags?.filter((t) => t !== tag.id) || []),
        ]);
        break;
    }
  };

  useEffect(() => {
    const normalizedParams: Inputs = normalizeParams(params);
    if (!params.get("orderType") && normalizedParams.order) {
      if (
        normalizedParams.order.latestUploadedChapter ===
        MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "0";
      else if (
        normalizedParams.order.createdAt === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "1";
      else if (
        normalizedParams.order.followedCount === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "2";
      else if (normalizedParams.order.title === MangadexApi.Static.Order.ASC)
        normalizedParams.orderType = "3";
      else if (
        normalizedParams.order.relevance === MangadexApi.Static.Order.DESC
      )
        normalizedParams.orderType = "4";
      else if (normalizedParams.order.rating === MangadexApi.Static.Order.DESC)
        normalizedParams.orderType = "5";
    }
    reset({ ...normalizedParams });
  }, [params]);

  useEffect(() => {
    const orderType = values.orderType;
    switch (orderType) {
      case "0":
        setValue("order", {
          latestUploadedChapter: MangadexApi.Static.Order.DESC,
        });
        break;
      case "1":
        setValue("order", { createdAt: MangadexApi.Static.Order.DESC });
        break;
      case "2":
        setValue("order", { followedCount: MangadexApi.Static.Order.DESC });
        break;
      case "3":
        setValue("order", { title: MangadexApi.Static.Order.ASC });
        break;
      case "4":
        setValue("order", { relevance: MangadexApi.Static.Order.DESC });
        break;
      case "5":
        setValue("order", { rating: MangadexApi.Static.Order.DESC });
        break;
      default:
        break;
    }
  }, [values.orderType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="advsearch-form">
          <div className="form-group clearfix">
            <p className="mrb5">
              <span className="icon-tick"></span> Tìm trong những thể loại này
            </p>
            <p className="mrb5">
              <span className="icon-cross"></span> Loại trừ những thể loại này
            </p>
            <p className="mrb5">
              <span className="icon-checkbox"></span> Truyện có thể thuộc hoặc
              không thuộc thể loại này
              <a
                className="btn btn-primary btn-sm pull-right btn-reset"
                onClick={() => reset()}
              >
                <i className="fa fa-refresh" /> Reset
              </a>
            </p>
          </div>
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label mrt5 mrt5">Tựa đề</label>
            <input className="form-control" {...register("title")} />
          </div>
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label mrt5 mrt5">Thể loại</label>
            <div className="col-sm-10">
              <div className="row">
                {tags.map((tag, idx) => {
                  const state = getStateTag(tag);
                  return (
                    <div
                      className="col-md-3 col-sm-4 col-xs-6 mrb10 cursor-pointer"
                      key={tag.id}
                      onClick={() => updateStateTag(tag)}
                    >
                      <div
                        className="genre-item"
                        title={tag.attributes.description.en}
                      >
                        <span
                          className={getCheckboxIcon(state)}
                          data-id={idx}
                        ></span>
                        {tag.attributes.name.en}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Sếch?</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="contentRating"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={Object.values(
                      MangadexApi.Static.MangaContentRating,
                    ).map((v) => optionlize(v, translateContentRating))}
                    onChange={(newValue) => {
                      onChange(newValue.map((item) => item.value));
                    }}
                    isMulti={true}
                    onBlur={onBlur}
                    value={value?.map((v) =>
                      optionlize(v, translateContentRating),
                    )}
                    name={name}
                    ref={ref}
                    placeholder="Tất cả"
                    styles={selectStyles}
                  />
                )}
              />
            </div>
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Tình trạng</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={Object.values(
                      MangadexApi.Static.MangaPublicationStatus,
                    ).map((v) => optionlize(v, translateStatus))}
                    onChange={(newValue) => {
                      onChange(newValue.map((item) => item.value));
                    }}
                    isMulti={true}
                    onBlur={onBlur}
                    value={value?.map((v) => optionlize(v, translateStatus))}
                    name={name}
                    ref={ref}
                    placeholder="Tất cả"
                    styles={selectStyles}
                  />
                )}
              />
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Dành cho</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="publicationDemographic"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={Object.values(
                      MangadexApi.Static.MangaPublicationDemographic,
                    ).map((v) => optionlize(v))}
                    onChange={(newValue) => {
                      onChange(newValue.map((item) => item.value));
                    }}
                    isMulti={true}
                    onBlur={onBlur}
                    value={value?.map((v) => optionlize(v))}
                    name={name}
                    ref={ref}
                    placeholder="Tất cả"
                    styles={selectStyles}
                  />
                )}
              />
            </div>
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Sắp xếp theo</label>
            </div>
            <div className="col-sm-4">
              <select
                className="form-control select-sort"
                {...register("orderType")}
              >
                <option value={"0"}>Mới cập nhật</option>
                <option value={"1"}>Truyện mới</option>
                <option value={"2"}>Theo dõi nhiều nhất</option>
                <option value={"3"}>Bảng chữ cái</option>
                <option value={"4"}>Liên quan nhất</option>
                <option value={"5"}>Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-4 col-sm-offset-2">
              <button type="submit" className="btn btn-success btn-search">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

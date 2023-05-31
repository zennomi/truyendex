"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { GetSearchMangaRequestOptions, MangaContentRating, MangaPublicationDemographic, MangaPublicationStatus, MangadexMangaState } from "../../api/manga";
import useTags from "../../hooks/useTags";
import { Tag } from "../../api/schema";
import { parseStatus } from "../../utils/parseMangadex";
import { buildQueryStringFromOptions } from "../../api/util";
import { useRouter, useSearchParams } from "next/navigation";
import routes from "../../routes";
import { useEffect } from "react";
import normalizeParams from "../../utils/normalizeParams";
import { Order } from "../../api/static";
import Loading from "../../components/nettrom/loading";
type Inputs = GetSearchMangaRequestOptions & {
    orderType?: string,
};

const getCheckboxIcon = (state: number) => {
    switch (state) {
        case 1:
            return "icon-tick"
        case 0:
            return "icon-checkbox"
        default:
            return "icon-cross"
    }
}

export default function SearchMangaForm() {
    const router = useRouter()
    const params = useSearchParams()


    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<Inputs>({});
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const queryString = buildQueryStringFromOptions(data)
        router.push(`${routes.nettrom.search}${queryString.replaceAll("[]", "")}#results`)
    }
    const values = watch()
    console.log({ values })

    const getStateTag = (tag: Tag) => {
        if (values.includedTags?.includes(tag.id)) return 1
        if (values.excludedTags?.includes(tag.id)) return -1
        return 0
    }

    const updateStateTag = (tag: Tag) => {
        switch (getStateTag(tag)) {
            case 1:
                setValue("includedTags", [...values.includedTags?.filter(t => t !== tag.id) || []])
                setValue("excludedTags", [...values.excludedTags || [], tag.id])
                break;
            case 0:
                setValue("includedTags", [...values.includedTags || [], tag.id])
                break;
            default:
                setValue("includedTags", [...values.includedTags?.filter(t => t !== tag.id) || []])
                setValue("excludedTags", [...values.excludedTags?.filter(t => t !== tag.id) || []])
                break;
        }
    }

    const { tags, isLoading } = useTags()

    useEffect(() => {
        reset({ ...normalizeParams(params) })
    }, [params])

    useEffect(() => {
        const orderType = values.orderType
        switch (orderType) {
            case "0":
                setValue('order', { createdAt: Order.DESC })
                break;
            case "1":
                setValue('order', { createdAt: Order.DESC })
                break;
            case "2":
                setValue('order', { followedCount: Order.DESC })
                break;
            case "3":
                setValue('order', { title: Order.ASC })
                break;
            case "4":
                setValue('order', { relevance: Order.DESC })
                break;
            case "5":
                setValue('order', { rating: Order.DESC })
                break;
            default:
                break;
        }
    }, [values.orderType])

    if (isLoading) return (<Loading />)
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
                            <span className="icon-checkbox"></span> Truyện có thể thuộc hoặc không
                            thuộc thể loại này
                            <a
                                className="btn btn-primary btn-sm pull-right btn-reset"
                                onClick={() => reset()}
                            >
                                <i className="fa fa-refresh" /> Reset
                            </a>
                        </p>
                    </div>
                    <div className="form-group clearfix">
                        <label className="col-sm-2 control-label mrt5 mrt5">Thể loại</label>
                        <div className="col-sm-10">
                            <div className="row">
                                {
                                    tags.map((tag, idx) => {
                                        const state = getStateTag(tag)
                                        return (
                                            <div className="col-md-3 col-sm-4 col-xs-6 mrb10 cursor-pointer" key={tag.id}
                                                onClick={() => updateStateTag(tag)}
                                            >
                                                <div
                                                    className="genre-item"
                                                    title={tag.attributes.description.en}
                                                >
                                                    <span className={getCheckboxIcon(state)} data-id={idx}></span>{tag.attributes.name.en}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group clearfix">
                        <div className="col-sm-2 control-label mrt5">
                            <label htmlFor="status">Sếch?</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control select-minchapter">
                                <option selected={values.contentRating?.includes(MangaContentRating.SAFE)}
                                    onClick={() => setValue('contentRating', [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE])}
                                >Thôi
                                </option>
                                <option selected={values.contentRating?.length === 0}
                                    onClick={() => setValue('contentRating', [])}
                                >Yesss</option>
                            </select>
                        </div>
                        <div className="col-sm-2 control-label mrt5">
                            <label htmlFor="status">Tình trạng</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control select-status">
                                {
                                    Object.values(MangaPublicationStatus).map(status => (
                                        <option key={status} selected={values.status?.includes(status)}
                                            onClick={() => setValue('status', [status])}
                                        >{parseStatus(status)}</option>
                                    ))
                                }
                                <option selected={!values.status || values.status?.length === 0} onClick={() => setValue('status', [])}>
                                    Tất cả
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group clearfix">
                        <div className="col-sm-2 control-label mrt5">
                            <label htmlFor="status">Dành cho</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control select-gender">
                                <option
                                    selected={values.publicationDemographic?.includes(MangaPublicationDemographic.SHOUJO)}
                                    onClick={() => {
                                        console.log("Clock genfer")
                                        setValue('publicationDemographic', [MangaPublicationDemographic.JOSEI, MangaPublicationDemographic.SHOUJO])
                                    }}
                                >
                                    Con gái
                                </option>
                                <option
                                    selected={values.publicationDemographic?.includes(MangaPublicationDemographic.SHOUNEN)}
                                    onClick={() => setValue('publicationDemographic', [MangaPublicationDemographic.SHOUNEN, MangaPublicationDemographic.SEINEN])}
                                >
                                    Con trai
                                </option>
                                <option
                                    selected={!values.publicationDemographic || values.publicationDemographic.length === 0}
                                    onClick={() => setValue('publicationDemographic', [])}
                                >
                                    Tất cả
                                </option>
                            </select>
                        </div>
                        <div className="col-sm-2 control-label mrt5">
                            <label htmlFor="status">Sắp xếp theo</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control select-sort" {...register("orderType")}>
                                <option value={0}>
                                    Mới cập nhật
                                </option>
                                <option value={1}>Truyện mới</option>
                                <option value={2}>Theo dõi nhiều nhất</option>
                                <option value={3}>Bảng chữ cái</option>
                                <option value={4}>Liên quan nhất</option>
                                <option value={5}>Đánh giá cao nhất</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group clearfix">
                        <div className="col-sm-4 col-sm-offset-2">
                            <button type="submit" className="btn btn-success btn-search">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { GetSearchMangaRequestOptions, MangaContentRating, MangaPublicationStatus, MangadexMangaState } from "../../api/manga";
import useTags from "../../hooks/useTags";
import { Tag } from "../../api/schema";
import { parseStatus } from "../../utils/parseMangadex";
import { buildQueryStringFromOptions } from "../../api/util";
import { useRouter, useSearchParams } from "next/navigation";
import routes from "../../routes";
import { useEffect } from "react";
import normalizeParams from "../../utils/normalizeParams";
type Inputs = GetSearchMangaRequestOptions;

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

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<Inputs>({
        defaultValues: {
            authors: [],
            artists: [],
            includedTags: [],
            includedTagsMode: 'AND',
            excludedTags: [],
            excludedTagsMode: 'OR',
            status: [],
            originalLanguage: ['vi'],
            excludedOriginalLanguage: [],
            availableTranslatedLanguage: ['vi'],
            publicationDemographic: [],
            contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
        }
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const queryString = buildQueryStringFromOptions(data)
        router.push(`${routes.nettrom.search}${queryString.replaceAll("[]", "")}#results`)
    }
    const values = watch()

    console.log({ ...values })

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
        reset(normalizeParams(params))
    }, [params])

    if (isLoading) return <div>Loading...</div>
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
                                <option selected={values.status?.length === 0} onClick={() => setValue('status', [])}>
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
                                <option value={1}>Con gái</option>
                                <option value={2}>Con trai</option>
                                <option selected={true} value={-1}>
                                    Tất cả
                                </option>
                            </select>
                        </div>
                        <div className="col-sm-2 control-label mrt5">
                            <label htmlFor="status">Sắp xếp theo</label>
                        </div>
                        <div className="col-sm-4">
                            <select className="form-control select-sort">
                                <option selected={true} value={0}>
                                    Chapter mới
                                </option>
                                <option value={15}>Truyện mới</option>
                                <option value={10}>Xem nhiều nhất</option>
                                <option value={11}>Xem nhiều nhất tháng</option>
                                <option value={12}>Xem nhiều nhất tuần</option>
                                <option value={13}>Xem nhiều nhất hôm nay</option>
                                <option value={20}>Theo dõi nhiều nhất</option>
                                <option value={25}>Bình luận nhiều nhất</option>
                                <option value={30}>Số chapter nhiều nhất</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group clearfix">
                        <div className="col-sm-4 col-sm-offset-2">
                            <input type="submit" className="btn btn-success btn-search" title="Tìm kiếm" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
import Link from "next/link";
import { chunk } from "lodash";

import routes from "../../routes";
import tags from "../../constants/tags";
import { ta } from "date-fns/locale";
import transLocalizedStr from "../../utils/transLocalizedStr";

export default function MainNav() {
    return (
        <nav className="main-nav hidden-xs" id="mainNav" style={{ "zIndex": 1000, "position": "relative", "top": "0px" }}>
            <div className="inner">
                <div className="container">
                    <div className="Module Module-144"><div className="ModuleContent"><ul className="nav navbar-nav main-menu">
                        <li className="active">
                            <Link target="_self" href={routes.nettrom.index}>
                                <i className="fa fa-home hidden-xs">
                                </i>
                                <span className="visible-xs">Trang chủ</span>
                            </Link>
                        </li>
                        <li>
                            <Link target="_self" href={`${routes.nettrom.search}?order[followedCount]=desc#results`}>Hot</Link>
                        </li>
                        <li>
                            <Link target="_self" href={`${routes.nettrom.search}?order[rating]=desc#results`}>Yêu thích</Link>
                        </li>
                        <li>
                            <Link target="_self" href={`${routes.nettrom.search}?order[createdAt]=desc#results`}>Mới cập nhật</Link>
                        </li>
                        <li className="dropdown">
                            <Link className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" target="_self" href={routes.nettrom.search}>Thể loại <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-menu megamenu">
                                <li>
                                    <div className="clearfix">
                                        {
                                            chunk(tags, 13).map((col, idx) => (
                                                <div className="col-sm-3">
                                                    <ul className="nav">
                                                        {
                                                            col.map(tag => (
                                                                <li key={tag.id}>
                                                                    <Link title={transLocalizedStr(tag.attributes.description)} data-title={transLocalizedStr(tag.attributes.description)} href={`${routes.nettrom.search}?includedTags=${tag.id}#results`}>{transLocalizedStr(tag.attributes.name)}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            ))
                                        }
                                        <div className="col-sm-12 hidden-xs">
                                            <p className="tip">
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link target="_self" href={routes.nettrom.search}>Tìm truyện</Link>
                        </li>
                        <li>
                            <Link target="_self" href={`${routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}>Con gái</Link>
                        </li>
                        <li>
                            <Link target="_self" href={`${routes.nettrom.search}?publicationDemographic=seinen&publicationDemographic=shounen#results`}>Con trai</Link>
                        </li>
                    </ul></div></div>
                </div>
            </div>
        </nav>
    )
}
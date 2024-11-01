import { MangadexApi } from "@/api";
import { User } from "@/types/mangadex";
import NewUpdates from "@/components/sections/nettrom/common/new-updates";
import TopTitles from "@/components/sections/nettrom/common/top-titles-table";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Constants } from "@/constants";

export async function generateMetadata(
  { params }: { params: { groupId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.groupId;

  const previousImages = (await parent).openGraph?.images || [];
  const mdImage = {
    url: `https://og.mangadex.org/og-image/group/${id}`,
    width: 1200,
    height: 630,
  };
  try {
    // fetch data
    const {
      data: { data: group },
    } = await MangadexApi.Group.getGroupId(id, {
      includes: [
        MangadexApi.Static.Includes.LEADER,
        MangadexApi.Static.Includes.MEMBER,
      ],
    });

    return {
      title: `Nhóm dịch ${group.attributes.name} - Đọc ngay tại ${Constants.APP_NAME}`,
      description: `${group.attributes.description}`,
      openGraph: {
        images: [mdImage],
      },
      twitter: {
        images: [mdImage],
      },
    };
  } catch (error) {
    console.error(error);
  }
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: "Đọc ngay tại NetTrom",
    description: "NetTrom - Website Trộm Truyện Văn Minh",
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function NhomDich({
  params,
}: {
  params: { groupId: string };
}) {
  const id = params.groupId;
  const {
    data: { data: group },
  } = await MangadexApi.Group.getGroupId(id, {
    includes: [
      MangadexApi.Static.Includes.LEADER,
      MangadexApi.Static.Includes.MEMBER,
    ],
  });
  if (!group) return notFound();

  const leaders = group.relationships.filter(
    (r) => r.type === "leader",
  ) as unknown as User[];

  const members = group.relationships.filter(
    (r) => r.type === "member",
  ) as unknown as User[];

  return (
    <div className="row">
      <div id="ctl00_divCenter" className="center-side col-md-8">
        <article id="item-detail">
          <h1 className="title-detail">Nhóm dịch {group.attributes.name}</h1>
          {group.attributes.focusedLanguages && (
            <time className="small">
              Ngôn ngữ:{" "}
              {group.attributes.focusedLanguages
                .map((l) => l.toUpperCase())
                .join("; ")}
            </time>
          )}
          <div className="detail-info md:ps-3">
            <div className="row mx-0">
              <ul className="list-info">
                {leaders.length > 0 && (
                  <li className="author row">
                    <p className="name col-xs-4">
                      <i className="fa fa-user"></i> Nhóm trưởng
                    </p>
                    <p className="col-xs-8">
                      {leaders.map((l) => l.attributes.username).join("; ")}
                    </p>
                  </li>
                )}
                {members.length > 0 && (
                  <li className="author row">
                    <p className="name col-xs-4">
                      <i className="fa fa-user"></i> Thành viên
                    </p>
                    <p className="col-xs-8">
                      {members.map((l) => l.attributes.username).join("; ")}
                    </p>
                  </li>
                )}
                {group.attributes.contactEmail && (
                  <li className="author row">
                    <p className="name col-xs-4">
                      <i className="fa fa-envelope"></i> Email
                    </p>
                    <p className="col-xs-8">{group.attributes.contactEmail}</p>
                  </li>
                )}
              </ul>
            </div>
            <div className="follow">
              <a
                className="btn btn-danger"
                href={`https://mangadex.org/group/${group.id}`}
                target="_blank"
              >
                <i className="fa fa-cat mr-2" />
                <span>Link Mangadex</span>
              </a>
            </div>
            <div className="read-action mrt10">
              {group.attributes.website && (
                <a
                  className="btn btn-warning mrb5 mr-2"
                  href={group.attributes.website}
                  target="_blank"
                >
                  {" "}
                  Website
                </a>
              )}
              {group.attributes.discord && (
                <a
                  className="btn btn-warning mrb5 mr-2"
                  href={group.attributes.discord}
                  target="_blank"
                >
                  {" "}
                  Discord
                </a>
              )}
              {group.attributes.twitter && (
                <a
                  className="btn btn-warning mrb5 mr-2"
                  href={group.attributes.twitter}
                  target="_blank"
                >
                  {" "}
                  Twitter
                </a>
              )}
            </div>
          </div>
          <div className="detail-content">
            <h3 className="list-title">
              <i className="fa fa-file-text-o"></i> Giới thiệu nhóm
            </h3>
            <div className="">
              {group.attributes.description && (
                <ReactMarkdown>{group.attributes.description}</ReactMarkdown>
              )}
            </div>
          </div>
        </article>
        <NewUpdates title="Các chương mới đăng" groupId={group.id} />
      </div>
      <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
        <TopTitles groupId={group.id} />
      </div>
    </div>
  );
}

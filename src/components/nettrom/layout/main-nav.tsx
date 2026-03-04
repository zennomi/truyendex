import Link from "next/link";
import { chunk } from "lodash";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { FaHome } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";

const navLinkClass =
  "group inline-flex h-10 w-full sm:w-max items-center justify-start sm:justify-center rounded-md bg-transparent px-4 py-2 text-sm font-semibold transition-colors hover:bg-neutral-800 hover:text-[#ff9601] focus:bg-neutral-800 focus:text-[#ff9601] disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800 data-[state=open]:text-[#ff9601] text-neutral-200";

export default function MainNav() {
  return (
    <NavigationMenu className="w-full max-w-full justify-start">
      <NavigationMenuList className="w-full flex-col flex-wrap items-start justify-start gap-1 space-x-0 sm:flex-row sm:items-center [&>li]:w-full sm:[&>li]:w-auto">
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.index} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              <FaHome className="mr-2" />
              Trang chủ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={Constants.Routes.nettrom.following}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Theo dõi
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[followedCount]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Hot
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[rating]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Yêu thích
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[createdAt]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Mới cập nhật
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.history} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              Lịch sử
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navLinkClass}>
            Thể loại
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] grid-cols-2 gap-2 border-neutral-800 bg-neutral-900 p-4 md:w-[600px] md:grid-cols-4 lg:w-[800px]">
              {chunk(Constants.Nettrom.tags, 13).map((col, i) => (
                <ul key={i} className="flex flex-col space-y-1">
                  {col.map((tag) => (
                    <li key={tag.id}>
                      <Link
                        title={Utils.Mangadex.transLocalizedStr(
                          tag.attributes.description,
                        )}
                        href={`${Constants.Routes.nettrom.search}?includedTags=${tag.id}#results`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-2 leading-none text-neutral-300 no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-[#ff9601] focus:bg-neutral-800 focus:text-[#ff9601]">
                          <div className="text-sm font-medium leading-none">
                            {Utils.Mangadex.transLocalizedStr(
                              tag.attributes.name,
                            )}
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.search} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              Tìm truyện
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Con gái
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?publicationDemographic=seinen&publicationDemographic=shounen#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Con trai
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a
            href={Constants.Routes.hako}
            target="_blank"
            rel="noreferrer"
            className={navLinkClass}
          >
            Light Novel
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

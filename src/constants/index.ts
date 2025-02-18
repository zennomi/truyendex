import { MangaDexConstants } from "./mangadex";
import { NettromConstants } from "./nettrom";
import DOMAINS from "./DOMAINS.json";
import { SettingsConstants } from "./settings";

export class Constants {
  static readonly CORS_URL = process.env.NEXT_PUBLIC_CORS_URL!;
  static readonly CORS_V2_URL = process.env.NEXT_PUBLIC_CORS_V2_URL || "";
  static readonly APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
  static readonly BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  static readonly APP_IMAGE_URL = process.env.NEXT_PUBLIC_APP_IMAGE_URL!;
  static readonly APP_NAME = "Truyendex";
  static readonly APP_VERSION = "1.0.0";
  static readonly GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;
  static readonly TURNSTILE_SITE_KEY =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;
  static readonly Mangadex = new MangaDexConstants();
  static readonly Nettrom = new NettromConstants();
  static readonly Routes = {
    nettrom: {
      index: "/nettrom",
      manga: (id: string) => `/nettrom/truyen-tranh/${id}`,
      chapter: (id: string) => `/nettrom/chuong/${id}`,
      search: `/nettrom/tim-truyen-nang-cao`,
      history: "/nettrom/lich-su",
      scanlationGroup: (id: string) => `/nettrom/nhom-dich/${id}`,
      following: "/nettrom/theo-doi",
      sync: "/nettrom/theo-doi?tab=sync",
    },
    scanlationGroup: (id: string) => `/nhom-dich/${id}`,
    report: `https://www.messenger.com/t/443260942921638`,
    github: "https://github.com/zennomi/truyendex",
    hako: "https://docln.sbs",
    login: "/dang-nhap",
    loginWithRedirect: (redirectUrl: string) =>
      `/dang-nhap?redirectUrl=${encodeURIComponent(redirectUrl)}`,
    signup: "/dang-ky",
    verifyEmail: "/xac-thuc",
    forgotPassword: "/quen-mat-khau",
    resetPassword: "/password-reset",
    dashboard: {
      index: "/trang-ca-nhan",
      settings: "/trang-ca-nhan/cai-dat",
    },
  };
  static readonly AVALABLE_DOMAINS = DOMAINS;
  static readonly DOMAIN_LIST_URL =
    "https://raw.githubusercontent.com/zennomi/truyendex/refs/heads/develop/src/constants/DOMAINS.json";
  static readonly Settings = new SettingsConstants();
}

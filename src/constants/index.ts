import { MangaDexConstants } from "./mangadex";
import { NettromConstants } from "./nettrom";

export class Constants {
  static readonly CORS_URL = process.env.NEXT_PUBLIC_CORS_URL!;
  static readonly APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
  static readonly BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  static readonly APP_NAME = "Truyendex";
  static readonly APP_VERSION = "1.0.0";
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
    },
    scanlationGroup: (id: string) => `/nhom-dich/${id}`,
    report: `https://www.messenger.com/t/443260942921638`,
    login: "/dang-nhap",
    loginWithRedirect: (redirectUrl: string) =>
      `/dang-nhap?redirectUrl=${encodeURIComponent(redirectUrl)}`,
    signup: "/dang-ky",
    verifyEmail: "/xac-thuc",
    forgotPassword: "/quen-mat-khau",
    resetPassword: "/doi-mat-khau",
  };
  static readonly GTAG_IDS = {
    "truyendex.xyz": "G-9WVQKTM96Q",
    "truyendex.org": "G-E76BLGDX4L",
    "truyendex.com": "G-KMDRL3VL78",
    localhost: "G-HIHIHIHIHI",
  };
  static readonly AVALABLE_DOMAINS =
    process.env.NEXT_PUBLIC_AVALABLE_DOMAINS!.split(",");
}

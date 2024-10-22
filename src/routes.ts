const routes = {
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
};

export default routes;

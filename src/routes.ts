const routes = {
    nettrom: {
        index: "/nettrom",
        manga: (id: string) => `/nettrom/truyen-tranh/${id}`,
        chapter: (id: string) => `/nettrom/chuong/${id}`,
        search: `/nettrom/tim-truyen-nang-cao`
    }
}

export default routes
type Chapter = {
    id: string;
    attributes: {
        chapter: string;
        createdAt: string;
        externalUrl?: string;
        pages: number;
        publishAt: string;
        readableAt: string;
        title?: string;
        translatedLanguage: string;
        updatedAt: string;
        version: number;
        volume: string;
    }
}
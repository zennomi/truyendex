type Metadata = {
  images: any | null;
};

export type TanamoeTitle = {
  id: string;
  name: string;
  slug: string;
  slugGroup: string;
  updated: string;
  description: string;
  expand: {
    defaultRelease?: {
      expand: {
        front?: {
          resizedImage?: {
            "1280w": string;
            "160w": string;
            "320w": string;
            "480w": string;
            "640w": string;
          };
        };
        publisher: {
          name: string;
          id: string;
          logo: string;
        };
      };
      status: string;
    };
    demographic?: {
      name: string;
      id: string;
    };
    genres?: {
      name: string;
      id: string;
    }[];
  };
};

type ExpandTitle = {
  collectionId: string;
  collectionName: string;
  cover: string;
  created: string;
  defaultRelease: string;
  demographic: string;
  description: string;
  format: string;
  genres: any[];
  id: string;
  metadata: Record<string, any>;
  name: string;
  slug: string;
  slugGroup: string;
  updated: string;
};

type ExpandRelease = {
  banner: string;
  collectionId: string;
  collectionName: string;
  created: string;
  digital: boolean;
  disambiguation: string;
  expand: {
    title: ExpandTitle;
  };
  front: string;
  id: string;
  logo: string;
  name: string;
  old_id: number;
  partner: string;
  publisher: string;
  status: string;
  title: string;
  type: string;
  updated: string;
};

type ExpandDefaultBook = {
  collectionId: string;
  collectionName: string;
  covers: any[];
  created: string;
  edition: string;
  id: string;
  metadata: any | null;
  note: string;
  old_id: string;
  price: number;
  publication: string;
  publishDate: string;
  updated: string;
};

type ExpandPublication = {
  collectionId: string;
  collectionName: string;
  covers: any[];
  created: string;
  defaultBook: string;
  description: string;
  expand: {
    defaultBook: ExpandDefaultBook;
    release: ExpandRelease;
  };
  id: string;
  metadata: any | null;
  name: string;
  old_id: string;
  release: string;
  subtitle: string;
  updated: string;
  volume: number;
};

type AssetsViaBook = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  resizedImage: {
    "1280w": string;
    "160w": string;
    "320w": string;
    "480w": string;
    "640w": string;
  };
};

export type TanamoeUpcomingBook = {
  collectionId: string;
  collectionName: string;
  covers: any[];
  created: string;
  edition: string;
  expand: {
    publication: ExpandPublication;
    assets_via_book: AssetsViaBook[];
  };
  id: string;
  metadata: Metadata;
  note: string;
  old_id: string;
  price: number;
  publication: string;
  publishDate: string;
  updated: string;
};

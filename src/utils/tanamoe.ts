export class TanamoeUtils {
  getCoverImage = (path: string | undefined) => {
    return path
      ? `https://image.tana.moe/${path}`
      : "/images/truyendex-loading.jpg";
  };
}

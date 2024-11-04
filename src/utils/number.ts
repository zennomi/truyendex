export class NumberUtils {
  formatViews(views: number) {
    if (views < 1e3) return views;
    if (views < 1e6) return `${(views / 1e3).toFixed(1)}k`;
    return `${(views / 1e6).toFixed(1)}m`;
  }
}

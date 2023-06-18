/**
 * @class
 * @description - class for photu services
 */
class Photu {
  /**
   * @description - transform the img url to the optimized img url
   * @param {string} url - url of the image
   * @param {number} resolution - resolution of the image of after the optimization
   * https://mott-img.b-cdn.net/q80-efalse-ptrue-fauto-w
   * https://mott-img.b-cdn.net/q80-efalse-ptrue-fauto-w400/
   */
  static transform(url, resolution = 400) {
    const prefix = this.getUrlPrefix(resolution);
    if(url) {
      url = this.removeUrlPrefixes(url, resolution);
      return prefix + url;
    } else {
      return url;
    }
  }
  /**
   * @description - construct prefix
   * @param {number} resolution - resolution of the image of after the optimization
   * @return {string}
   */
  static getUrlPrefix(resolution = 400) {
    let prefix = process.env.IMG_CDN_URL || 'https://mott-img.b-cdn.net/q80-efalse-ptrue-fauto-w';
    prefix += resolution;
    prefix += '/';
    return prefix;
  }
  /**
   * @description - removes the already existing prefixes from the url
   * @param {string} url - url of the image
   * @param {number} resolution - resolution of the image of after the optimization
   * @return {string} url
   */
  static removeUrlPrefixes(url, resolution = 400) {
    const prefix = this.getUrlPrefix(resolution);
    if(this.isUrlPrefixed(url, resolution)) {
      url = url.split(prefix).join('');
      return url;
    } else {
      return url;
    }
  }
  /**
   * @description - transform the img url to the optimized img url
   * @param {string} url - url of the image
   * @param {number} resolution - resolution of the image of after the optimization
   * @return {boolean}
   */
  static isUrlPrefixed(url, resolution = 400) {
    const prefix = this.getUrlPrefix(resolution);
    return url.includes(prefix);
  }

}

exports.Photu = Photu;

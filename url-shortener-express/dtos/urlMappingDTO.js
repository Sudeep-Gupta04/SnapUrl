class UrlMappingDTO {
  constructor(data) {
    this.id = data.id;
    this.originalurl = data.originalUrl;
    this.shorturl = data.shortenUrl;
    this.clickCount = data.clickCount;
    this.createdDate = data.createdDate;
    this.username = data.user?.username;
  }

  static fromEntity(urlMapping) {
    return new UrlMappingDTO({
      id: urlMapping.id,
      originalUrl: urlMapping.originalUrl,
      shortenUrl: urlMapping.shortenUrl,
      clickCount: urlMapping.clickCount,
      createdDate: urlMapping.createdDate,
      user: urlMapping.user
    });
  }

  static fromEntities(urlMappings) {
    return urlMappings.map(urlMapping => UrlMappingDTO.fromEntity(urlMapping));
  }
}

module.exports = UrlMappingDTO; 
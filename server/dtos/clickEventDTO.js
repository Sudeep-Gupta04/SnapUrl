class ClickEventDTO {
  constructor(data) {
    this.clickDate = data.clickDate;
    this.count = data.count;
  }

  static fromGroupedData(groupedData) {
    return Object.entries(groupedData).map(([date, count]) => {
      return new ClickEventDTO({
        clickDate: new Date(date),
        count: count
      });
    });
  }
}

module.exports = ClickEventDTO; 
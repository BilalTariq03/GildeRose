class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemUpdater {
  update(item) {
    this.updateQuality(item);

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      this.updateQualityAfterSellIn(item);
    }
  }

  updateQuality(item) {
    item.quality = Math.max(0, item.quality - 1);
  }

  updateQualityAfterSellIn(item) {
    item.quality = Math.max(0, item.quality - 1);
  }
}

class AgedBrieUpdater extends ItemUpdater {
  updateQuality(item) {
    item.quality = Math.min(50, item.quality + 1);
  }

  updateQualityAfterSellIn(item) {
    item.quality = Math.min(50, item.quality + 1);
  }
}

class SulfurasUpdater extends ItemUpdater {
  update(item) {
    // Sulfuras never changes
  }
}

class BackstagePassUpdater extends ItemUpdater {
  updateQuality(item) {
    let increase = 1;

    if (item.sellIn <= 5) {
      increase = 3;
    } else if (item.sellIn <= 10) {
      increase = 2;
    }

    item.quality = Math.min(50, item.quality + increase);
  }

  updateQualityAfterSellIn(item) {
    item.quality = 0;
  }
}

class ConjuredUpdater extends ItemUpdater {
  updateQuality(item) { item.quality = Math.max(0, item.quality - 2); }
  updateQualityAfterSellIn(item) { item.quality = Math.max(0, item.quality - 2); }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      const updater = this.getUpdater(item);
      updater.update(item);
    }

    return this.items;
  }

  getUpdater(item) {
    if (item.name === "Aged Brie") {
      return new AgedBrieUpdater();
    }

    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return new SulfurasUpdater();
    }

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      return new BackstagePassUpdater();
    }

    if (item.name === "Conjured Mana Cake") {
      return new ConjuredUpdater();
    }

    return new ItemUpdater();
  }
}

module.exports = {
  Item,
  Shop
}

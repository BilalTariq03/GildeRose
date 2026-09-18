const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose - Normal Items", function() {
  it("normal item decrease sellin and quality after one day", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(6);
  });

  it("Quality never goes below 0", function(){
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(0);
  })

  it("Expired item's quality never goes below 0", function(){
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(0);
  })

  it("Expired item's quality decrease by 2", function(){
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(5);
  })

  it("Already expired item's quality decrease by 2", function(){
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", -3, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-4);
    expect(items[0].quality).toBe(5);
  })
});

describe("Gilded Rose - Aged Brie", function() {
  it("Quality increase by one per day", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 4, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(3);
    expect(items[0].quality).toBe(9);
  });

  it("Quality increase by one per day", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(50);
  });

  it("Expired items quality increase by 2", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(12);
  });

  it("Items quality never exceeds 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  it("Expired items quality never exceeds 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", -3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-4);
    expect(items[0].quality).toBe(50);
  });

});


describe("Gilded Rose - Sulfuras", function() {
  it("Nothing changes for sulfurus", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 4, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(80);
  });

  it("Nothing changes for sulfurus", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

  it("Nothing changes for sulfurus", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-5);
    expect(items[0].quality).toBe(80);
  });
});


describe("Gilded Rose - Backstage passes", function() {
  it("Quality increases by 1 with days > 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(14);
    expect(items[0].quality).toBe(21);
  });

  it("Quality increases by 1 with days > 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(21);
  });

  it("Quality increases by 2 with days <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(27);
  });

  it("Quality increases by 2 with days <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(27);
  });

  it("Quality increases by 3 with days <= 5", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23);
  });

  it("Quality drops to 0 after concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("Already expired backstage pass has 0 quality", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -5, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-6);
    expect(items[0].quality).toBe(0);

  });

  it("Quality never exceeds 50 when <=5 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(50);
  });

  it("Quality never exceeds 50 when <=10 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it("Quality never exceeds 50 when >10days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(11);
    expect(items[0].quality).toBe(50);
  });  
});


describe("Gilded Rose - Conjured Items", function() {
  it("Quality decreases by 2 per day", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(8);
  });

  it("Expired item's quality decreases by 4", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);
  });

  it("Already expired item's quality decreases by 4", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", -3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-4);
    expect(items[0].quality).toBe(6);
  });

  it("Quality never goes below 0", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(0);
  });

  it("Expired quality never goes below 0", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
});

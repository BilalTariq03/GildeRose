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

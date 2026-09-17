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

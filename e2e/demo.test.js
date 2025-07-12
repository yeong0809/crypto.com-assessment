import { expect, element, by, waitFor, device } from 'detox';
import { expect as jestExpect } from '@jest/globals';

describe(`Demo Screen - Listing`, () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it(`should have 5 Buttons`, async () => {
    await expect(element(by.id(`clear-button`))).toBeVisible();
    await expect(element(by.id(`insert-button`))).toBeVisible();
    await expect(element(by.id(`populate-cryptos-button`))).toBeVisible();
    await expect(element(by.id(`populate-fiats-button`))).toBeVisible();
    await expect(element(by.id(`populate-all-button`))).toBeVisible();
  });

  it(`should show 14 cryptos`, async () => {
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`populate-cryptos-button`)).tap();
    await expect(element(by.id(`currency-list-count`))).toHaveText(
      `currency list count: 14`
    );
    await element(by.id(`clear-button`)).tap();
  });

  it(`should 7 fiats`, async () => {
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`populate-fiats-button`)).tap();
    await expect(element(by.id(`currency-list-count`))).toHaveText(
      `currency list count: 7`
    );
    await element(by.id(`clear-button`)).tap();
  });

  it(`should show 21 cryptos or fiats`, async () => {
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`populate-all-button`)).tap();
    await expect(element(by.id(`currency-list-count`))).toHaveText(
      `currency list count: 21`
    );
    await element(by.id(`clear-button`)).tap();
  });

  it(`should show 0 items`, async () => {
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`clear-button`)).tap();
    await element(by.id(`populate-all-button`)).tap();

    await expect(element(by.id(`currency-list-count`))).toHaveText(
      `currency list count: 0`
    );
  });

  it(`should show empty list indicator`, async () => {
    await element(by.id(`clear-button`)).tap();
    await element(by.id(`populate-all-button`)).tap();

    await expect(element(by.id(`empty-list-indicator`))).toBeVisible();
  });

  it(`ensure 21 items is displayed and scrollable in FlatList`, async () => {
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`populate-all-button`)).tap();

    let index = 0;
    const seen = new Set();

    for (;;) {
      try {
        const item = element(by.id(`currency-list-item-${index}`));
        await waitFor(item)
          .toBeVisible()
          .whileElement(by.id(`currency-list`))
          .scroll(200, `down`);

        // Ensure we don’t double-count
        if (!seen.has(index)) {
          seen.add(index);
          index++;
        } else {
          break;
        }
      } catch (e) {
        break;
      }
    }

    console.log(`Total FlatList items counted:`, seen.size);
    jestExpect(seen.size).toBe(21);

    await element(by.id(`clear-button`)).tap();
  });
});

describe(`Demo Screen - Search Filtering Rules`, () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id(`insert-button`)).tap();
    await element(by.id(`populate-all-button`)).tap();
  });

  afterAll(async () => {
    await element(by.id(`clear-button`)).tap();
  });

  beforeEach(async () => {
    await element(by.id(`search-textinput`)).clearText();
  });

  it(`does not matches when coin name not existing`, async () => {
    await element(by.id(`search-textinput`)).typeText(`thereum`);

    await expect(element(by.id(`currency-list-item-0`))).not.toBeVisible();
  });

  it(`matches coins like Ethereum and Ethereum Classic when name starts with search term`, async () => {
    await element(by.id(`search-textinput`)).clearText();
    await element(by.id(`search-textinput`)).typeText(`Ethereum`);

    await waitFor(element(by.id(`search-textinput`))).toHaveText(`Ethereum`);

    await waitFor(element(by.id(`currency-list-item-0`)))
      .toBeVisible()
      .whileElement(by.id(`currency-list`))
      .scroll(200, `down`);

    await expect(element(by.id(`currency-list-item-Ethereum`))).toBeVisible();
    await expect(
      element(by.id(`currency-list-item-Ethereum Classic`))
    ).toBeVisible();
  });

  it(`matches name that contains space-prefixed term`, async () => {
    await element(by.id(`search-textinput`)).clearText();
    await element(by.id(`search-textinput`)).typeText(`Classic`);

    await waitFor(element(by.id(`currency-list-item-0`)))
      .toBeVisible()
      .whileElement(by.id(`currency-list`))
      .scroll(200, `down`);

    await expect(
      element(by.id(`currency-list-item-Ethereum Classic`))
    ).toBeVisible();
    await expect(
      element(by.id(`currency-list-item-Tronclassic`))
    ).not.toBeVisible();
  });

  it(`matches when coin symbol starts with the search term`, async () => {
    await element(by.id(`search-textinput`)).clearText();
    await element(by.id(`search-textinput`)).typeText(`ET`);

    await waitFor(element(by.id(`currency-list-item-0`)))
      .toBeVisible()
      .whileElement(by.id(`currency-list`))
      .scroll(200, `down`);

    await expect(element(by.id(`currency-list-item-ETH`))).toBeVisible();
    await expect(element(by.id(`currency-list-item-ETC`))).toBeVisible();
  });

  it(`does not match when neither name nor symbol satisfy rules`, async () => {
    await element(by.id(`search-textinput`)).typeText(`xyz`);

    await expect(element(by.id(`currency-list-item-0`))).not.toBeVisible();
  });
});

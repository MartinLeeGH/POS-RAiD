import { moneyFormatter } from "../../app/_utils/formatter";

const moneyFormatterRegex = /^\d{2}\.\d{2}$/; //eg. 19.02
test('Valid regex test', () => {
    const formattedMoneyString = '19.02'
  expect(moneyFormatterRegex.test(formattedMoneyString)).toBe(true);
});

test('Invalid regex test', () => {
    const formattedMoneyString = '19.02521';
  expect(moneyFormatterRegex.test(formattedMoneyString)).toBe(false);
});

test('Valid money formatter regex test', () => {
    const formattedMoneyString = moneyFormatter(19.02123821);
  expect(formattedMoneyString).toBe("19.02");
});
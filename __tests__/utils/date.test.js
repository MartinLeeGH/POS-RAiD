const { mysqlDateTimeNow } = require('../../app/_utils/date');

const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; //eg. 2024-02-04 05:29:56

test('Valid date format regex test', () => {
    const formattedDateString = mysqlDateTimeNow();
  expect(dateFormatRegex.test(formattedDateString)).toBe(true);
});

test('Invalid date format regex test', () => {
    const formattedDateString = '2024-02-04 05:23';
  expect(dateFormatRegex.test(formattedDateString)).toBe(false);
});
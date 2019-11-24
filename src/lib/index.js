import faker from 'faker';

const itemsCount = 10000;
const hotelsList = Array(itemsCount)
  .fill({})
  .map((item, index) => ({
    id: index + 1,
    name: `${faker.name.lastName()} Hotel`,
    region: faker.address.country(),
    price: faker.finance.amount(),
    image: `https://photo.hotellook.com/image_v2/limit/h${index + 1}_1/345/140.auto`,
  }));

export const handleFilter = filter => item => (filter === 'none' ? true : item.region === filter);

const getHotels = (startIndex, length, filter = 'none') => {
  const filterFn = handleFilter(filter);
  return hotelsList.filter(filterFn).slice(startIndex, startIndex + length);
};

export const fetchHotelsAsync = params => new Promise((resolve, reject) => {
  const { startIndex, length, filter } = params;
  setTimeout(() => {
    resolve(getHotels(startIndex, length, filter));
  }, length * 100);
  setTimeout(() => {
    reject(new Error('Something went wrong. Try to reduce number of the loading items'));
  }, 3000);
});

export const pluralize = (count, item) => (count === 1 ? `1 ${item}` : `${count} ${item}s`);

export const getUniqArray = coll => Array.from(new Set(coll));

export const getScrollHeight = () => Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight,
);

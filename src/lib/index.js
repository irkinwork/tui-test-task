import faker from 'faker';
import { uniqueId } from 'lodash';
import PropsTypes from 'prop-types';

const itemsCount = 10000;
const hotelsList = Array(itemsCount)
  .fill({})
  .map(() => ({
    id: uniqueId(),
    name: `${faker.name.lastName()} Hotel`,
    region: faker.address.country(),
    price: faker.finance.amount(),
    image: `https://photo.hotellook.com/image_v2/limit/h${uniqueId()}_1/345/170.auto`,
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

export const pTHotels = PropsTypes.arrayOf(PropsTypes.shape({
  id: PropsTypes.number,
  name: PropsTypes.string,
  region: PropsTypes.string,
  price: PropsTypes.number,
  image: PropsTypes.string,
}));

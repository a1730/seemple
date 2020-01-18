import _afterInit from './_afterinit';
import addDataKeys from './adddatakeys';
import removeDataKeys from './removedatakeys';
import isDataKey from './isdatakey';
import setData from './setdata';
import keyOf from './keyof';
import keys from './keys';
import values from './values';
import entries from './entries';
import toJSON from './tojson';
import each from './each';
import iterator from './iterator';

const symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';

export default {
  _afterInit,
  setData,
  addDataKeys,
  removeDataKeys,
  isDataKey,
  keys,
  values,
  entries,
  keyOf,
  toJSON,
  each,
  isSeempleObject: true,
  jset: setData, // alias
  [symbolIterator]: iterator
};

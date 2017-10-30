import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import toNumber from 'lodash/toNumber';
import RULES, {
  IS_EQUATION,
} from './rules';

export const errorResponse = {
  error: true,
  message: 'Invalid input data',
};

export const formatter = (input) => {
  const convertedNumber = toNumber(input);
  if (isNumber(convertedNumber) && !isNaN(convertedNumber)) {
    return convertedNumber;
  }
  const isEquation = isString(input) && IS_EQUATION(input);
  if (isEquation) {
    return input;
  }
  return false;
};

const analyzer = (input) => {
  const normalized = formatter(input);

  if (normalized === false) {
    return errorResponse;
  }

  const data = Object
    .keys(RULES)
    .reduce((_input, key) => {
      try {
        if (RULES[key](normalized) === true) {
          return {
            ..._input,
            [`${key}`]: true,
          };
        }
      } catch (e) {
        // console.log('invalid test');
      }
      return _input;
    }, {});

  if (isNumber(normalized)) {
    const factors = (number) => Array
      .from(Array(number), (_, i) => i)
      .filter((i) => number % i === 0 && i > 1);

    const tbd = factors(Math.abs(normalized));

    if (tbd.length === 0) {
      if (normalized > 1) {
        data.IS_PRIME = true;
      }
    } else {
      tbd.forEach((num) => {
        data[`HAS_FACTOR_${num}`] = true;
      });
    }
  }

  return data;
};

export default analyzer;

import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';

export const EQUATION = new RegExp(/\d+([+-/*])\d+=\d+/);
export const EQUATION_ADDITION = new RegExp(/\d+([+])\d+=\d+/);
export const EQUATION_SUBTRACTION = new RegExp(/\d+([-])\d+=\d+/);
export const EQUATION_MULTIPLICATION = new RegExp(/\d+([*])\d+=\d+/);
export const EQUATION_DIVISION = new RegExp(/\d+([/])\d+=\d+/);

export const IS_EQUATION = (sample) => EQUATION.test(sample);
export const IS_EQUATION_ADDITION = (sample) => EQUATION_ADDITION.test(sample);
export const IS_EQUATION_SUBTRACTION = (sample) => EQUATION_SUBTRACTION.test(sample);
export const IS_EQUATION_MULTIPLICATION = (sample) => EQUATION_MULTIPLICATION.test(sample);
export const IS_EQUATION_DIVISION = (sample) => EQUATION_DIVISION.test(sample);

export const EQUATION_RULES = {
  IS_EQUATION,
  IS_EQUATION_ADDITION,
  IS_EQUATION_SUBTRACTION,
  IS_EQUATION_MULTIPLICATION,
  IS_EQUATION_DIVISION,
};

export const NUMBER_CHECKS = () => {
  const obj = {};
  const num = 10;

  for (let x = 0; x <= num; x += 1) {
    obj[`NUMBER_IS_${x}`] = (number) => number === x;
  }

  return obj;
};

export const ODD = new RegExp(/^\d*[13579]$/);
export const EVEN = new RegExp(/^\d*[02468]$/);

export const IS_EVEN = (number) => number % 2 === 0;
export const IS_ODD = (number) => !IS_EVEN(number);

export const MULTIPLE_CHECKS = () => {
  const obj = {};
  const num = 10;

  for (let x = 2; x <= num; x += 1) {
    obj[`IS_FACTOR_OF_${x}`] = (number) => (number <= 0) && (number % x) === 0 && (number !== x);
  }

  return obj;
};

export const NUMBER_RULES = {
  ...NUMBER_CHECKS(),
  IS_NEGATIVE: (number) => toNumber(number) < 0,
  IS_ODD,
  IS_EVEN,
  IS_SINGLE_DIGIT: (number) => toString(Math.abs(toNumber(number))).replace('-').length === 1,
  IS_DOUBLE_DIGIT: (number) => toString(Math.abs(toNumber(number))).replace('-').length === 2,
  SAME_DIGITS: (number) => /\b(\d)\1+\b/.test(toString(number)),
};

export const PARSE_EQUATION = (equation, convert = false) => {
  const parsed = equation.split(/[+=]/);
  if (!convert) {
    return parsed;
  }
  return [parseInt(parsed[0], 10), parseInt(parsed[1], 10), parseInt(parsed[2], 10)];
};

export const DELTA_CHECKS = () => {
  const obj = {};
  const num = 5;

  for (let x = 1; x <= num; x += 1) {
    obj[`DELTA_IS_${x}`] = (equation) => {
      const parsed = PARSE_EQUATION(equation, true);
      return Math.abs(parsed[0] - parsed[1]) === x;
    };
  }

  return obj;
};

export const ADDITION_RULES = {
  ...DELTA_CHECKS(),
  BOTH_ADDENDS_ARE_EVEN: (equation) => {
    const parsed = PARSE_EQUATION(equation);
    return IS_EVEN(parsed[0]) && IS_EVEN(parsed[1]);
  },
  BOTH_ADDENDS_ARE_ODD: (equation) => {
    const parsed = PARSE_EQUATION(equation);
    return IS_ODD(parsed[0]) && IS_ODD(parsed[1]);
  },
  FIRST_ADDEND_IS_LARGER: (equation) => {
    const parsed = PARSE_EQUATION(equation, true);
    return parsed[0] > parsed[1];
  },
  ADDENDS_ARE_IDENTICAL: (equation) => {
    const parsed = PARSE_EQUATION(equation);
    return parsed[0] === parsed[1];
  },
  IDENTITY: (equation) => {
    const parsed = PARSE_EQUATION(equation, true);
    return parsed[0] === 0 || parsed[1] === 0;
  },
};

export const ALL_RULES = {
  ...ADDITION_RULES,
  ...EQUATION_RULES,
  ...NUMBER_RULES,
};

export default ALL_RULES;

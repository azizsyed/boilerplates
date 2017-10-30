import {
  ADDITION_RULES,
  EQUATION_RULES,
  NUMBER_RULES,
} from '../rules';

describe('rules', () => {
  describe('addition', () => {
    it('DELTA_IS', () => {
      const sampleSize = 5;
      for (let index = 1; index <= sampleSize; index += 1) {
        expect(ADDITION_RULES[`DELTA_IS_${index}`](`0+${index}=${index}`)).toBeTruthy();
        expect(ADDITION_RULES[`DELTA_IS_${index}`](`1+${index}=${index + 1}`)).toBeFalsy();
      }
    });
    it('BOTH_ADDENDS_ARE_EVEN', () => {
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_EVEN('4+4=8')).toBeTruthy();
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_EVEN('4+5=9')).toBeFalsy();
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_EVEN('3+5=8')).toBeFalsy();
    });
    it('BOTH_ADDENDS_ARE_ODD', () => {
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_ODD('3+5=8')).toBeTruthy();
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_ODD('4+4=8')).toBeFalsy();
      expect(ADDITION_RULES.BOTH_ADDENDS_ARE_ODD('4+5=9')).toBeFalsy();
    });
    it('FIRST_ADDEND_IS_LARGER', () => {
      expect(ADDITION_RULES.FIRST_ADDEND_IS_LARGER('3+5=8')).toBeFalsy();
      expect(ADDITION_RULES.FIRST_ADDEND_IS_LARGER('4+4=8')).toBeFalsy();
      expect(ADDITION_RULES.FIRST_ADDEND_IS_LARGER('5+4=9')).toBeTruthy();
    });
    it('ADDENDS_ARE_IDENTICAL', () => {
      expect(ADDITION_RULES.ADDENDS_ARE_IDENTICAL('3+5=8')).toBeFalsy();
      expect(ADDITION_RULES.ADDENDS_ARE_IDENTICAL('4+4=8')).toBeTruthy();
      expect(ADDITION_RULES.ADDENDS_ARE_IDENTICAL('44+44=88')).toBeTruthy();
      expect(ADDITION_RULES.ADDENDS_ARE_IDENTICAL('5+4=9')).toBeFalsy();
    });
    it('IDENTITY', () => {
      expect(ADDITION_RULES.IDENTITY('1+1=4')).toBeFalsy();
      expect(ADDITION_RULES.IDENTITY('4+0=4')).toBeTruthy();
      expect(ADDITION_RULES.IDENTITY('0+4=4')).toBeTruthy();
      expect(ADDITION_RULES.IDENTITY('3+6=9')).toBeFalsy();
    });
  });

  it('EQUATIONS', () => {
    expect(EQUATION_RULES.IS_EQUATION('2')).toBeFalsy();
    expect(EQUATION_RULES.IS_EQUATION('a')).toBeFalsy();
    expect(EQUATION_RULES.IS_EQUATION('1+3')).toBeFalsy();
    expect(EQUATION_RULES.IS_EQUATION('1+3=')).toBeFalsy();
    expect(EQUATION_RULES.IS_EQUATION('1+3=5')).toBeTruthy();

    expect(EQUATION_RULES.IS_EQUATION_ADDITION('1+3=5')).toBeTruthy();
    expect(EQUATION_RULES.IS_EQUATION_SUBTRACTION('1-3=5')).toBeTruthy();
    expect(EQUATION_RULES.IS_EQUATION_MULTIPLICATION('1*3=5')).toBeTruthy();
    expect(EQUATION_RULES.IS_EQUATION_DIVISION('1/3=9')).toBeTruthy();
  });

  describe('NUMBER_RULES', () => {
    it('ODD vs EVEN', () => {
      const sampleSize = 20;
      for (let index = 0; index <= sampleSize; index += 1) {
        expect(NUMBER_RULES.IS_EVEN(index)).toBe(index % 2 === 0);
        expect(NUMBER_RULES.IS_ODD(index)).toBe(index % 2 === 1);
      }
    });

    it.skip('fff', () => {
      // console.log(NUMBER_RULES.SAME_DIGITS(999));
      // console.log('999'.match(new RegExp(/\b(\d)\1+\b/)));
    });

    it('IS_NEGATIVE', () => {
      expect(NUMBER_RULES.IS_NEGATIVE(-1)).toBeTruthy();
      expect(NUMBER_RULES.IS_NEGATIVE('-1')).toBeTruthy();
      expect(NUMBER_RULES.IS_NEGATIVE(-99)).toBeTruthy();
      expect(NUMBER_RULES.IS_NEGATIVE('-99')).toBeTruthy();

      expect(NUMBER_RULES.IS_NEGATIVE(1)).toBeFalsy();
      expect(NUMBER_RULES.IS_NEGATIVE('1')).toBeFalsy();
      expect(NUMBER_RULES.IS_NEGATIVE(99)).toBeFalsy();
      expect(NUMBER_RULES.IS_NEGATIVE('99')).toBeFalsy();
    });

    it('NUMBER_CHECKS', () => {
      const sampleSize = 10;
      for (let index = 0; index <= sampleSize; index += 1) {
        expect(NUMBER_RULES[`NUMBER_IS_${index}`](index)).toBeTruthy();
        expect(NUMBER_RULES[`NUMBER_IS_${index}`](index + 1)).toBeFalsy();
      }
    });
  });
});

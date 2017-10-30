import analyzer, { errorResponse } from '../analyzer';

describe.only('analyzer', () => {
  describe('validator', () => {

  });

  describe('analyzer', () => {
    it.skip('returns null for empty arguments', () => {
      expect(analyzer()).toEqual(errorResponse);
      expect(analyzer(null)).toEqual(errorResponse);
      expect(analyzer(undefined)).toEqual(errorResponse);
      expect(analyzer([])).toEqual(errorResponse);
    });

    it('should be consistent', () => {
      expect(analyzer('4+4=8')).toEqual(analyzer('4+4=8'));
      expect(analyzer('5+3=8')).not.toEqual(analyzer('3+5=8'));
      expect(analyzer('4')).toEqual(analyzer(4));
      expect(analyzer(99)).toEqual(analyzer(99));
    });

    it('handles single numbers', () => {
      // console.log(analyzer(99));
      // console.log(analyzer(-99));
      // console.log(analyzer(0));
      // console.log(analyzer(100));
      // console.log(analyzer(1));
      // console.log(analyzer(2));
      // console.log(analyzer(3));
      // console.log(analyzer(4));
    });
  });
});

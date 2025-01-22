import {
  generateSequentialPattern,
  generateOddEvenPattern,
  generateDistributedPattern,
} from '../patternGenerators';

describe('Pattern Generators', () => {
  describe('generateSequentialPattern', () => {
    it('should generate 6 numbers', () => {
      const result = generateSequentialPattern();
      expect(result).toHaveLength(6);
    });

    it('should contain 3 sequential numbers', () => {
      const result = generateSequentialPattern();
      let hasSequential = false;

      for (let i = 0; i < result.length - 2; i++) {
        if (result[i + 1] === result[i] + 1 && result[i + 2] === result[i] + 2) {
          hasSequential = true;
          break;
        }
      }

      expect(hasSequential).toBe(true);
    });

    it('should return sorted numbers', () => {
      const result = generateSequentialPattern();
      const sorted = [...result].sort((a, b) => a - b);
      expect(result).toEqual(sorted);
    });
  });

  describe('generateOddEvenPattern', () => {
    it('should generate 6 numbers', () => {
      const result = generateOddEvenPattern();
      expect(result).toHaveLength(6);
    });

    it('should have 3 odd and 3 even numbers', () => {
      const result = generateOddEvenPattern();
      const odds = result.filter(n => n % 2 === 1);
      const evens = result.filter(n => n % 2 === 0);

      expect(odds).toHaveLength(3);
      expect(evens).toHaveLength(3);
    });

    it('should return sorted numbers', () => {
      const result = generateOddEvenPattern();
      const sorted = [...result].sort((a, b) => a - b);
      expect(result).toEqual(sorted);
    });
  });

  describe('generateDistributedPattern', () => {
    it('should generate 6 numbers', () => {
      const result = generateDistributedPattern();
      expect(result).toHaveLength(6);
    });

    it('should have 2 numbers from each range', () => {
      const result = generateDistributedPattern();
      const range1 = result.filter(n => n >= 1 && n <= 15);
      const range2 = result.filter(n => n >= 16 && n <= 30);
      const range3 = result.filter(n => n >= 31 && n <= 45);

      expect(range1).toHaveLength(2);
      expect(range2).toHaveLength(2);
      expect(range3).toHaveLength(2);
    });

    it('should return sorted numbers', () => {
      const result = generateDistributedPattern();
      const sorted = [...result].sort((a, b) => a - b);
      expect(result).toEqual(sorted);
    });
  });
});

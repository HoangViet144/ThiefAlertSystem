import { checkTimeInRange } from './checkTimeInRange';

describe('Start time and end time in the same day 04:00 - 21:00', () => {
  const timeRange = {
    start: '04:00:00',
    end: '22:00:00',
  };

  describe('Time is in range', () => {
    describe('Time is  10:00:00', () => {
      it('returns true', () => {
        const time = '10:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(true);
      });
    });

    describe('Time is 15:00:00', () => {
      it('returns true', () => {
        const time = '15:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(true);
      });
    });
  });

  describe('Time is not in range', () => {
    describe('Time is 23:00:00', () => {
      it('returns false', () => {
        const time = '23:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(false);
      });
    });

    describe('Time is 3:50:00', () => {
      it('returns false', () => {
        const time = '3:50:00';
        expect(checkTimeInRange(timeRange, time)).toBe(false);
      });
    });
  });
});

describe('Start time and end time is not in the same day 21:00 - 06:00', () => {
  const timeRange = {
    start: '21:00:00',
    end: '06:00:00',
  };

  describe('Time is in range', () => {
    describe('Before midnight', () => {
      describe('Time 22:00:00', () => {
        it('returns true', () => {
          const time = '22:00:00';
          expect(checkTimeInRange(timeRange, time)).toBe(true);
        });
      });

      describe('Time is 23:59:59', () => {
        it('returns true', () => {
          const time = '23:59:59';
          expect(checkTimeInRange(timeRange, time)).toBe(true);
        });
      });

      describe('Time is 18:00:00', () => {
        it('returns false', () => {
          const time = '18:00:00';
          expect(checkTimeInRange(timeRange, time)).toBe(false);
        });
      });
    });

    describe('After midnight', () => {
      describe('Time 00:00:00', () => {
        it('returns true', () => {
          const time = '00:00:00';
          expect(checkTimeInRange(timeRange, time)).toBe(true);
        });
      });

      describe('Time is 5:30', () => {
        it('returns true', () => {
          const time = '05:30:00';
          expect(checkTimeInRange(timeRange, time)).toBe(true);
        });
      });
    });
  });

  describe('Time is out of range', () => {
    describe('Time is 20:00:00', () => {
      it('returns false', () => {
        const time = '20:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(false);
      });
    });

    describe('Time is 07:00:00', () => {
      it('returns false', () => {
        const time = '07:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(false);
      });
    });

    describe('Time is 12:00:00', () => {
      it('returns false', () => {
        const time = '12:00:00';
        expect(checkTimeInRange(timeRange, time)).toBe(false);
      });
    });
  });
});

describe('Always on (00:00:00 - 23:59:59)', () => {
  const timeRange = {
    start: '00:00:00',
    end: '23:59:59',
  };

  describe('Time is  10:00:00', () => {
    it('returns true', () => {
      const time = '10:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 15:00:00', () => {
    it('returns true', () => {
      const time = '15:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 23:00:00', () => {
    it('returns true', () => {
      const time = '23:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 03:50:00', () => {
    it('returns true', () => {
      const time = '03:50:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 20:00:00', () => {
    it('returns true', () => {
      const time = '20:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 07:00:00', () => {
    it('returns true', () => {
      const time = '07:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });

  describe('Time is 12:00:00', () => {
    it('returns true', () => {
      const time = '12:00:00';
      expect(checkTimeInRange(timeRange, time)).toBe(true);
    });
  });
});

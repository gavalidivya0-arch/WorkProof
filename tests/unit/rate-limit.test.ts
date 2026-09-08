import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimit } from '../../lib/rate-limit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should allow requests within limit', () => {
    const result1 = rateLimit('test-user-1', 2, 1000);
    expect(result1.success).toBe(true);

    const result2 = rateLimit('test-user-1', 2, 1000);
    expect(result2.success).toBe(true);
  });

  it('should block requests exceeding limit', () => {
    rateLimit('test-user-2', 2, 1000); // 1st
    rateLimit('test-user-2', 2, 1000); // 2nd
    
    const result3 = rateLimit('test-user-2', 2, 1000); // 3rd, should fail
    expect(result3.success).toBe(false);
    expect(result3.error).toBe("Too many requests. Please try again later.");
  });

  it('should reset after window has passed', () => {
    rateLimit('test-user-3', 1, 1000); // 1st, maxed out
    
    const result2 = rateLimit('test-user-3', 1, 1000); // 2nd, should fail
    expect(result2.success).toBe(false);

    // Fast-forward time by 1.1 seconds
    vi.advanceTimersByTime(1100);

    const result3 = rateLimit('test-user-3', 1, 1000); // 3rd, should succeed again
    expect(result3.success).toBe(true);
  });
});

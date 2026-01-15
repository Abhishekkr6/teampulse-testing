/**
 * Performance Monitoring
 * Track and measure application performance
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private markStartTimes: Map<string, number> = new Map();

  mark(label: string): void {
    performance.mark(label);
  }

  measure(label: string, startMark: string, endMark: string): void {
    try {
      performance.measure(label, startMark, endMark);
      const measure = performance.getEntriesByName(label)[0] as PerformanceMeasure;

      this.metrics.set(label, {
        name: label,
        duration: measure.duration,
        startTime: measure.startTime,
        endTime: measure.startTime + measure.duration,
      });
    } catch (error) {
      console.error(`Failed to measure ${label}:`, error);
    }
  }

  startTimer(label: string): void {
    this.markStartTimes.set(label, performance.now());
  }

  endTimer(label: string): number {
    const startTime = this.markStartTimes.get(label);

    if (!startTime) {
      console.warn(`No start time found for ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.markStartTimes.delete(label);

    this.metrics.set(label, {
      name: label,
      duration,
      startTime,
      endTime: performance.now(),
    });

    return duration;
  }

  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  getMetric(label: string): PerformanceMetric | undefined {
    return this.metrics.get(label);
  }

  clearMetrics(): void {
    this.metrics.clear();
  }

  logMetrics(): void {
    console.table(this.getMetrics());
  }
}

export const performanceMonitor = new PerformanceMonitor();

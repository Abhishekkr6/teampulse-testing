/**
 * Logger Utility
 * Provides consistent logging across the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private addLog(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
      data,
    };

    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.output(entry);
  }

  private output(entry: LogEntry): void {
    const formatted = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;

    switch (entry.level) {
      case 'debug':
        console.debug(formatted, entry.data);
        break;
      case 'info':
        console.info(formatted, entry.data);
        break;
      case 'warn':
        console.warn(formatted, entry.data);
        break;
      case 'error':
        console.error(formatted, entry.data);
        break;
    }
  }

  debug(message: string, data?: unknown): void {
    this.addLog('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.addLog('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.addLog('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.addLog('error', message, data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();

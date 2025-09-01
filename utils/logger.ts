export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function base(level: LogLevel, msg: string, extra?: Record<string, any>) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    msg,
    ...extra
  };
  // eslint-disable-next-line no-console
  console[level === 'debug' ? 'log' : level === 'info' ? 'info' : level === 'warn' ? 'warn' : 'error'](JSON.stringify(entry));
}

export const log = {
  debug: (msg: string, extra?: Record<string, any>) => base('debug', msg, extra),
  info: (msg: string, extra?: Record<string, any>) => base('info', msg, extra),
  warn: (msg: string, extra?: Record<string, any>) => base('warn', msg, extra),
  error: (msg: string, extra?: Record<string, any>) => base('error', msg, extra),
};
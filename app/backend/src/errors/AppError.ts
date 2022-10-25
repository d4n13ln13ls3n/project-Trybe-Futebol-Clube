export enum AppErrorTypes {
  HTTP = 'HTTP_ERROR',
  DEFAULT = 'DEFAULT',
}

export interface AppError extends Error {
  readonly type?: AppErrorTypes;
}

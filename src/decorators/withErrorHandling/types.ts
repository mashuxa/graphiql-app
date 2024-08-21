export type AsyncOperation<T, Args extends unknown[] = []> = (
  ...args: Args
) => Promise<T>;

export type WithErrorHandlingType = <T, Args extends unknown[]>(
  fn: AsyncOperation<T, Args>,
) => (...args: Args) => Promise<T | void>;

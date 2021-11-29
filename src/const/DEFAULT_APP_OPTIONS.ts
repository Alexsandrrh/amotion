import { Context } from '../Context';

/** Настройки приложения */
export interface IAppOptions {
  /** Обработчик ненайденной страницы */
  onNotFound?: (ctx: Context) => void;
  /** Обработчик ошибок */
  onError?: (err: Error, ctx: Context) => void;
}

/** Стандартные настройки приложения */
export const DEFAULT_APP_OPTIONS: Required<IAppOptions> = {
  onNotFound: () => 'Not found!',
  onError: () => null,
} as const;

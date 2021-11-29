import type { IncomingMessage, ServerResponse } from 'http';

import { App } from './App';
import type { IAppOptions } from './const';

/** Контекст обработчика входящих запросов на сервер */
export class Context {
  /** Показатель найденных обработчиков (не middlewares) */
  public hasHandlers: boolean = false;

  constructor(
    public request: IncomingMessage,
    public response: ServerResponse,
    public app: App,
    private options: IAppOptions,
  ) {}

  /** Метод вызова следующего обработчика входящего запроса */
  done(err?: Error) {
    /** Обрабатываем входящую ошибку */
    if (err) this.options.onError(err, this);
  }
}

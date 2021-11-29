import { createServer } from 'http';
import type { Server, IncomingMessage, ServerResponse } from 'http';

import { DEFAULT_APP_OPTIONS } from './const';
import type { IAppOptions } from './const';
import { Context } from './Context';

/** Приложение */
export class App {
  /** Http сервер приложения */
  private server: Server = createServer();
  /** Настройки приложения */
  private readonly options: IAppOptions;

  constructor(options: IAppOptions = {}) {
    /** Комбинируем настройки приложения */
    this.options = { ...DEFAULT_APP_OPTIONS, ...options };
  }

  /** Метод для использования middlewares */
  public use() {}

  /** Обработчик входящих запросов на сервер */
  public requestListener(request: IncomingMessage, response: ServerResponse) {
    /** Создание контекста входящего запроса */
    const ctx = new Context(request, response, this, this.options);

    /** Проверяем на наличие обработчиков */
    if (ctx.hasHandlers) {
      ctx.done();
    } else {
      this.options.onNotFound(ctx);
    }
  }

  /** Метод для запуска приложения с помощью http сервера */
  public run = (port: number = 3000): Promise<this> =>
    new Promise((resolve, reject) => {
      /** Добавляем обработчик входящих запросов */
      this.server.addListener('request', this.requestListener);

      /** Добавляем обработчик ошибок http сервера */
      this.server.addListener('error', reject);

      /** Запускаем http сервер */
      this.server.listen(port, () => {
        resolve(this);
      });
    });

  /** Метод для остановки приложения запущенного на http сервере */
  public destroy = (): Promise<this> =>
    new Promise((resolve, reject) =>
      this.server.close((error) => {
        if (error) reject(error);
        resolve(this);
      }),
    );
}

import { createServer } from 'http';
import type { Server } from 'http';

/** Настройки приложения */
export interface IAppOptions {
  /** Обработчик ненайденной страницы */
  onNotFound?: () => void;
  /** Обработчик ошибок */
  onError?: () => void;
}

/** Приложение */
export class App {
  private server: Server = createServer();

  constructor(private options: IAppOptions) {}

  /** Метод для использования middlewares */
  public use() {}

  /** Обработчик входящих запросов на сервер */
  public async requestListener(): Promise<void> {}

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

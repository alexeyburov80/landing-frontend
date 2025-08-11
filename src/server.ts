import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const browserDistFolder = join(process.cwd(), 'dist/landing/browser');

if (!existsSync(browserDistFolder)) {
  throw new Error(`Browser dist folder not found: ${browserDistFolder}`);
}

const app = express();
const angularApp = new AngularNodeAppEngine();

// Базовые middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false
}));

// Обработчик Angular SSR
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Handling: ${req.url}`);

  angularApp.handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
        return; // Явный возврат
      }
      next();
      return; // Явный возврат
    })
    .catch((err: Error) => {
      console.error('SSR Error:', err);
      next(err);
      return; // Явный возврат
    });
});

// Обработчик ошибок
const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
  return; // Явный возврат
};
app.use(errorHandler);

// Старт сервера
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

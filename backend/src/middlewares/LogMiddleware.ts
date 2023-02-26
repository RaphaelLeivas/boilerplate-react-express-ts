import { Response, Request, NextFunction } from 'express';

const logPayload = (req: Request, res: Response, next: NextFunction) => {
  // nao loga quando for esses endpoints
  const ROUTES_TO_SKIP_LOGS = [
    '/',
    '/api-docs',
  ];

  if (ROUTES_TO_SKIP_LOGS.find((route) => route === req.path)) {
    return next();
  }

  // usado para fins de debug e ambiente de testes
  if (process.env.SHOULD_LOG_PAYLOAD === 'true') {
    const routePath = req.baseUrl + req.path;
    const { user, params, query, body, headers } = req;

    const payloadData = JSON.stringify({
      routePath,
      timestamp: Date.now(),
      date: new Date().toString(),
      requestData: { user, params, query, body, headers },
    }, null, 2);

    console.log('>>>> START PAYLOAD LOG <<<<');
    console.log(payloadData);
    console.log('>>>> END PAYLOAD LOG <<<<');
    console.log('\n');
  }

  next();
}

export default {
  logPayload,
};

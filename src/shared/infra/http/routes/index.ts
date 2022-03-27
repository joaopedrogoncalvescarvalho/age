import { Router, Request, Response } from 'express';

const router = Router();

router.use('/', (request: Request, response: Response): Response => response.json({
  '/': 'Route documentation',
  '/user': [
    {
      '/': {
        type: 'GET',
      },
    },
    {
      '/': {
        type: 'POST',
      },
    },
    {
      '/': {
        type: 'PUT',
      },
    },
    {
      '/session': [
        {
          '/': {
            type: 'POST',
          },
        },
      ],
    },
  ],
}));

export default router;

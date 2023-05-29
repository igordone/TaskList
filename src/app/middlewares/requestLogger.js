import Request from '../models/request';

export default async (req, res, next) => {
  const request = await Request.create({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
  });

  return next();
};

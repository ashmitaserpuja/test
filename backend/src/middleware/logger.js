// Extra logger middleware stub for candidate to enhance
// module.exports = (req, res, next) => {
//   console.log(req.method, req.originalUrl);
//   next();
// };

module.exports = (req, res, next) => {
  const start = Date.now();

  // Capture response finish to log after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`→ Status: ${res.statusCode} | Time: ${duration}ms`);

    if (Object.keys(req.query).length) {
      console.log('→ Query:', JSON.stringify(req.query));
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      console.log('→ Body:', JSON.stringify(req.body));
    }

    console.log('----------------------------------------');
  });

  next();
};

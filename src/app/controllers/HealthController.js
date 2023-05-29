class HealthController {
  async health(req, res) {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      version: `${process.env.VERSION}`,
      timestamp: Date.now(),
    };
    try {
      res.send(healthcheck);
    } catch (error) {
      healthcheck.message = error;
      res.status(503).send();
    }
  }
}

export default new HealthController();

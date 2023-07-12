# minimal-dash-app
[A minimal Dash app](https://dash.plotly.com/minimal-app) used for App Runner demo.

### `apprunner.yaml`
Configuration file for App Runner. For an overview of App Runner configuration files, see [Setting App Runner service options using a configuration file](https://docs.aws.amazon.com/apprunner/latest/dg/config-file.html).

You can also configure your App Runner service(app) from App Runner console instead of this configuration file.

### HTTP Health Check
Add a Health Check Endpoint to use HTTP Health Check with App Runner.

```python
@app.server.route("/health")
def healthcheck():
  app.logger.info("Healthy")
  return "{status: ok}"
```

When you create a new App Runner service(app), change check protocol and path like below:

![health check configuraiton](screenshot.png)

### `.devcontainer/devcontainer.json`
Configuration file for [GitHub codespaces](https://github.com/features/codespaces). This is not required to use App Runner.

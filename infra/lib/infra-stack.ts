import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import apprunner = require('@aws-cdk/aws-apprunner-alpha'); // Allows working with App Runner resources
import * as apprunnersdk from 'aws-sdk/clients/apprunner';


export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connectionName = 'your-connection-name';
    const appRunnerClient = new apprunnersdk();

    appRunnerClient.getConnection({ ConnectionName: connectionName }, (err, data) => {
      if (err) {
        console.error('Error retrieving connection ARN:', err);
        return;
      }

      const connectionArn = data.Connection?.ConnectionArn;

    const service = new apprunner.Service(this, 'Service', {
      source: apprunner.Source.fromGitHub({
        repositoryUrl: 'https://github.com/agiusalexandre/minimal-dash-app',
        branch: 'main',
        configurationSource: apprunner.ConfigurationSourceType.REPOSITORY,
        connection: apprunner.GitHubConnection.fromConnectionArn('YOUR_APP_RUNNER_CONNECTION_ARN')
      })
    });

    new cdk.CfnOutput(this, "apprunner-url", {
      exportName: "apprunner-url",
      value: service.serviceUrl,
      description: "URL to access service"
    });
  }
}

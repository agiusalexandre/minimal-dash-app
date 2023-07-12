import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import apprunner = require('@aws-cdk/aws-apprunner-alpha'); // Allows working with App Runner resources
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets'; // Allows building the docker image and uploading to ECR
import * as path from "path"; // Helper for working with file paths


export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const service = new apprunner.Service(this, 'Service', {
      source: apprunner.Source.fromGitHub({
        repositoryUrl: 'https://github.com/agiusalexandre/minimal-dash-app',
        branch: 'main',
        configurationSource: apprunner.ConfigurationSourceType.REPOSITORY,
        connection: apprunner.GitHubConnection.fromConnectionArn('arn:aws:apprunner:eu-west-1:284474675936:connection/AppRunner/39007be3e69c42508a464e1016d04004')
      })        
    });

    new cdk.CfnOutput(this, "apprunner-url", {
      exportName: "apprunner-url",
      value: service.serviceUrl,
      description: "URL to access service"
    });
  }
}

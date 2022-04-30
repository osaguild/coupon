import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as r53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as iam from 'aws-cdk-lib/aws-iam';


export class SaitamaPremiumStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // s3 bucket
    const bucket = new s3.Bucket(
      this, "saitama-premium-bucket", {
      websiteIndexDocument: "index.html",
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: "saitama-premium-bucket"
    });

    // s3 access identity
    const identity = new cloudfront.OriginAccessIdentity(
      this, "saitama-premium-origin-access-identity", {
      comment: "s3 access identity"
    });

    // s3 policy statement
    const policy = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      effect: iam.Effect.ALLOW,
      principals: [identity.grantPrincipal],
      resources: [bucket.bucketArn + "/*"],
    });

    // attach
    bucket.addToResourcePolicy(policy)

    // s3 deploy
    new s3Deploy.BucketDeployment(
      this, "saitama-premium-bucket-deployment", {
      destinationBucket: bucket,
      // deploy dir is ./dist
      sources: [s3Deploy.Source.asset("./dist")],
      // todo: meaning of retain_on_delete
      retainOnDelete: false
    });
  }
}

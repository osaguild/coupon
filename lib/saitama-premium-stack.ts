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

    const TARGET = this.node.tryGetContext('dev.TARGET');
    const DOMAIN = this.node.tryGetContext('dev.DOMAIN');
    const FRONT_DOMAIN = this.node.tryGetContext('dev.FRONT_DOMAIN');
    const CERTIFICATE_DOMAIN = this.node.tryGetContext('dev.CERTIFICATE_DOMAIN');

    // s3 bucket
    const bucket = new s3.Bucket(
      this, "saitama-premium-bucket", {
      websiteIndexDocument: "index.html",
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `saitama-premium-bucket-${TARGET}`
    });

    // s3 access identity
    const identity = new cloudfront.OriginAccessIdentity(
      this, "saitama-premium-origin-access-identity", {
      comment: `s3 access identity ${TARGET}`
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

    // hosted zone
    const hostedZone = r53.HostedZone.fromLookup(
      this, "hosted-zone", {
      domainName: "osaguild.com",
    });

    // certificate
    const certificate = new acm.DnsValidatedCertificate(
      this, "certificate", {
      domainName: CERTIFICATE_DOMAIN,
      subjectAlternativeNames: [CERTIFICATE_DOMAIN],
      hostedZone: hostedZone,
      region: "us-east-1",
    });

    // cloud front
    const front = new cloudfront.CloudFrontWebDistribution(
      this, "saitama-premium-front", {
      defaultRootObject: "index.html",
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: identity
        },
        behaviors: [{
          isDefaultBehavior: true,
        }],
      }],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
        certificate, {
        aliases: [FRONT_DOMAIN],
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
        sslMethod: cloudfront.SSLMethod.SNI
      }),
      comment: `saitama-premium-front-${TARGET}`,
    });

    // A record for front
    const frontARecord = new r53.ARecord(
      this, "front-a-record", {
      recordName: FRONT_DOMAIN,
      zone: hostedZone,
      target: r53.RecordTarget.fromAlias(
        new r53Targets.CloudFrontTarget(front)
      ),
    });
  }
}

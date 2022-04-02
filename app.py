from aws_cdk import (
    core,
    aws_s3 as s3,
    aws_s3_deployment as s3_deploy,
    aws_cloudfront as cloudfront,
    aws_certificatemanager as acm,
    aws_route53 as r53,
    aws_route53_targets as r53_targets,
    aws_iam as iam,
)
import os

class SaitamaPremium(core.Stack):

    def __init__(self, scope: core.App, name: str, CONTEXT: str, **kwargs) -> None:
        super().__init__(scope, name, **kwargs)
        
        # s3 bucket
        bucket = s3.Bucket(
            self, "saitama-premium-bucket",
            website_index_document="index.html",
            access_control=s3.BucketAccessControl.PRIVATE,
            removal_policy=core.RemovalPolicy.DESTROY,
            bucket_name="saitama-premium-" + CONTEXT["TARGET"],
        )

        # s3 access identity
        identity = cloudfront.OriginAccessIdentity(
            self, "saitama-premium-origin-access-identity",
            comment="s3 access identity " + CONTEXT["TARGET"],
        )

        # s3 policy statement
        policy = iam.PolicyStatement(
            actions=['s3:GetObject'],
            effect=iam.Effect.ALLOW,
            principals=[identity.grant_principal],
            resources=[bucket.bucket_arn + "/*"],
        )

        # attach
        bucket.add_to_resource_policy(policy)

        # s3 deploy
        s3_deploy.BucketDeployment(
            self, "saitama-premium-bucket-deployment",
            destination_bucket=bucket,
            # deploy dir is ./dist
            sources=[s3_deploy.Source.asset("./dist")],
            # todo: meaning of retain_on_delete
            retain_on_delete=False,
        )

        # hosted zone
        hosted_zone=r53.HostedZone.from_lookup(
            self,"hosted-zone",
            domain_name="osaguild.com",
        )

        # certificate
        certificate=acm.DnsValidatedCertificate(
            self, "certificate",
            domain_name=CONTEXT["CERTIFICATE_DOMAIN"],
            subject_alternative_names=[CONTEXT["CERTIFICATE_DOMAIN"]],
            hosted_zone=hosted_zone,
            region="us-east-1",
        )

        # cloud front
        front = cloudfront.CloudFrontWebDistribution(
            self, "saitama-premium-front",
            default_root_object="index.html",
            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            http_version=cloudfront.HttpVersion.HTTP2,
            price_class=cloudfront.PriceClass.PRICE_CLASS_ALL,
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=bucket,
                        origin_access_identity=identity
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            is_default_behavior=True,
                        )
                    ],
                )
            ],
            viewer_certificate=cloudfront.ViewerCertificate.from_acm_certificate(
                certificate,
                aliases=[CONTEXT["FRONT_DOMAIN"]],
                security_policy=cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
                ssl_method=cloudfront.SSLMethod.SNI
            ),
            comment="saitama-premium-front-" + CONTEXT["TARGET"],
        )

        # A record for front
        front_a_record = r53.ARecord(
            self, "front-a-record",
            record_name=CONTEXT["FRONT_DOMAIN"],
            zone=hosted_zone,
            target=r53.RecordTarget.from_alias(
                r53_targets.CloudFrontTarget(front)
            ),
        )

app = core.App()

SaitamaPremium(
    app, "saitama-premium-prd",
    env={
        "region": os.environ["CDK_DEFAULT_REGION"],
        "account": os.environ["CDK_DEFAULT_ACCOUNT"],
    },
    CONTEXT=app.node.try_get_context("prd"),
)

SaitamaPremium(
    app, "saitama-premium-dev",
    env={
        "region": os.environ["CDK_DEFAULT_REGION"],
        "account": os.environ["CDK_DEFAULT_ACCOUNT"],
    },
    CONTEXT=app.node.try_get_context("dev"),
)

app.synth()
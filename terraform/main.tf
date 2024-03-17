resource "aws_api_gateway_rest_api" "postech_rest_api" {
    api_key_source               = "HEADER"
    arn                          = "arn:aws:apigateway:us-east-1::/restapis/oke7wtzd7l"
    binary_media_types           = []
    created_date                 = "2024-03-09T15:58:26Z"
    disable_execute_api_endpoint = false
    execution_arn                = "arn:aws:execute-api:us-east-1:381492192151:oke7wtzd7l"
    id                           = "oke7wtzd7l"
    name                         = "postech"
    put_rest_api_mode            = "overwrite"
    root_resource_id             = "md8zz740r2"
    tags                         = {}
    tags_all                     = {}

    endpoint_configuration {
        types            = [
            "REGIONAL",
        ]
        vpc_endpoint_ids = []
    }
}

resource "aws_lambda_function" "postech_lambda_function" {
 architectures                  = [
        "x86_64",
    ]
    arn                            = "arn:aws:lambda:us-east-1:381492192151:function:postech_auth"
    function_name                  = "postech_auth"
    handler                        = "index.handler"
    id                             = "postech_auth"
    invoke_arn                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:381492192151:function:postech_auth/invocations"
    last_modified                  = "2024-03-17T16:02:11.000+0000"
    layers                         = []
    memory_size                    = 128
    package_type                   = "Zip"
    qualified_arn                  = "arn:aws:lambda:us-east-1:381492192151:function:postech_auth:$LATEST"
    qualified_invoke_arn           = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:381492192151:function:postech_auth:$LATEST/invocations"
    reserved_concurrent_executions = -1
    role                           = "arn:aws:iam::381492192151:role/service-role/postech_auth-role-w5pi2v6n"
    runtime                        = "nodejs20.x"
    skip_destroy                   = false
    source_code_hash               = "qICfmqQQmaHOGcd2dqTApatY6IBbr8VJI1AGuQ0Nz70="
    source_code_size               = 1077039
    tags                           = {}
    tags_all                       = {}
    timeout                        = 3
    version                        = "$LATEST"

    ephemeral_storage {
        size = 512
    }

    logging_config {
        log_format = "Text"
        log_group  = "/aws/lambda/postech_auth"
    }

    tracing_config {
        mode = "PassThrough"
    }

    vpc_config {
        ipv6_allowed_for_dual_stack = false
        security_group_ids          = [
            "sg-065694c77258e2760",
        ]
        subnet_ids                  = [
            "subnet-00efc2cdf2882a61c",
            "subnet-07b732e1f07eaca3a",
            "subnet-088194dd778af29a0",
            "subnet-08d602250ecf48386",
            "subnet-099ee6f7ddea28d5a",
            "subnet-0f1150586d3e73c42",
        ]
        vpc_id = "vpc-0afd12980d0d1f3c3"
    }

}
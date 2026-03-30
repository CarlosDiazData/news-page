#!/usr/bin/env python
from aws_cdk import App
from infrastructure.news_stack import NewsStack

app = App()
NewsStack(app, "NewsStack", env={
    "account": "REDACTED",
    "region": "us-east-1"
})
app.synth()

import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BillingAlarm } from '../lib/billing-alarm';

// TODO: fill in test inputs here
const ACCOUNT_ID = '764114738171';
const REGION = 'us-west-2';
const SAMPLE_EMAIL = 'aphexlog@gmail.com';

// Lib config
class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const alarm = new BillingAlarm(this, 'AWSAccountBillingAlarm', {
      monthlyThreshold: 50,
      emails: [SAMPLE_EMAIL],
    });

    const topic = alarm.snsTopic;
    // const snsTopic = alarm.node.findChild('Topic') as sns.ITopic;

    new CfnOutput(this, 'SNS Topic', {
      value: topic.topicName,
    });
  }
}

// App config
const app = new App();

new CdkStack(app, 'TestBillingAlarmStack', {
  env: {
    account: ACCOUNT_ID,
    region: REGION,
  },
});

app.synth();

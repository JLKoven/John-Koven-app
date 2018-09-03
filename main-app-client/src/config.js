export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "awsreactdynamodbjohnkoven"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ol0f974xdi.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Z40TyNs17",
    APP_CLIENT_ID: "2h055sqrl1edmvjthb929t8b2g",
    IDENTITY_POOL_ID: "us-east-1:17c97652-5af5-4307-a26b-431263799144"
  }
};

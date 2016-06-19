'use strict';

const expect = require('chai').expect;
const AwsDeploy = require('../index');
const Serverless = require('../../../../Serverless');

describe('#initializeResources()', () => {
  const serverless = new Serverless();
  const awsDeploy = new AwsDeploy(serverless);

  it('should add core resources and merge custom resources', () => {
    awsDeploy.options = {
      stage: 'dev',
      region: 'us-east-1',
    };
    awsDeploy.serverless.service.service = 'first-service';

    awsDeploy.serverless.service.resources.aws = {
      Resources: {
        fakeResource: {
          fakeProp: 'fakeValue',
        },
      },
    };

    awsDeploy.initializeResources();

    expect(Object.keys(awsDeploy.serverless.service.resources
      .aws.Resources).length).to.be.equal(4);
  });
});
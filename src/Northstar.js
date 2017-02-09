import RestApiClient from './RestApiClient';

class PhoenixAshes extends RestApiClient {
  constructor(config = {}, overrides = {}) {
    const baseUrl = 'https://northstar-qa.dosomething.org';

    super(baseUrl, {
      credentials: 'omit',
    });
  }
}

export default PhoenixAshes;

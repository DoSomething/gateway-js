import RestApiClient from './RestApiClient';

class PhoenixAshes extends RestApiClient {
  constructor(config = {}, overrides = {}) {
    const baseUrl = 'https://staging.dosomething.org';

    super(baseUrl, {
      credentials: 'omit',
    });
  }
}

export default PhoenixAshes;

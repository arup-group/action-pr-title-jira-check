
const { isValidJiraState } = require('../validate-jira-state');

describe('isValidJiraState', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('Jira ticket not found', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      json: async () => ({})
    });

    const inProgress = await isValidJiraState('GSA-9999', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.result).toBe(false);
  });

  test('Jira ticket not found message', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      json: async () => ({})
    });

    const inProgress = await isValidJiraState('GSA-9999', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.message).toBe('Could not find Jira ticket GSA-9999');
  });

  test('Jira ticket found', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        fields: { status: { statusCategory: { name: 'In Progress' } } }
      })
    });

    const inProgress = await isValidJiraState('D3-367', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.result).toBe(true);
  });

  test('Jira ticket found message', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        fields: { status: { statusCategory: { name: 'In Progress' } } }
      })
    });

    const inProgress = await isValidJiraState('D3-367', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.message).toBe('D3-367 has status category: In Progress');
  });

  test('Jira ticket in wrong state', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        fields: { status: { statusCategory: { name: 'To Do' } } }
      })
    });

    const inProgress = await isValidJiraState('D3-365', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.result).toBe(false);
  });

  test('Jira ticket in wrong state message', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        fields: { status: { statusCategory: { name: 'To Do' } } }
      })
    });

    const inProgress = await isValidJiraState('D3-365', 'In Progress', 'peter.grainger@arup.com', 'secret', console.log);
    expect(inProgress.message).toBe('D3-365 has status category To Do, expected In Progress');
  });
});

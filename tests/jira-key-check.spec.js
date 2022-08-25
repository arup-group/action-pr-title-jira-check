
const {isValidJiraState} = require('../validate-jira-state');

test('Jira ticket not found', async () => {
  const inProgress = await isValidJiraState('GSA-9999', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.result).toBe(false);
})

test('Jira ticket not found message', async () => {
  const inProgress = await isValidJiraState('GSA-9999', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.message).toBe('Could not find Jira ticket GSA-9999');
})

test('Jira ticket found', async () => {
  const inProgress = await isValidJiraState('D3-367', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.result).toBe(true);
})

test('Jira ticket found message', async () => {
  const inProgress = await isValidJiraState('D3-367', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.message).toBe('D3-367 has status category: In Progress');
})

test('Jira ticket in wrong state', async () => {
  const inProgress = await isValidJiraState('D3-365', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.result).toBe(false);
})

test('Jira ticket in wrong state message', async () => {
  const inProgress = await isValidJiraState('D3-365', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress.message).toBe('D3-365 has status category To Do, expected In Progress');
})

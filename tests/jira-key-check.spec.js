
const {isValidJiraState} = require('../validate-jira-state');

test('Jira ticket not found', async () => {
  const inProgress = await isValidJiraState('GSA-1233', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress).toBe(false);
})

test('Jira ticket found', async () => {
  const inProgress = await isValidJiraState('D3-331', 'In Progress', 'peter.grainger@arup.com', process.env.JIRA_SECRET, console.log)
  expect(inProgress).toBe(true);
})


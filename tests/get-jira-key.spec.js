const { getJiraKey } = require('../get-jira-key')

test('Valid ticket format', () => {
  const pr = 'GSA-1233 some ticket'
  const jiraKey = getJiraKey(pr)
  expect(jiraKey).toBe('GSA-1233')
})

test('Invalid ticket format', () => {
  const pr = 'some-ticket'
  const jiraKey = getJiraKey(pr)
  expect(jiraKey).toBeFalsy()
})

test('two different jira tickets', () => {
  const pr = 'GSA-1233 some ticket GSA-1234'
  const jiraKey = getJiraKey(pr)
  expect(jiraKey).toBe('GSA-1233')
})
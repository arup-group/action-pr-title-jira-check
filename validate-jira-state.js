const fetch = require('node-fetch');

const isValidJiraState = async (pr, statusCategory, jiraUsername, jiraSecret, log) => {
  const response = await fetch(`https://ovearup.atlassian.net/rest/api/3/issue/${pr}?fields=status`, {
    method: 'GET',
    headers: headers(jiraUsername, jiraSecret),
  })
  const status = await response.status;
  const json = await response.json();

  if(status === 200) {
    const jiraStatusCategory = json.fields.status.statusCategory.name;
    log(`${pr} has status category: ${jiraStatusCategory}`);

    if(jiraStatusCategory === statusCategory) {
      return {
        result: true,
        message: `${pr} has status category: ${jiraStatusCategory}`
      }
    } else {
      return {
        result: false,
        message: `${pr} has status category ${jiraStatusCategory}, expected ${statusCategory}`
      }
    }
  } else {
    log(`Couldn't find Jira ticket: ${pr}`);
    return {
      result: false,
      message: `Could not find Jira ticket ${pr}`
    }
  }
}

const headers = (jiraUsername, jiraSecret) => ({
  'Content-Type': 'application/json',
  'Authorization': `Basic ${Buffer.from(`${jiraUsername}:${jiraSecret}`).toString('base64')}`
})

module.exports = {
  isValidJiraState
}
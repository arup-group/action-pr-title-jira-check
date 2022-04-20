const {debug, setFailed, getInput} = require('@actions/core');
const { isValidJiraState } = require('./validate-jira-state');
const { getJiraKey } = require('./get-jira-key');

async function run() {
  try {
    // Get all of the inputs defined in the actions.yml file
    const pr = getInput('prTitle');
    const jiraSecret = getInput('jiraSecret');
    const jiraUsername = getInput('jiraUsername');
    const statusCategory = getInput('statusCategory'); // Status category has a default so can't be undefined
    if(!pr) throw Error('No PR title provided');
    if(!jiraSecret) throw Error('No Jira secret provided');

    // Extract the Jira key from the PR title
    const jiraKey = getJiraKey(pr)
    if(!jiraKey) throw Error(`Name of PR is incorrect format. ${pr}`);

    // Check the Jira ticket status category
    const jiraStateValid = await isValidJiraState(jiraKey, statusCategory, jiraUsername, jiraSecret, debug);
    if(!jiraStateValid) throw Error(`Jira ticket ${jiraKey} is not in the ${statusCategory} state`);

  } catch (error) {
    setFailed(error);
  }
}

run();
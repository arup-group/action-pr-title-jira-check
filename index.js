const { isValidJiraState } = require('./validate-jira-state');
const { getJiraKey } = require('./get-jira-key');

const getInput = (name) => {
  const envName = `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  return process.env[envName] || '';
};

async function run() {
  try {
    // Get all of the inputs defined in the actions.yml file
    const pr = getInput('prTitle');
    const jiraSecret = getInput('jiraSecret');
    const jiraUsername = getInput('jiraUsername');
    const statusCategory = getInput('statusCategory') || 'In Progress';
    if (!pr) throw new Error('No PR title provided');
    if (!jiraSecret) throw new Error('No Jira secret provided');

    // Extract the Jira key from the PR title
    const jiraKey = getJiraKey(pr);
    if (!jiraKey) throw new Error(`Name of PR is incorrect format. ${pr}`);

    // Check the Jira ticket status category
    const jiraStateValid = await isValidJiraState(jiraKey, statusCategory, jiraUsername, jiraSecret, console.debug);
    if (!jiraStateValid.result) throw new Error(jiraStateValid.message);
  } catch (error) {
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

run();
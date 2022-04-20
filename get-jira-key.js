const jiraKeyMatcher = /^[a-zA-Z0-9]+-[0-9]{1,4}/;

const getJiraKey = (pr) => {
  const match = pr.match(jiraKeyMatcher);
  return match ? match[0] : false;
}

module.exports = {
  getJiraKey
}
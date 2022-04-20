const validPRFormat = (pr, jiraKeyMatcher) => {
  return jiraKeyMatcher.test(pr);
}

module.exports = {
  validPRFormat
};
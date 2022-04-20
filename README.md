# PR Title Jira Check

This action extracts a Jira key from `prTitle` and checks in [Arup's Jira](ttps://ovearup.atlassian.net/) if that key is present and in the defined `statusCategory`.

The `prTitle` must have the Jira key at the start of the text followed by a space e.g. `D3-331 Some great change`. This will use the jira key `D3-331` and call the Jira API. If the status of the Jira ticket is the same as `statusCategory` the action will complete sucessfully, otherwise the step will fail with an error.

# Usage

<!-- start usage -->
```yaml
- uses: arup-group/action-pr-title-jira-check@main
  with:
    # Pull request title. If this action is triggered by a PR update use ${{ github.event.pull_request.title }}
    # No Default
    prTitle: ''

    # JIRA API key. You can create one here: https://id.atlassian.com/manage/api-tokens
    # No Default
    jiraSecret: ''

    # One of Complete, In Progress, To do 
    # No Default
    statusCategory: ''

    # Username of the user that created the API key
    # No Default
    jiraUsername: ''
```
<!-- end usage -->

# Example

```yaml
- name: Valid PR title
  uses: arup-group/action-pr-title-jira-check@main
  with:
    prTitle: '${{ github.event.pull_request.title }}'
    jiraSecret: '${{ secrets.JIRA_PASSWORD }}'
    statusCategory: 'In Progress'
    jiraUsername: 'automation@arup.com'
```


# Torremo Azure DevOps Task

This Azure DevOps task allows running Torremo on Azure DevOps. It is used in [SDP's _general purpose pipeline_ for Azure DevOps](https://github.tools.sap/concur-sap-ecosystem/custom-sdp-pipeline-azure).

## Prerequisites

The task is [published](https://marketplace.visualstudio.com/items?itemName=torremo) on the marketplace and needs to be [installed](https://docs.microsoft.com/en-us/azure/devops/marketplace/install-extension?view=azure-devops&tabs=browser) into your Azure organization, but is currently not publicly available. Feel free to contact one of the code owners to get install permissions in case you would like to use it in your own organisation.

### Secrets

The extension requires Vault credentials and a [service connection](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml) to GitHub Tools available.
The Vault credentials should be provided to the pipeline as `torremo.vault.roleId` and `torremo.vault.secretId` [variables](https://learn.microsoft.com/en-gb/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch).

## Usage

```yml
# Project Torremo
# Execute a step from the SAP Torremo library
- task: torremo@1
  # or if you would like to pin specific version of the task, use 'torremo@1.2.3'
  inputs:
    stepName: "help"
    flags: "" # Optional
    torremoVersion: "" # Optional
    gitHubConnection: "" # Optional
```

### Arguments

| Argument                                                  | Description                                                                                                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stepName` </br> Step Name                                | (Required) The name of a Torremo step to execute. </br> Default value: `help`                                                                                                              |
| `flags` </br> command options                             | (Optional) Option flags for Torremo step                                                                                                                                                   |
| `torremoVersion` </br> Torremo Version                    | (Optional) The version of the Piper binary, defaults to the latest release.                                                                                                                |
| `gitHubConnection` </br> GitHub connection (OAuth or PAT) | (Optional) Specify the name of the GitHub service connection to use to connect to the GitHub.com repository. The connection must be based on a GitHub user's GitHub personal access token. |

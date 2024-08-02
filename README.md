# Repository Management

Yet, another GitHub action that can be used to create a new repository.

## Variables and outputs

### Inputs

The action allows you to specify other information apart from the name and the account. The following is the list of parameters it can receive:

| Name        | Description                                                                             | Type    | Required | Default  |
| ----------- | --------------------------------------------------------------------------------------- | ------- | -------- | -------- |
| account     | Name or username of the account where the repository will be created                    | String  | Yes      | N/A      |
| name        | Name of the repository to be created                                                    | String  | Yes      | N/A      |
| githubToken | The token created for the account or rganization with admin access to repositories only | String  | Yes      | N/A      |
| description | Description of the repository                                                           | String  | No       | <empty>  |
| access      | Whether the repository is private                                                       | Boolean | No       | false    |
| visibility  | Whether the repository is "public" or "private"                                         | String  | No       | "public" |
| issues      | Whether the repository has issues enabled or not                                        | Boolean | No       | false    |

### Outputs

| Name          | Description                                                   | Type   |
| ------------- | ------------------------------------------------------------- | ------ |
| RepositoryURL | Contains the resulting URL of the created repository          | String |
| RepositoryID  | Contains the resulting ID reference of the created repository | String |

## Usage

The action is simple to use, just reference it in your YAML file and pass it the information you want, the action will take care of the rest.

```yaml
name: "Your Friendly workflow name"
  ...<Your workflow launch config goes here>

jobs:
  ...<job config (if any)>

  create-repository:
    runs-on: ubuntu-latest
    name: Create a repository
    steps:
      - name: Setup NodeJS env
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Create Repo (new workflow)
        uses: OneComputerGuy/create-repository@main
        id: createRepo
        with:
          account: "<YOUR ACCOUNT/ORG NAME>"
          name: "${{ github.event.inputs.repoName }}"
          visibility: "${{ github.event.inputs.repoType }}"
          githubToken: "${{ secrets.MY_SUPER_SECRET_TOKEN }}"
      - name: Show the URL of the new repository
        run: echo "The new repo is ${{ steps.createRepo.outputs.RepositoryURL }}"
      - name: Show the ID of the new repository
        run: echo "The new repo ID is ${{ steps.createRepo.outputs.RepositoryID }}"

  ...<job config (if any)>
```

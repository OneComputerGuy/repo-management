const axios = require("axios");
const params = require("@actions/core");

const accountName = params.getInput("account");
const repositoryName = params.getInput("name");
const repositoryDescription = params.getInput("description");
const isPrivate = params.getBooleanInput("access");
const visibilityLevel = params.getInput("visibility");
const allowsIssues = params.getBooleanInput("issues");
const githubToken = params.getInput("githubToken");

const repositoryParams = {
  name: repositoryName,
  description: repositoryDescription || "",
  private: isPrivate || false,
  visibility: visibilityLevel || "public",
  has_issues: allowsIssues || false,
};

console.log(repositoryParams);

const URL = `https://api.github.com/orgs/${accountName}/repos`;

axios({
  method: "POST",
  url: URL,
  headers: {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
  data: repositoryParams,
})
  .then((response) => {
    params.setOutput("Repository created successfully.");
    params.setOutput("RepositoryURL", response.data.html_url);
    params.setOutput("RepositoryID", response.data.id);
  })
  .catch((error) => {
    params.setOutput("There was an error creating the repository.");
    params.setFailed(error.message);
  });

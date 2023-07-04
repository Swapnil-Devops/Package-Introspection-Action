const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log("inside run");
    const packageName = "my-package"; //core.getInput('package-name');
     const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    console.log("inside run", packageName, token, octokit);
    const { data: metadata } = await octokit.request('GET /packages/container/{package_name}', {
      package_name: packageName
    });
    console.log("metadata", metadata)
    core.setOutput('package-metadata', JSON.stringify(metadata));
  } catch (error) {
    core.setFailed("action error"+error.message);
  }
}

run();

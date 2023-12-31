const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log("inside run");
    const packageName = core.getInput('package-name');
     const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    console.log("inside run", packageName );
    const { data: metadata } = await octokit.request('GET /pkgs/container/my-package:sha-6091f33', {
      package_name: packageName
    });
    console.log("metadata", metadata,JSON.stringify(metadata));
    core.setOutput('package-metadata', JSON.stringify(metadata));
  } catch (error) {
    core.setFailed("action error"+error.message);
  }
}

run();

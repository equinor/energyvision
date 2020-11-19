# How we use Git and Github in this project
## Trunk Based Development
In this project we will be using what is called [*Trunk Based Development*](https://trunkbaseddevelopment.com/).
This is a source-control branching model where everyone is collaborating on code in a single branch called 'trunk'. In this porject that would be the *main* branch. That doesn't mean that other branches are prohibited, but we should avoid having long-lived branches other than the main trunk.\
\
The main motivation for working this way is that it enables [*Continous Integration*](https://trunkbaseddevelopment.com/continuous-integration/) which resonates with the Lean Kanban way of working. We get to see changes rapidly and can act fast on any issues.

## Rebase strategy
In order to have a nice [*DAG*](https://medium.com/girl-writes-code/git-is-a-directed-acyclic-graph-and-what-the-heck-does-that-mean-b6c8dec65059), and be able to use powerful features like [*git-bisect*](https://git-scm.com/docs/git-bisect), using a rebase strategy is strongly encouraged. This is especially true when doing trunk based development as you don't necessarily squash your commits through a PR. By rebasing your commits on top of the main branch (easily done by doing `git pull --rebase` or by setting `git config pull.rebase true`). Interactive rebasing also lets you clean up your commits before pushing to GitHub.

## Feature toggle
When doing trunk based development new features may be put into production too soon. It is a good thing to have the code integrated with everyone elses code quite early, but you might want to wait exposing some features until you are ready to make them available. *Feature switches* or *Feature toggles* is a good way of hiding features from the user, but still have the code in production.

## Branch naming
Sometimes a task may be complicated or could affect large parts of the system. In this case a feature branch may be used for a short period of time. This also makes it possible to make a Pull Request.\
It is good custom to name the branches in a way that you can identify *who* the branch belongs to and *which issue* it concerns. For this project we will use the following format:

*feature/[your initials]-[Issue number]-short-description-kebab-cased*

Example:\
`feature/NML-35-add-github-documentation`
 
## Commit messages
A great article explaing how to write good commit messages can be found [here](https://chris.beams.io/posts/git-commit/).

The guidelines for this project are:
1. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Use gitmojis when applicable
1. Include link to GitHub issue in the subject when applicable:
    ```
    fix #xxx
    fixes #xxx
    fixed #xxx
    close #xxx
    closes #xxx
    closed #xxx
    resolve #xxx
    resolves #xxx
    resolved #xxx
    ```
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how
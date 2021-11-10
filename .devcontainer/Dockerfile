# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.192.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
     && apt-get -y install --no-install-recommends fish curl silversearcher-ag fzf fonts-powerline

# This does not work for some reason
RUN curl -L https://github.com/oh-my-fish/oh-my-fish/raw/master/bin/install > install
RUN fish install --noninteractive

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g pnpm"
RUN su node -c "npm install -g gitmoji-cli"
RUN su node -c "npm install -g azure-functions-core-tools@3 --unsafe-perm true"
RUN su node -c "npm install -g azurite"

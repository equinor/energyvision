# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.192.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

ENV TZ Europe/Oslo

# [Option] Install zsh. False as it is already installed I believe. Byt needed for script.
ARG INSTALL_ZSH="false"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="false"
ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby Engine instead of the licensed Docker Engine
ARG USE_MOBY="true"
# [Option] Engine/CLI Version
ARG DOCKER_VERSION="latest"

# Enable new "BUILDKIT" mode for Docker CLI
ENV DOCKER_BUILDKIT=1

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.
ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID
COPY library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
    && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
    # Use Docker script from script library to set things up
    && /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${USERNAME}" "${USE_MOBY}" "${DOCKER_VERSION}" \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
     && apt-get -y install --no-install-recommends fish curl silversearcher-ag fzf fonts-powerline fonts-firacode

# This does not work for some reason
RUN curl -L https://github.com/oh-my-fish/oh-my-fish/raw/master/bin/install > install
RUN fish install --noninteractive

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

VOLUME [ "/var/lib/docker" ]

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g pnpm@7.2.1"
RUN su node -c "npm install -g gitmoji-cli"
RUN su node -c "npm install -g azure-functions-core-tools@4 --unsafe-perm true"
RUN su node -c "npm install -g azurite"
RUN su node -c "npm install -g @sanity/cli"

# Setting the ENTRYPOINT to docker-init.sh will start up the Docker Engine
# inside the container "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

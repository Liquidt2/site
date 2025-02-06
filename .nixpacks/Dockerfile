FROM ghcr.io/railwayapp/nixpacks:ubuntu-1722297819

ENTRYPOINT ["/bin/bash", "-l", "-c"]
WORKDIR /app/


COPY .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix
RUN nix-env -if .nixpacks/nixpkgs-bdd2f439c62aa0b8aa97f5c784a965c23f968fe6.nix && nix-collect-garbage -d


ARG CI GIT_SHA NIXPACKS_METADATA NODE_ENV NPM_CONFIG_PRODUCTION
ENV CI=$CI GIT_SHA=$GIT_SHA NIXPACKS_METADATA=$NIXPACKS_METADATA NODE_ENV=$NODE_ENV NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION

# setup phase
# noop

# install phase
ENV NIXPACKS_PATH /app/node_modules/.bin:$NIXPACKS_PATH
COPY . /app/.
RUN --mount=type=cache,id=pjfcNq5QsFU-/usr/local/share/cache/yarn/v6,target=/usr/local/share/.cache/yarn/v6 yarn install --frozen-lockfile

# build phase
COPY . /app/.
RUN --mount=type=cache,id=pjfcNq5QsFU-next/cache,target=/app/.next/cache --mount=type=cache,id=pjfcNq5QsFU-node_modules/cache,target=/app/node_modules/.cache yarn run build


RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile


# start
COPY . /app
CMD ["yarn run start"]


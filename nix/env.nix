{ pkgs, packages }:
with packages;
{
  system = [
    coreutils
    sd
    bash
    findutils
    xmlstarlet
    yq-go
    jq
  ];

  dev = [
    pls
    git
  ];

  infra = [
    docker
  ];

  main = [
    go
    dotnet
    nodejs
    bun
    infisical
  ];

  lint = [
    # core
    treefmt
    hadolint
    gitlint
    shellcheck
    sg
    golangci-lint
  ];

  ci = [

  ];

  releaser = [
    nodejs
    sg
    npm
  ];

}

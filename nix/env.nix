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

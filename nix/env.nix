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
    toml-cli
  ];

  dev = [
    pls
    git
  ];

  infra = [
    docker
  ];

  main = [
    python
    poetry

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
    golangci-lint
    sg
  ];

  ci = [

  ];

  releaser = [
    sg
  ];

}

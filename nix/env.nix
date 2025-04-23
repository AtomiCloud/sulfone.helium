{ pkgs, packages }:
with packages;
{
  system = [
    atomiutils
    xmlstarlet
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
    gcc

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

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
    infrautils
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

    k6
  ];

  lint = [
    # core
    treefmt
    infralint
    gitlint
    shellcheck
    golangci-lint
    sg
    biome
    ruff
    mypy
  ];

  ci = [

  ];

  releaser = [
    sg
  ];

}

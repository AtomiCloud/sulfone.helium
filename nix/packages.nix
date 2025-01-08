{ pkgs, atomi, pkgs-2411 }:
let
  all = {
    atomipkgs = (
      with atomi;
      {
        inherit
          toml-cli
          sg
          pls;
      }
    );
    nix-2411 = (
      with pkgs-2411;
      {
        inherit
          infisical
          hadolint
          k3d
          bun
          coreutils
          findutils
          sd
          bash
          git
          yq-go
          jq
          # lint
          treefmt
          gitlint
          shellcheck

          # dotnet
          xmlstarlet
          # go
          golangci-lint
          go

          #infra
          docker
          ;

        python = python312;
        poetry = (poetry.override { python3 = python312; });
        npm = nodePackages.npm;
        nodejs = nodejs_22;
        dotnet = dotnet-sdk_9;
      }
    );
  };
in
with all;

atomipkgs //
nix-2411


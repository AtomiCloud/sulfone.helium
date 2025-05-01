{ pkgs, atomi, pkgs-2411 }:
let
  all = {
    atomipkgs = (
      with atomi;
      {
        inherit
          atomiutils
          infrautils
          infralint
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
          git
          gcc
          k6
          # lint
          treefmt
          gitlint
          shellcheck

          # dotnet
          xmlstarlet
          # go
          golangci-lint
          go

          bun
          ;

        python = python312;
        poetry = (poetry.override { python3 = python312; });
        npm = nodePackages.npm;
        nodejs = nodejs_22;
        dotnet = dotnet-sdk_8;
      }
    );
  };
in
with all;

atomipkgs //
nix-2411


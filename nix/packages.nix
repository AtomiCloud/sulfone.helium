{ pkgs, atomi, atomi_classic, pkgs-2305, pkgs-sep-04-23, pkgs-nov-08-23 }:
let
  all = {
    atomipkgs_classic = (
      with atomi_classic;
      {
        inherit
          sg;
      }
    );
    atomipkgs = (
      with atomi;
      {
        inherit
          infisical
          pls;
      }
    );
    nix-2305 = (
      with pkgs-2305;
      {
        inherit
          hadolint
          k3d;
      }
    );
    nov-08-23 = (
      with pkgs-nov-08-23;
      {
        inherit bun
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

          #infra
          docker;

        npm = nodePackages.npm;
        nodejs = nodejs_20;
      }
    );
    sep-04-23 = (
      with pkgs-sep-04-23;
      {
        inherit
          # go
          golangci-lint
          go;
        dotnet = dotnet-sdk_8;
      }
    );
  };
in
with all;
atomipkgs //
atomipkgs_classic //
nix-2305 //
sep-04-23 //
nov-08-23

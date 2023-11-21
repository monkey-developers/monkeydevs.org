{ pkgs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = with pkgs; [ nodePackages.pnpm ];

  # https://devenv.sh/scripts/
  scripts.hello.exec = "echo hello from $GREET";

  enterShell = ''
    hello

    echo "- Node Version: $(node --version)"
    echo "- NPM Version: $(npm --version)"
    echo "- PNPM Version: $(pnpm --version)"
  '';

  # https://devenv.sh/languages/
  # languages.nix.enable = true;

  languages = {
    javascript = {
      enable = true;
    };
  };

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
}

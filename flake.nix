{
  description = "Portfolio Dev Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          jdk21          # Java 21
          gradle         # Build tool
          nodejs_20      # Node 20
          nodePackages.npm
          git
	  unzip
        ];

        shellHook = ''
          echo "Portfolio Environment Loaded!"
          echo "Java: $(java -version 2>&1 | head -n 1)"
          echo "Node: $(node --version)"
        '';
      };
    };
}

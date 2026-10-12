const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#04908b",
              "@body-background": "#f6f6f6",
              "@font-family": "'Open Sans', sans-serif",
              "@table-row-hover-bg": "#eaf4f4",
              "@table-padding-vertical": "5px",
              "@table-padding-horizontal": "5px",
              "@table-border-color": "#dee6e6",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

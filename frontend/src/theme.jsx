export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#6A7CF6",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#EB5153",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#FFFFFF",
            paper: "#F6F8FA",
          },
          text: {
            primary: "#222566",
            secondary: "#222566",
            disabled: "rgba(34, 37, 102, 0.38)",
          },
          error: {
            main: "#EB5153",
            contrastText: "#FFFFFF",
          },
          success: {
            main: "#4caf50",
            contrastText: "#FFFFFF",
          },
          info: {
            main: "#2196f3",
            contrastText: "#FFFFFF",
          },
          warning: {
            main: "#ff9800",
            contrastText: "#FFFFFF",
          },
          divider: "rgba(0, 0, 0, 0.12)",
        }
      : {
          primary: {
            main: "#4effca",
            contrastText: "rgba(51,43,43,0.87)",
          },
          secondary: {
            main: "#1abc9c",
          },
          text: {
            primary: "#e0e0e0",
          },
          success: {
            main: "#27ae60",
          },
          error: {
            main: "#e74c3c",
          },
          info: {
            main: "#3498db",
          },
          warning: {
            main: "#f39c12",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          divider: "rgba(68,68,68,0.5)",
        }),
  },
});

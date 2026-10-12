// antd v5 theme. Replaces the v4 Less `modifyVars` that used to live in
// vite.config.js (v5 is CSS-in-JS and no longer reads Less variables).
// Each token below maps 1:1 to the old Less variable noted beside it.
const theme = {
  token: {
    colorPrimary: "#04908b", // @primary-color
    colorBgLayout: "#f6f6f6", // @body-background
    fontFamily: "'Open Sans', sans-serif", // @font-family
    // v5 defaults to 6px rounded corners; v4 used 2px. Kept at 2px so
    // buttons/inputs/selects look the same as before the upgrade.
    borderRadius: 2,
  },
  components: {
    // Sidebar menu: keep the v4 look (white items on the dark teal sider,
    // green selected row, full-width square rows). v5 otherwise colours
    // items with colorPrimary/dark text and insets them with rounded corners.
    Menu: {
      itemBg: "#025f5c",
      subMenuItemBg: "#025f5c",
      itemColor: "#ffffff",
      itemHoverColor: "#ffffff",
      itemSelectedColor: "#ffffff",
      itemSelectedBg: "#43b78f",
      itemHoverBg: "transparent",
      itemActiveBg: "transparent",
      itemMarginInline: 0,
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
      activeBarBorderWidth: 0,
    },
    Table: {
      rowHoverBg: "#eaf4f4", // @table-row-hover-bg
      cellPaddingBlock: 5, // @table-padding-vertical
      cellPaddingInline: 5, // @table-padding-horizontal
      borderColor: "#dee6e6", // @table-border-color
    },
  },
};

export default theme;

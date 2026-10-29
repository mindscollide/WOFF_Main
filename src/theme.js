// antd v6 theme (CSS-in-JS design tokens), in the WOF teal palette.
// Palette pairs (background / text): Primary #035F5C / #FFFFFF,
// Secondary #9DD4D3 / #000000, Hover #D0EFEE / #000000,
// Surface #E8F3F3 / #000000, Danger #FC4343 / #FFFFFF.
const theme = {
  token: {
    colorPrimary: "#035F5C",
    colorBgLayout: "#E8F3F3",
    colorText: "#000000",
    colorError: "#FC4343",
    fontFamily: "'Open Sans', sans-serif",
    // inputs, selects, pickers and buttons are rounded to 8px
    borderRadius: 8,
  },
  components: {
    Table: {
      headerBg: "#9DD4D3",
      headerColor: "#000000",
      headerSplitColor: "transparent", // no column separators in the header
      rowHoverBg: "#D0EFEE",
      borderColor: "transparent", // no grid lines
      cellPaddingBlock: 10,
      cellPaddingInline: 5,
      headerBorderRadius: 10,
    },
    // The sidebar's card look is drawn by sidebar.module.css; these just keep
    // antd's own item colours out of its way.
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "#FFFFFF",
      itemColor: "#000000",
      itemHoverColor: "#035F5C",
      itemSelectedColor: "#000000",
      itemSelectedBg: "#9DD4D3",
      itemHoverBg: "#E8F3F3",
      itemActiveBg: "#E8F3F3",
      itemMarginInline: 0,
      activeBarBorderWidth: 0,
    },
  },
};

export default theme;

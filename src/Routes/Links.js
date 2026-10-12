//System Admin Links
const SystemAdminLinks = [
  {
    menuName: "Setup",
    icon: "icon-setting icon-size-one",
    subMenu: [
      { key: 15, name: "Pending Request", link: "/Admin/NewRequestList" },
      { key: 1, name: "Borrower Type", link: "/Admin/BorrowerType" },
      {
        key: 2,
        name: "Classification of Advances",
        link: "/Admin/ClassificationOfAdvances",
      },
      { key: 3, name: "Business Segment", link: "/Admin/ManagementUnit" },
      {
        key: 4,
        name: "Nature of Charge",
        link: "/Admin/NatureOfCharge",
      },
      {
        key: 5,
        name: "Nature of Security",
        link: "/Admin/NatureOfSecurity",
      },
      {
        key: 6,
        name: "Reason of Write off",
        link: "/Admin/ReasonOfWriteOff",
      },
      {
        key: 7,
        name: "Approval Reasons",
        link: "/Admin/ApprovalReasons",
      },
      {
        key: 8,
        name: "Rejection Reasons",
        link: "/Admin/RejectionReasons",
      },
      { key: 9, name: "Approval Flow", link: "/Admin/ApprovalFlow" },
    ],
  },
  {
    menuName: "Capture Write Off",
    icon: "icon-user icon-size-one",
    subMenu: [
      {
        key: 10,
        name: "Approved Cases",
        link: "/Admin/SystemAdminApprovedCases",
      },
      // {
      //   key: 11,
      //   name: "In-Active Cases",
      //   link: "/Admin/SystemAdminRevertCases",
      // },
      {
        key: 12,
        name: "View In-Active Cases",
        link: "/Admin/ViewRevertCases",
      },
    ],
  },
  // {
  //   menuName: "Audit Trial",
  //   icon: "icon-search-list2 icon-size-one",
  //   subMenu: [
  //     { key: 10, name: "Audit Trial", link: "/Admin/AuditTrail" },
  //     { key: 11, name: "User Audit", link: "/Admin/UserAudit" },
  //   ],
  // },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      {
        key: 13,
        name: "Complete Report Account Wise",
        link: "/Admin/CompleteReports",
      },
      { key: 14, name: "Complete Report Consolidate", link: "/Admin/CompleteReportConsolidate" },
      { key: 17, name: "Credit Policy", link: "/Admin/CreditPolicy" },
      {
        key: 16,
        name: "Balance Sheet Format",
        link: "/Admin/BalanceSheetFormat",
      },
    ],
  },
];
//Manager Links
const ManagerLinks = [
  {
    menuName: "Write Off Cases",
    icon: "icon-user icon-size-one",
    subMenu: [
      {
        key: 1,
        name: "Cases Pending For Approval",
        link: "/Manager/PendingApprovals",
      },
      { key: 2, name: "Approved Cases", link: "/Manager/ListOffApprovedCases" },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      {
        key: 3,
        name: "Complete Report Account Wise",
        link: "/Manager/CompleteReports",
      },
      { key: 4, name: "Complete Report Consolidate", link: "/Manager/CompleteReportConsolidate" },
      { key: 5, name: "Credit Policy", link: "/Manager/CreditPolicy" },
      {
        key: 6,
        name: "Balance Sheet Format",
        link: "/Manager/BalanceSheetFormat",
      },
    ],
  },
];
//Capture Write Off both Manage and DataEntry User
const DataEntryUserLinks = [
  {
    menuName: "Capture Write Off",
    icon: "icon-user icon-size-one",
    subMenu: [
      {
        key: 2,
        name: "Add / Edit Write Off",
        link: "/DataEntryUser/AddWriteOff",
      },
      { key: 1, name: "Cases In Process", link: "/DataEntryUser/ListWriteOff" },

      {
        key: 3,
        name: "Cases Pending For Approval",
        link: "/DataEntryUser/ListOffPendingForApprovals",
      },
      {
        key: 4,
        name: "Approved Cases",
        link: "/DataEntryUser/ListOffApprovedCases",
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      {
        key: 5,
        name: "Complete Report Account Wise",
        link: "/DataEntryUser/CompleteReports",
        style: { width: 1000 },
      },
      { key: 6, name: "Complete Report Consolidate", link: "/DataEntryUser/CompleteReportConsolidate" },
      { key: 7, name: "Credit Policy", link: "/DataEntryUser/CreditPolicy" },
      {
        key: 8,
        name: "Balance Sheet Format",
        link: "/DataEntryUser/BalanceSheetFormat",
      },
    ],
  },
];
export {
  // SecurityAdminLinks,
  SystemAdminLinks,
  ManagerLinks,
  DataEntryUserLinks,
};

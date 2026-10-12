// all routing related data like rendering components and their paths sits here in this file
import {
  SecurityAdminAuditTrail,
  AddWriteOff,
  ListWriteOff,
  ViewWriteOff,
  CompleteReports,
  CreditPolicy,
  BalanceSheetFormat,
  ApprovalFlow,
  ApprovalReasons,
  BorrowerType,
  ClassificationOfAdvances,
  ManagementUnit,
  NatureOfCharge,
  NatureOfSecurity,
  ReasonOfWriteOff,
  RejectionReasons,
  EditApprovedCases,
  ViewRevertCases,
  AddEditUsers,
  CreateEditRole,
  SystemAdminUserAudit,
  SystemAdminAuditTrail,
  PendingApprovals,
  EditWriteOffDetails,
  ListOfPendingCases,
  ListOfApprovedCases,
  NewRequestList,
  SystemAdminApprovedCases,
  SystemAdminRevertCases,
  CompleteReportsConsolidate,
  NotFound,
} from "../Container";
import { 
  // SecurityAdminLinks,
  SystemAdminLinks,
  ManagerLinks,
  DataEntryUserLinks} from "./Links";

const SystemAdminRouteData = [
  { component: NewRequestList, path: "Admin/NewRequestList" },
  { component: BorrowerType, path: "Admin/BorrowerType" },
  { component: ApprovalFlow, path: "Admin/ApprovalFlow" },
  { component: ApprovalReasons, path: "Admin/ApprovalReasons" },
  { component: ClassificationOfAdvances, path: "Admin/ClassificationOfAdvances" },
  { component: ManagementUnit, path: "Admin/ManagementUnit" },
  { component: NatureOfCharge, path: "Admin/NatureOfCharge" },
  { component: NatureOfSecurity, path: "Admin/NatureOfSecurity" },
  { component: ReasonOfWriteOff, path: "Admin/ReasonOfWriteOff" },
  { component: RejectionReasons, path: "Admin/RejectionReasons" },
  { component: ViewWriteOff, path: "Admin/ViewWriteOff" },
  // { component: SystemAdminAuditTrail, path: "Admin/AuditTrail" },
  // { component: SystemAdminUserAudit, path: "Admin/UserAudit" },
  { component: CompleteReports, path: "Admin/CompleteReports" },
  { component: CompleteReportsConsolidate, path: "Admin/CompleteReportConsolidate" },
  { component: CreditPolicy, path: "Admin/CreditPolicy" },
  { component: BalanceSheetFormat, path: "Admin/BalanceSheetFormat" },
  { component: SystemAdminApprovedCases, path: "Admin/SystemAdminApprovedCases" },
  // { component: SystemAdminRevertCases, path: "Admin/SystemAdminRevertCases" },
  { component: ViewWriteOff, path: "Admin/ViewWriteOff" },
  { component: EditWriteOffDetails, path: "Admin/EditWriteOffDetails" },
  { component: ViewRevertCases, path: "Admin/ViewRevertCases" },
  { component: NotFound, path: "Admin/404" },

]
const ManagerRouteData = [
  { component: PendingApprovals, path: "Manager/PendingApprovals" },
  { component: ViewWriteOff, path: "Manager/ViewWriteOff" },
  { component: CompleteReports, path: "Manager/CompleteReports" },
  { component: CompleteReportsConsolidate, path: "Manager/CompleteReportConsolidate" },
  { component: CreditPolicy, path: "Manager/CreditPolicy" },
  { component: BalanceSheetFormat, path: "Manager/BalanceSheetFormat" },
  { component: ListOfApprovedCases, path: "Manager/ListOffApprovedCases" },
]
const DataEntryUserRouteData = [
  { component: AddWriteOff, path: "DataEntryUser/AddWriteOff" },
  { component: ListWriteOff, path: "DataEntryUser/ListWriteOff" },
  { component: ViewWriteOff, path: "DataEntryUser/ViewWriteOff" },
  { component: EditWriteOffDetails, path: "DataEntryUser/EditWriteOffDetails" },
  { component: ListOfPendingCases, path: "DataEntryUser/ListOffPendingForApprovals" },
  { component: ListOfApprovedCases, path: "DataEntryUser/ListOffApprovedCases" },
  { component: CompleteReports, path: "DataEntryUser/CompleteReports" },
  { component: CompleteReportsConsolidate, path: "DataEntryUser/CompleteReportConsolidate" },
  { component: CreditPolicy, path: "DataEntryUser/CreditPolicy" },
  { component: BalanceSheetFormat, path: "DataEntryUser/BalanceSheetFormat" },
]
const UserSelection = (token,role)=>{
  let Title = ''
  let UserRoleId = ''
  let SidebarData = ''
  let MainMenu = ''
  let Notification = ''
  if(token && role===2){
    Title = "WOFF Data Centralization & MIS Capturing"
    UserRoleId =role
    SidebarData = SystemAdminLinks
    MainMenu = SystemAdminRouteData
    Notification = true;
  }
  if(token && role===3){
    Title = "WOFF Data Centralization & MIS Capturing"
    UserRoleId = role
    SidebarData = ManagerLinks
    MainMenu = ManagerRouteData
    Notification = true;
  }
  if(token && role===4){
    Title = "WOFF Data Centralization & MIS Capturing"
    UserRoleId = role
    SidebarData = DataEntryUserLinks
    MainMenu = DataEntryUserRouteData
    Notification = null;
  }
  return{
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification
  }
}
export {
  UserSelection
}
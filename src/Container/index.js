//>>>>Exports :
// Login Page
export { default as Login } from "./Authentication/Login/Login";
export { default as SignUp } from "./Authentication/SignUp/SignUp";
// Dashboard
export { default as Dashboard } from "./Dashboard/dashboard";
// Audit Trial
export { default as SecurityAdminAuditTrail } from "../Container/Admin/SecurityAdmin/AuditTrial/audit-trial";
export { default as SystemAdminAuditTrail } from "../Container/Admin/SystemAdmin/AuditTrial/audit-trial";
export { default as SystemAdminApprovedCases } from "../Container/Admin/SystemAdmin/CaptureWriteOff/ApprovedCases/approved-cases";
export { default as SystemAdminRevertCases } from "../Container/Admin/SystemAdmin/CaptureWriteOff/RevertCases/revert-cases";
export { default as ViewRevertCases } from "../Container/Admin/SystemAdmin/CaptureWriteOff/ViewRevertCases/viewrevertcases";
export { default as EditApprovedCases } from "../Container/Admin/SystemAdmin/CaptureWriteOff/EditWriteOffApproved/edit-approved-cases";
// User Audit 
// export { default as SecurityAdminAuditTrail } from "../Container/Admin/SecurityAdmin/AuditTrial/audit-trial";
export { default as SystemAdminUserAudit } from "../Container/Admin/SystemAdmin/UserAudit/user-audit";
export { default as NewRequestList } from "../Container/Admin/SystemAdmin/NewRequestList/new-request-list";
// Capture Write Off

export { default as AddWriteOff } from "./CommonPages/CaptureWriteOff/AddWriteOff/add-write-off";
export { default as ListWriteOff } from "./CommonPages/CaptureWriteOff/ListWriteOff/List-write-off";
export { default as ViewWriteOff } from "./CommonPages/CaptureWriteOff/ViewWriteOff/view-write-off";
export { default as EditWriteOffDetails} from "./CommonPages/CaptureWriteOff/EditWriteOff/edit-details";
export { default as ListOfPendingCases} from "./CommonPages/CaptureWriteOff/ListPendingCases/ListOfPendingCases";
export { default as ListOfApprovedCases} from "./CommonPages/CaptureWriteOff/ListApprovedCases/ListApprovalCases";
// Reports
export { default as PendingApprovals} from "./Manager/PendingApprovals/PendingApprovals";
export { default as CompleteReports } from "./Manager/Reports/CompleteReports/complete-reports";
export { default as CompleteReportsConsolidate } from "./Manager/Reports/CompleteReportConsolidate/Complete_Report_Consolidate";
export { default as CreditPolicy } from "./Manager/Reports/CreditPolicy/credit-policy";
export { default as BalanceSheetFormat} from "./Manager/Reports/BalanceSheetFormat/balancesheet-format";
// Setup
export { default as ApprovalFlow } from "./Admin/SystemAdmin/Setup/ApprovalFlow/approve-flow";
export { default as ApprovalReasons } from "./Admin/SystemAdmin/Setup/ApprovalReasons/approval-reasons";
export { default as BorrowerType } from "./Admin/SystemAdmin/Setup/BorrowerType/borrower-type";
export { default as ClassificationOfAdvances } from "./Admin/SystemAdmin/Setup/ClassificationOfAdvances/classification-of-advances";
export { default as ManagementUnit } from "./Admin/SystemAdmin/Setup/ManagementUnit/management-unit";
export { default as NatureOfCharge } from "./Admin/SystemAdmin/Setup/NatureOfCharge/nature-of-charge";
export { default as NatureOfSecurity } from "./Admin/SystemAdmin/Setup/NatureOfSecurity/nature-of-security";
export { default as ReasonOfWriteOff } from "./Admin/SystemAdmin/Setup/ReasonOfWriteOff/reason-of-write-off";
export { default as RejectionReasons } from "./Admin/SystemAdmin/Setup/RejectionReasons/rejection-reasons";
// User Management
export { default as AddEditUsers } from "./Admin/SecurityAdmin/UserManagement/AddEditUsers/add-edit-users";
export { default as CreateEditRole } from "./Admin/SecurityAdmin/UserManagement/CreateEditRole/create-edit-role";

// 404 Page Not Found
export { default as NotFound }  from "./404/404"
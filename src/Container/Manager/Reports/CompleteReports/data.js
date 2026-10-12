// this is the columns use in table
import {
  DateDisplayFormat,
  CommaFormter,
} from "../../../../Common/Functions/date-formatter";
export const columns = [
  {
    title: "Customer / Prime Code",
    dataIndex: "misysCode",
    key: "misysCode",
    align: "center",
    width: "1%",
  },
  {
    title: "IParty ID",
    dataIndex: "iparty",
    key: "iparty",
    align: "center",
    width: "1%",
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    key: "accountNumber",
    align: "center",
    width: "1%",
  },
  {
    title: "WOF Code",
    dataIndex: "wofCode",
    key: "wofCode",
    align: "center",
    width: "1%",
  },
  {
    title: "Name of the Borrower",
    dataIndex: "borrowerName",
    key: "borrowerName",
    align: "center",
    width: "2%",
  },
  {
    title: "Address of the Borrower",
    dataIndex: "addressOfBorrower",
    key: "addressOfBorrower",
    align: "center",
    width: "2%",
  },
  {
    title: "Full Name of Proprietor / Directors / Partners",
    dataIndex: "allDirectorsNamesDelimited",
    key: "allDirectorsNamesDelimited",
    align: "center",
    width: "2%",
  },
  {
    title: "CNIC of Individual / Proprietor / Directors / Partners",
    dataIndex: "allDirectorsCNICDelimited",
    key: "allDirectorsCNICDelimited",
    align: "center",
    width: "2%",
  },
  {
    title: "Father Name Individual / Proprietor / Directors / Partners",
    dataIndex: "allDirectorsFatherNameDelimited",
    key: "allDirectorsFatherNameDelimited",
    align: "center",
    width: "2%",
  },
  {
    title: "Address of Individual / Proprietor / Directors / Partners",
    dataIndex: "allDirectorsAddressDelimited",
    key: "allDirectorsAddressDelimited",
    align: "center",
    width: "4%",
  },
  {
    title: "Status of Business",
    dataIndex: "statusOfBusiness",
    key: "statusOfBusiness",
    align: "center",
    width: "2%",
  },
  {
    title: "Branch Code",
    dataIndex: "branchCode",
    key: "branchCode",
    align: "center",
    width: "2%",
    // render: (text, record) => {
    //   if (record.accountDetails != null) {
    //     let rawData1 = record.accountDetails;
    //     return rawData1.map((item, index) => {
    //       return (
    //         <>
    //           <span>{item.branchCode}</span>
    //           <br />
    //         </>
    //       );
    //     });
    //   } else {
    //     return " ";
    //   }
    // },
  },
  {
    title: "Name of the Branch",
    dataIndex: "branchName",
    key: "branchName",
    align: "center",
    width: "2%",
    // render: (text, record) => {
    //   if (record.accountDetails != null) {
    //     let rawData1 = record.accountDetails;
    //     return rawData1.map((item, index) => {
    //       return (
    //         <>
    //           <span>{item.branchName}</span>
    //           <br />
    //         </>
    //       );
    //     });
    //   } else {
    //     return " ";
    //   }
    // },
  },
  {
    title: "Region Code",
    dataIndex: "regionCode",
    key: "regionCode",
    align: "center",
    width: "2%",
  },
  {
    title: "Region Name",
    dataIndex: "regionName",
    key: "regionName",
    align: "center",
    width: "2%",
  },
  {
    title: "Sundry Analysis Code",
    dataIndex: "saCode",
    key: "saCode",
    align: "center",
    width: "2%",
  },
  {
    title: "Sundry Analysis Description ",
    dataIndex: "saDescription",
    key: "saDescription",
    align: "center",
    width: "2%",
  },
  {
    title: "Nature of Finance Code",
    dataIndex: "natureOfFinanceCode",
    key: "natureOfFinanceCode",
    align: "center",
    width: "2%",
  },
  {
    title: "Nature of Finance",
    dataIndex: "natureOfFinance",
    key: "natureOfFinance",
    align: "center",
    width: "2%",
  },
  {
    title: "Nature of Security",
    dataIndex: "natureOfSecurity",
    key: "natureOfSecurity",
    align: "center",
    width: "2%",
  },
  {
    title: "Nature of Charge",
    dataIndex: "natureOfCharge",
    key: "natureOfCharge",
    align: "center",
    width: "2%",
  },
  {
    title: "Forced Sale Value of Security",
    dataIndex: "forcedValueOfSecurity",
    key: "forcedValueOfSecurity",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Date of Valuation",
    dataIndex: "dateOfValuation",
    key: "dateOfValuation",
    align: "center",
    width: "1%",
    render: (text) => {
      if (text !== "" && text !== "18000101" && text !== null) {
        // return DateDisplayFormat(text);
        return text;
      } else {
        return "";
      }
    },
  },
  // {
  //   title: "Nature of Charge",
  //   dataIndex: "natureOfCharge",
  //   key: "natureOfCharge",
  //   align: "center",
  //   width: "2%",
  // },
  {
    title: "Sanction Date",
    dataIndex: "sanctionDate",
    key: "sanctionDate",
    align: "center",
    width: "1%",
    render: (text) => {
      if (text !== "" && text !== "18000101" && text !== null) {
        // return DateDisplayFormat(text);
        return text;
      } else {
        return "";
      }
    },
  },
  {
    title: "Sanction Amount",
    dataIndex: "sanctionAmount",
    key: "sanctionAmount",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Outstanding Principal",
    dataIndex: "outstandingLiabilitiesOutstandingPrincipal",
    key: "outstandingLiabilitiesOutstandingPrincipal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },

  {
    title: "Outstanding Mark-up Debited",
    dataIndex: "outstandingLiabilitiesOutstandingMarkupDebited",
    key: "outstandingLiabilitiesOutstandingMarkupDebited",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Outstanding Mark-up Undebited",
    dataIndex: "outstandingLiabilitiesOutstandingMarkupUnDebited",
    key: "outstandingLiabilitiesOutstandingMarkupUnDebited",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Other Charges",
    dataIndex: "outstandingLiabilitiesOtherCharges",
    key: "outstandingLiabilitiesOtherCharges",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Penal Interest",
    dataIndex: "outstandingLiabilitiesPenalInterest",
    key: "outstandingLiabilitiesPenalInterest",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Total",
    dataIndex: "outstandingLiabilitiesTotal",
    key: "outstandingLiabilitiesTotal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Approval Number",
    dataIndex: "approvalNumber",
    key: "approvalNumber",
    align: "center",
    width: "1%",
  },
  {
    title: "Date of Approval",
    dataIndex: "dateOfApproval",
    key: "dateOfApproval",
    align: "center",
    width: "1%",
    render: (text) => {
      if (text !== "" && text !== "18000101" && text !== null) {
        // return DateDisplayFormat(text);
        return text;
      } else {
        return "";
      }
    },
  },
  {
    title: "Date of Write Off",
    dataIndex: "dateOfWriteOff",
    key: "dateOfWriteOff",
    align: "center",
    width: "1%",
    render: (text) => {
      if (text !== "" && text !== "18000101" && text !== null) {
        // return DateDisplayFormat(text);
        return text;
      } else {
        return "";
      }
    },
  },
  {
    title: "Amount Compromised (Principal)",
    dataIndex: "amountRealizedByAmountCompromised",
    key: "amountRealizedByAmountCompromised",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Debited Recovery",
    dataIndex: "amountRealizedByDebitedMarkup",
    key: "amountRealizedByDebitedMarkup",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Undebited Recovery",
    dataIndex: "amountRealizedByUndebitedRecovery",
    key: "amountRealizedByUndebitedRecovery",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Other Charges",
    dataIndex: "amountRealizedByOtherCharges",
    key: "amountRealizedByOtherCharges",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Penal Interest",
    dataIndex: "amountRealizedByPenalInterest",
    key: "amountRealizedByPenalInterest",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Total",
    dataIndex: "amountRealizedByTotal",
    key: "amountRealizedByTotal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  // {
  //   title: "Other Charges Recovered",
  //   dataIndex: "amountRealizedByOtherCharges",
  //   key: "amountRealizedByOtherCharges",
  //   align: "center",
  //   width: "1%",
  //   render: (text) => CommaFormter(text),
  // },
  // {
  //   title: "Penal Interest Recovered",
  //   dataIndex: "amountRealizedByPenalInterest",
  //   key: "amountRealizedByPenalInterest",
  //   align: "center",
  //   width: "1%",
  //   render: (text) => CommaFormter(text),
  // },
  // {
  //   title: "Total",
  //   dataIndex: "recoveryAfterWriteOffTotal",
  //   key: "recoveryAfterWriteOffTotal",
  //   align: "center",
  //   width: "1%",
  //   render: (text) => CommaFormter(text),
  // },
  {
    title: "Sale of Security",
    dataIndex: "amountRealizedBySaleOfSecurity",
    key: "amountRealizedBySaleOfSecurity",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Write Off Principal",
    dataIndex: "amountWrittenOffWriteOffPrincipal",
    key: "amountWrittenOffWriteOffPrincipal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Interest Reversal",
    dataIndex: "amountWrittenOffInterestPrincipal",
    key: "amountWrittenOffInterestPrincipal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Waiver of Undebited Mark-Up",
    dataIndex: "amountWrittenOffWaiverUndebitedMarkup",
    key: "amountWrittenOffWaiverUndebitedMarkup",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Other Charges",
    dataIndex: "amountWrittenOffOtherCharges",
    key: "amountWrittenOffOtherCharges",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Penal Interest",
    dataIndex: "amountWrittenOffPenalInterest",
    key: "amountWrittenOffPenalInterest",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Total Impact",
    dataIndex: "amountWrittenOffTotalImpact",
    key: "amountWrittenOffTotalImpact",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  // {
  //   title: "Classification",
  //   dataIndex: "chargeOffType",
  //   key: "chargeOffType",
  //   align: "center",
  //   width: "2%",
  // },
  {
    title: "Business Segment",
    dataIndex: "businessUnit",
    key: "businessUnit",
    align: "center",
    width: "1%",
  },
  {
    title: "Reason for Write Off",
    dataIndex: "reasonOfWriteOff",
    key: "reasonOfWriteOff",
    align: "center",
    width: "2%",
  },
  {
    title: "Settlement/Book Cleaning",
    dataIndex: "settlementCode",
    key: "settlementCode",
    align: "center",
    width: "2%",
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
    align: "center",
    width: "2%",
  },
  {
    title: "Principal",
    dataIndex: "recoveryAfterWriteOffPrincipal",
    key: "recoveryAfterWriteOffPrincipal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Nominated (Debited Mark-up)",
    dataIndex: "recoveryAfterWriteOffNominated",
    key: "recoveryAfterWriteOffNominated",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Non-Accrual (Un-Debited Mark-up)",
    dataIndex: "recoveryAfterWriteOffNonAccural",
    key: "recoveryAfterWriteOffNonAccural",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Other Charges",
    dataIndex: "recoveryAfterWriteOffOtherCharges",
    key: "recoveryAfterWriteOffOtherCharges",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Penal Interest",
    dataIndex: "recoveryAfterWriteOffInterest",
    key: "recoveryAfterWriteOffInterest",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Total",
    dataIndex: "recoveryAfterWriteOffTotal",
    key: "recoveryAfterWriteOffTotal",
    align: "center",
    width: "1%",
    render: (text) => CommaFormter(text),
  },
  {
    title: "Date Of Recovery",
    dataIndex: "recoveryDate",
    key: "recoveryDate",
    align: "center",
    width: "1%",
    render: (text) => {
      if (text !== "" && text !== "18000101" && text !== null) {
        // return DateDisplayFormat(text);
        return text;
      } else {
        return "";
      }
    },
  },
  {
    title:
      "Details of Securities obtained at the time of initial approval of loan",
    dataIndex: "securitiesAtInitialApproval",
    key: "securitiesAtInitialApproval",
    align: "center",
    width: "3%",
  },
  {
    title: "Change in Securities held by the bank during the loan period",
    dataIndex: "securitiesChangesHeldByBankDuringLoanPeriod",
    key: "securitiesChangesHeldByBankDuringLoanPeriod",
    align: "center",
    width: "3%",
  },
  {
    title:
      "Details of Securities held by the bank at the time of approving write off case",
    dataIndex: "securitiesHeldByBankAtApproval",
    key: "securitiesHeldByBankAtApproval",
    align: "center",
    width: "3%",
  },
  {
    title:
      "Whether pledge stocks held by the bank was lifted by the borrower? (Yes/No)",
    dataIndex: "pledgedStocksLiftedByBorrower",
    key: "pledgedStocksLiftedByBorrower",
    align: "center",
    width: "1%",
  },
  {
    title:
      "Whether Securities held by the bank was not perfect at ab-initio level? (Yes/No)",
    dataIndex: "securitiesHeldByBankAbInitio",
    key: "securitiesHeldByBankAbInitio",
    align: "center",
    width: "1%",
  },
  {
    title: "Whether borrower was a willfull defaulter? (Yes/No)",
    dataIndex: "borrowerWillfullDefaulter",
    key: "borrowerWillfullDefaulter",
    align: "center",
    width: "1%",
  },
  {
    title:
      "After Write Off, Do bank surrender/cease the right of recovery? (Yes/No)",
    dataIndex: "bankSurrenderRightOfRecovery",
    key: "bankSurrenderRightOfRecovery",
    align: "center",
    width: "1%",
  },
];

const a = {
  accountNumber: "123456789",
  allDirectorsAddressDelimited: "Address of Ahmed Sahab;",
  allDirectorsCNICDelimited: "111111111111;",
  allDirectorsFatherNameDelimited: "dsfasdasdsz;",
  allDirectorsNamesDelimited: ";",
  amountRealizedByAmountCompromised: 0,
  amountRealizedBySaleOfSecurity: 56,
  amountRealizedByTotal: 56,
  amountRealizedByUndebitedRecovery: 0,
  amountWrittenOffInterestPrincipal: 0,
  amountWrittenOffOtherCharges: 0,
  amountWrittenOffPenalInterest: 0,
  amountWrittenOffTotalImpact: 13,
  amountWrittenOffWaiverUndebitedMarkup: 6,
  amountWrittenOffWriteOffPrincipal: 7,
  approvalNumber: "6000",
  bankSurrenderRightOfRecovery: "Yes",
  borrowerName: "Ahmed Sahab",
  borrowerWillfullDefaulter: "Yes",
  branchCode: "8765",
  branchName: "Gujjar Nala",
  businessUnit: "Remedial Assets",
  chargeOffType: "Write Off",
  classification: "Loss",
  dateOfApproval: "20211015",
  dateOfValuation: "20211008",
  dateOfWriteOff: "20211002",
  forcedValueOfSecurity: 8765,
  misysCode: "124782",
  natureOfCharge: "Equitable Mortgage",
  natureOfFinance: "FC Description",
  natureOfSecurity: "Stock",
  outstandingLiabilitiesOtherCharges: 0,
  outstandingLiabilitiesOutstandingMarkupDebited: 0,
  outstandingLiabilitiesOutstandingMarkupUnDebited: 0,
  outstandingLiabilitiesOutstandingPrincipal: 0,
  outstandingLiabilitiesPenalInterest: 0,
  outstandingLiabilitiesTotal: 0,
  pledgedStocksLiftedByBorrower: "No",
  reasonOfWriteOff:
    "ADVANCE BECOME UNSECURED DUE TO HEAVY FALL IN THE SECURITY VALUE AND BORROWER/GUARANTOR HAVE NOT SUFFICIENT FUNDS/ASSETS",
  recoveryAfterWriteOffInterest: 0,
  recoveryAfterWriteOffOtherCharges: 10,
  recoveryAfterWriteOffPrincipal: 9,
  recoveryAfterWriteOffTotal: 19,
  sanctionAmount: 8765,
  sanctionDate: "20211013",
  securitiesAtInitialApproval: "222",
  securitiesChangesHeldByBankDuringLoanPeriod: "qwewqe",
  securitiesHeldByBankAbInitio: "Yes",
  securitiesHeldByBankAtApproval: "qwewqe",
  serialNo: 20051,
  settlementCode: "FC",
  statusOfBusiness: "Individual",
  wofCode: "WOC2786",
};

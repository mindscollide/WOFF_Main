import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  SelectBox,
  Button,
  Notification,
} from "../../Elements";
import { Typography, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetBorrowerType } from "../../../store/actions/setup-forms-actions";
import { directorTypeOptions } from "../../../Common/SelectFieldOption/select-field-option";
import { EditWriteOff } from "../../../store/actions/write-off-actions";
import { useNavigate } from "react-router";
import { PlusOutlined as AddIcon, CloseOutlined as ClearOutlinedIcon } from "@ant-design/icons";
const EditRecord = ({ setGoToSave, goToSave, PreviousPageDetails }) => {
  let roleID = JSON.parse(localStorage.getItem("role"));
  console.log("role", roleID, typeof roleID);
  const { Title } = Typography;
  const navigate = useNavigate();
  const setupForms = useSelector((state) => state.setupForms);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const dispatch = useDispatch();
  let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  const [sectionIndex, setSectionIndex] = useState(null);
  const [saveValue, setsaveValue] = useState(null);
  const [disable1, setdisable1] = useState(false);
  const [error, setError] = useState(false);
  const [InformationSection, setInformationSection] = useState({
    MisysCode: "",
    NPLCode: "",
    BorrowerName: "",
    BorrowerTypeID: "",
    WOFCode: "",
  });
  const sectionIndexHandler = (ind) => {
    setSectionIndex(ind);
  };
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([
    {
      DirectorTypeID: null,
      DirectorName: null,
      CNIC: null,
      FatherHusband: null,
      Address: null,
    },
  ]);
  const CNIChandler = (e) => {
    let array;
    let name = e.target.name;
    let value = e.target.value;
    if (!value == "") {
      if (Number(value)) {
        array = [...sponsorOwnerDetail];
        array[sectionIndex][name] = value;
        setSponsorOwnerDetail(array);
      } else {
        array = [...sponsorOwnerDetail];
        array[sectionIndex][name] = "";
        setSponsorOwnerDetail(array);
        setOpen({
          ...open,
          open: true,
          message: "Please Enter Valid CNIC Number",
        });
      }
    }
  };
  const sponsorOwnerDetailHandler = (e, val) => {
    let array;
    let id = e.target.id;
    let name = e.target.name;
    let value = e.target.value;
    var letters = /^[a-zA-Z\s]*$/g;
    if (id.includes("DirectorTypeID")) {
      array = [...sponsorOwnerDetail];
      array[sectionIndex]["DirectorTypeID"] = val;
      setSponsorOwnerDetail(array);
    } else if (name === "DirectorName" || name === "FatherHusband") {
      if (value.match(letters)) {
        array = [...sponsorOwnerDetail];
        array[sectionIndex][name] = value;
        setSponsorOwnerDetail(array);
      }
    } else {
      console.log("hghghghghg", name);
      array = [...sponsorOwnerDetail];
      array[sectionIndex][name] = value;
      setSponsorOwnerDetail(array);
    }
  };
  const addNewRecordHandler = () => {
    let previousArray = [...sponsorOwnerDetail];
    if (previousArray.length == 1) {
      if (
        previousArray[0].DirectorTypeID == null ||
        previousArray[0].DirectorName == null ||
        previousArray[0].CNIC == null ||
        previousArray[0].FatherHusband == null ||
        previousArray[0].Address == null
      ) {
        console.log("in if block: ", previousArray);
        setError(true);
      } else {
        setError(false);
        previousArray.push({
          DirectorTypeID: null,
          DirectorName: null,
          CNIC: null,
          FatherHusband: null,
          Address: null,
        });
        setSponsorOwnerDetail(previousArray);
      }
    } else if (previousArray.length > 1) {
      if (
        previousArray[previousArray.length - 1].DirectorTypeID == null ||
        previousArray[previousArray.length - 1].DirectorName == null ||
        previousArray[previousArray.length - 1].CNIC == null ||
        previousArray[previousArray.length - 1].FatherHusband == null ||
        previousArray[previousArray.length - 1].Address == null
      ) {
        console.log("in if block: ", previousArray);
        setError(true);
      } else {
        setError(false);
        previousArray.push({
          DirectorTypeID: null,
          DirectorName: null,
          CNIC: null,
          FatherHusband: null,
          Address: null,
        });
        setSponsorOwnerDetail(previousArray);
      }
    }
  };
  const removeNewRecordHandler = (ind) => {
    let previousArray = [...sponsorOwnerDetail];
    previousArray.splice(ind, 1);
    setSponsorOwnerDetail(previousArray);
  };
  const SaveAll = (e) => {
    e.preventDefault();
    // setSponsorOwnerDetail([{ ...sponsorOwnerDetail }]);
    let finalSponser = sponsorOwnerDetail.map((item) => {
      if (item.CNIC.length == 13) {
        return true;
      } else {
        return false;
      }
    });
    var index = finalSponser.findIndex((i) => i == false);
    console.log(finalSponser, index);
    if (index == -1) {
      let SponserDetail = sponsorOwnerDetail.map((item) => {
        if (item.DirectorTypeID == "Sponsor") {
          item.DirectorTypeID = 1;
        } else if (item.DirectorTypeID == "Nominee Director") {
          item.DirectorTypeID = 2;
        } else if (item.DirectorTypeID == "Other") {
          item.DirectorTypeID = 3;
        } else if (item.DirectorTypeID == "Partner") {
          item.DirectorTypeID = 4;
        } else if (item.DirectorTypeID == "Director") {
          item.DirectorTypeID = 5;
        } else if (item.DirectorTypeID == "Individual") {
          item.DirectorTypeID = 6;
        } else if (item.DirectorTypeID == "Proprietor") {
          item.DirectorTypeID = 7;
        } else if (item.DirectorTypeID == "Guarantor") {
          item.DirectorTypeID = 8;
        }
        return item;
      });
      PreviousPageDetails.SponsorOwnerDetail = SponserDetail;
      PreviousPageDetails.UserID = UserDetails.userID;
      PreviousPageDetails.SendForApproval = saveValue;
      if (PreviousPageDetails.AdditionalDetails.AdvanceClassificationID == 0) {
        PreviousPageDetails.AdditionalDetails.AdvanceClassificationID = 1;
      }
      console.log("ViewWriteOff", PreviousPageDetails);
      dispatch(EditWriteOff(PreviousPageDetails, navigate, setOpen));
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter Valid CNIC Number",
      });
    }
  };
  useEffect(() => {
    // setupForms.BorrowerTypes
    let index = setupForms.BorrowerTypes.findIndex(
      (x) => x.id === PreviousPageDetails.BorrowerTypeID
    );
    setInformationSection({
      ...InformationSection,
      MisysCode: PreviousPageDetails.MisysCode
        ? PreviousPageDetails.MisysCode
        : null,
      NPLCode: PreviousPageDetails.NPLCode ? PreviousPageDetails.NPLCode : null,
      BorrowerName: PreviousPageDetails.BorrowerName
        ? PreviousPageDetails.BorrowerName
        : null,
      BorrowerTypeID: setupForms.BorrowerTypes[index].title
        ? setupForms.BorrowerTypes[index].title
        : null,
      WOFCode: PreviousPageDetails.WOFCode ? PreviousPageDetails.WOFCode : null,
    });
  }, [PreviousPageDetails]);
  useEffect(() => {
    dispatch(GetBorrowerType());
  }, []);
  useEffect(() => {
    if (
      InformationSection.BorrowerTypeID !== null &&
      PreviousPageDetails.SponsorOwnerDetail.length === 0
    ) {
      setSponsorOwnerDetail([
        {
          DirectorTypeID: null,
          DirectorName: null,
          CNIC: null,
          FatherHusband: null,
          Address: null,
        },
      ]);
    } else {
      PreviousPageDetails.SponsorOwnerDetail.map((item) => {
        // item.DirectorTypeID = "Director";
        if (item.DirectorTypeID == 1) {
          item.DirectorTypeID = "Sponsor";
        } else if (item.DirectorTypeID == 2) {
          item.DirectorTypeID = "Nominee Director";
        } else if (item.DirectorTypeID == 3) {
          item.DirectorTypeID = "Other";
        } else if (item.DirectorTypeID == 4) {
          item.DirectorTypeID = "Partner";
        } else if (item.DirectorTypeID == 5) {
          item.DirectorTypeID = "Director";
        } else if (item.DirectorTypeID == 6) {
          item.DirectorTypeID = "Individual";
        } else if (item.DirectorTypeID == 7) {
          item.DirectorTypeID = "Proprietor";
        } else if (item.DirectorTypeID == 8) {
          item.DirectorTypeID = "Guarantor";
        }
      });
      setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);

      // if (InformationSection.BorrowerTypeID === "Individual") {
      //   PreviousPageDetails.SponsorOwnerDetail.map((item) => {
      //     item.DirectorTypeID = "Individual";
      //     item.Address = PreviousPageDetails.AddressOfBorrower;
      //   });
      //   setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);
      //   setdisable1(true);
      // } else if (InformationSection.BorrowerTypeID === "Proprietorship") {
      //   PreviousPageDetails.SponsorOwnerDetail.map((item) => {
      //     item.DirectorTypeID = "Proprietor";
      //     item.Address = PreviousPageDetails.AddressOfBorrower;
      //     return item;
      //   });
      //   setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);
      //   setdisable1(true);
      // } else if (InformationSection.BorrowerTypeID === "Partnership") {
      //   PreviousPageDetails.SponsorOwnerDetail.map((item) => {
      //     item.DirectorTypeID = "Partner";
      //   });
      //   setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);
      // } else if (
      //   InformationSection.BorrowerTypeID === "Pvt. Ltd. Company" ||
      //   InformationSection.BorrowerTypeID === "Private Limited Company" ||
      //   InformationSection.BorrowerTypeID === "Public Limited Company" ||
      //   InformationSection.BorrowerTypeID === "Public Limited" ||
      //   InformationSection.BorrowerTypeID === "Public Ltd. Company"
      // ) {
      //   PreviousPageDetails.SponsorOwnerDetail.map((item) => {
      //     item.DirectorTypeID = "Director";
      //   });
      //   setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);
      // } else if (
      //   InformationSection.BorrowerTypeID === "Public Sector Enterprises"
      // ) {
      //   PreviousPageDetails.SponsorOwnerDetail.map((item) => {
      //     item.DirectorTypeID = "Sponsor";
      //   });
      //   setSponsorOwnerDetail(PreviousPageDetails.SponsorOwnerDetail);
      // }
    }
  }, [InformationSection]);
  console.log(
    "ViewWriteOff onNext page PreviousPageDetails",
    PreviousPageDetails
  );
  console.log(
    "ViewWriteOff onNext page sponsorOwnerDetail",
    PreviousPageDetails.SponsorOwnerDetail
  );
  return (
    <>
      <form onSubmit={SaveAll}>
        <div style={{ marginTop: "20px" }} />
        <Row gutter={16}></Row>
        <Paper padding="2">
          <Row gutter={16}>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                label="Misys Customer Code"
                disable
                value={InformationSection.MisysCode}
                fullWidth
                textLength={300}
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                label="WOF Code"
                disable
                value={InformationSection.WOFCode}
                fullWidth
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                label="Borrower NPL Code"
                value={InformationSection.NPLCode}
                fullWidth
                textLength={7}
                disable
              />
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <TextField
                label="Borrower Name"
                value={InformationSection.BorrowerName}
                fullWidth
                textLength={300}
                disable
              />
            </Col>
            <Col lg={6} md={6} sm={24} xs={24}>
              <TextField
                label="Borrower Type"
                value={InformationSection.BorrowerTypeID}
                fullWidth
                textLength={300}
                disable
              />
            </Col>
          </Row>
        </Paper>
        <Title level={2}>Sponsor / Owner Details</Title>
        <div style={{ marginTop: "20px" }} />
        {sponsorOwnerDetail &&
          sponsorOwnerDetail.map((item, ind) => (
            <div key={ind}>
              <Paper padding="2">
                <div align="right">
                  {ind > 0 && (
                    <i
                      className="icon-trash icon-size-one pdfRed"
                      style={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => removeNewRecordHandler(ind)}
                    />
                  )}
                </div>
                <Row gutter={16}>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <SelectBox
                      size="small"
                      label="Director Type"
                      change={sponsorOwnerDetailHandler}
                      value={item.DirectorTypeID}
                      name="DirectorTypeID"
                      disable={disable1 ? disable1 : false}
                      option={directorTypeOptions}
                      focus={() => sectionIndexHandler(ind)}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="Name of Proprietor/Director/Partner"
                      fullWidth
                      textLength={300}
                      change={sponsorOwnerDetailHandler}
                      value={item.DirectorName}
                      name="DirectorName"
                      focus={() => sectionIndexHandler(ind)}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="CNIC"
                      required
                      fullWidth
                      textLength={13}
                      change={CNIChandler}
                      value={item.CNIC}
                      minLength={13}
                      name="CNIC"
                      focus={() => sectionIndexHandler(ind)}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="Father / Husband Name"
                      required
                      fullWidth
                      textLength={300}
                      change={sponsorOwnerDetailHandler}
                      value={item.FatherHusband}
                      name="FatherHusband"
                      focus={() => sectionIndexHandler(ind)}
                    />
                  </Col>
                  <Col lg={24} md={24} sm={24} xs={24} align="center">
                    <div style={{ marginTop: "15px" }} />
                    <TextField
                      multiline
                      rows={5}
                      label="Personal Address"
                      fullWidth
                      change={sponsorOwnerDetailHandler}
                      value={item.Address}
                      name="Address"
                      focus={() => sectionIndexHandler(ind)}
                    />
                  </Col>
                </Row>
              </Paper>
              <div style={{ marginBottom: "25px" }} />
            </div>
          ))}

        <div style={{ marginTop: "25px" }} />
        <Col md={24} lg={24} sm={24} align="center">
          <Button
            text="Add Record"
            icon={<AddIcon />}
            applyClass="btnSecondarySolid"
            size="large"
            click={addNewRecordHandler}
            disableBtn={disable1}
          />
        </Col>
        <div style={{ marginTop: "25px" }} />
        <Row gutter={16} justify="center">
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Previous"
              icon={<i className="icon-arrow-left icon-size-one"></i>}
              applyClass="buttonYellow"
              size="large"
              click={() => setGoToSave(!goToSave)}
            />
          </Col>
          <Col lg={4} md={4} sm={24}>
            <Button
              text="Save"
              type="submit"
              icon={<i className="icon-save icon-size-one"></i>}
              applyClass="buttonPrimaryLarge"
              size="large"
              click={() => setsaveValue(1)}
            />
          </Col>
          {roleID != undefined && roleID === 2 ? null : (
            <Col lg={8} md={8} sm={24}>
              <Button
                text="Save & Send For Approval"
                type="submit"
                icon={<i className="icon-sent icon-size-one"></i>}
                applyClass="buttonPrimary2"
                size="large"
                click={() => setsaveValue(2)}
              />
            </Col>
          )}
        </Row>
        <Notification
          setOpen={setError}
          open={error}
          message={"Kindly fill all required field"}
        />
        <Notification
          setOpen={setOpen}
          open={open.open}
          message={open.message}
        />
      </form>
    </>
  );
};

export default EditRecord;

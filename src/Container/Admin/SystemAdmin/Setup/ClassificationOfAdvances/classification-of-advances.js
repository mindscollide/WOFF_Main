import React, { useState ,useEffect} from "react";
import { Typography, Row, Col } from "antd";
import {
  Button,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  Notification
} from "../../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAdvanceClassification,
  AddAdvanceClassification,
  EditAdvanceClassification,
  DeleteAdvanceClassification,
  HideNotification,
  SearchAddvanceClassification} from '../../../../../store/actions/setup-forms-actions'

import {
  PlusOutlined as AddIcon,
  SearchOutlined as Search,
  EditOutlined as Edit,
  UndoOutlined as Restore,
} from "@ant-design/icons";

const ClassificationOfAdvances = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const setupForms = useSelector((state) => state.setupForms);
  const [actions, setAction] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [classificationofAdvance, setclassificationofAdvance] = useState({
    ID: null,
    // WOFStatus: 4,
    Title: '',
  });
  const add = () => {
    if(classificationofAdvance.Title!==''){
      showModal();
      setAction({ ...actions, add: true , update: false,
        delete: false, });
    }
   else{
    setOpen({
      flag: true,
      message: "Please Enter Classification Of Advances",
    });
   }
  };
  const deleteit = (e,record) => {
    setclassificationofAdvance({
      ...classificationofAdvance,
      Title: record.title,
      ID:record.id
    })
    console.log(record)
    showModal();
    setAction({ ...actions, delete: true, update: false,
      add: false, });
  };
  const update = (e,record) => {
    setclassificationofAdvance({
      ...classificationofAdvance,
      Title: record.title,
      // WOFStatus:record.wofStatus,
      ID:record.id
    })
    console.log(record)
    setAction({ ...actions, update: true ,add: false,delete: false});
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setAction({ add: false, delete: false,update: false });
    setclassificationofAdvance({
      Title: '',
      ID:0
    })
  };
  const handleDelete = () => {
    dispatch(DeleteAdvanceClassification(classificationofAdvance,setclassificationofAdvance,setIsModalVisible))
    setclassificationofAdvance({
      Title: '',
      ID:0
    })
    
  };
  const handleAdd = () => {
    dispatch(AddAdvanceClassification(classificationofAdvance,setIsModalVisible))
    setclassificationofAdvance({
      Title: "",
      ID: null,
    });
  };

  const columns = [
    {
      title: "Classification Of Advances",
      dataIndex: "title",
      key: "title",
      align: "center",
      width:"60%"
    },

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width:"20%",
      render: (text,record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(e)=>update(e,record)}
          className="icon-edit icon-size-one beachGreen"
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width:"20%",
      render: (text,record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(e)=>deleteit(e,record)}
          className="icon-trash icon-size-one pdfRed"
        />
      ),
    },
  ];
  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancle",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  const addButtonProps = {
    primaryButton: {
      text: "Proceed",
      icon: null,
      endIcon: <i className="icon-proceed icon-size-one"></i>,
      class: "btnBorderStyledBeach",
      click: () => handleAdd(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const handleChange = (e) =>{
    if(e.target.value==""){
      setAction({ ...actions, update: false });
    }
    setclassificationofAdvance({
      ...classificationofAdvance,
      Title:e.target.value
    })
}
  useEffect(() => {
    dispatch(GetAdvanceClassification())
  }, [])
  useEffect(() => {
    if (setupForms.ShowNotification) {
      setOpen({
        flag: true,
        message: setupForms.Message,
      });
      dispatch(HideNotification());
      dispatch(GetAdvanceClassification())
    }
  }, [setupForms.ShowNotification]);
  return (
    <>
      <Title level={3}>Classification Of Advances</Title>
      <Row gutter={8}>
        <Col lg={12} md={12} sm={24}>
          <TextField
            fullWidth
            label="Enter Classification Of Advances"
            size="small"
            required
            value={classificationofAdvance.Title}
            change={handleChange}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
        <Button
          text="Search"
          icon={<Search />}
          applyClass="btnDarkSolid"
          size="small"
          click={()=>dispatch(SearchAddvanceClassification(classificationofAdvance.Title))}
        />
        </Col>
        <Col lg={4} md={4} sm={24}>
        <Button
          text="Reset"
          icon={<Restore />}
          applyClass="btnSecondarySolidResetFull"
          size="small"
          click={()=>{
            setclassificationofAdvance({
              ...classificationofAdvance,
              Title: ""
            })
            setAction({ ...actions, add: false , update: false,
              delete: false, });
            dispatch(GetAdvanceClassification())
          }}
        />
        </Col>
          <Col lg={4} md={4} sm={24}>
          {actions.update? <Button
            text="Update"
            icon={<Edit />}
            applyClass="btnDarkSolid"
            size="small"
            click={()=>dispatch(EditAdvanceClassification(classificationofAdvance,setclassificationofAdvance,setAction,actions))}
          />: <Button
          text="Add"
          icon={<AddIcon />}
          applyClass="btnDarkSolid"
          size="small"
          click={add}
        />}
        </Col>
        <Col style={{ marginTop:"1%" }} lg={24} md={22} sm={24}>
          <Table rows={setupForms.ClassificationOfAdvances} columns={columns}  />
        </Col>
      </Row>
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when Add Brower btn will be clicked */}
        {actions.add && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px"
              }}>
              <Title level={3} align="center">
                Are you sure you want to add Classification Of Advances
              </Title>
            </div>
            <GroupedButtons data={addButtonProps} />
          </>
        )}
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px"
              }}>
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this?
              </Title>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default ClassificationOfAdvances;

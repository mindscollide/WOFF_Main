import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import TextField from "../InputFields/TextField/text-field";
import { Space, Row, Col } from "antd";
import {FormattedInputs} from '../FormatedInput/FormatedInput'
const ConsolidateBox = ({
  title,
  disable,
  handler,
  state,
  FRATotal,
  ABNSTotal,
  APBSTotal,
  ViewState,
}) => {
  const isDisable = disable && styles.disable;
  return (
    <Row gutter={16} style={{ backgroundColor: "#E8F3F3" }}>
      {console.log("ViewStateViewState",ViewState,state)}
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>Amount Before Negotiated Settlement</div>
            <div className={styles.contentbox}>
              <FormattedInputs
                name={"ABNSOutstandingPrincipal"}
                change={handler}
                disable={disable ? true : null}
                label={"Outstanding Principal"}
                    
                value={
                  state
                    ? state.ABNSOutstandingPrincipal
                    : ViewState
                    ? ViewState.abnsOutstandingPrincipal
                    : ""
                }
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                name={"ABNSOutstandingNominal"}
                label={"Outstanding Nominated (Debited Mark-up)"}
                change={handler}
                disable={disable ? true : null}
                value={
                  state
                    ? state.ABNSOutstandingNominal
                    : ViewState
                    ? ViewState.abnsOutstandingNominal
                    : ""
                }
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                name={"ABNSOutstandingNonAccural"}
                value={
                  state
                    ? state.ABNSOutstandingNonAccural
                    : ViewState
                    ? ViewState.abnsOutstandingNonAccural
                    : ""
                }
                label={"Outstanding Non-Accrual (Un-debited Mark-up)"}
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <div style={{
                display: "flex"
              }}>
                <Space>
                  <FormattedInputs
                    value={
                      state
                        ? state.ABNSOtherCharges
                        : ViewState
                        ? ViewState.abnsOtherCharges
                        : ""
                    }
                    name={"ABNSOtherCharges"}
                    label={"Other Charges"}
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                  <FormattedInputs
                    value={
                      state
                        ? state.ABNSPenalInterest
                        : ViewState
                        ? ViewState.abnsPenalInterest
                        : ""
                    }
                    name={"ABNSPenalInterest"}
                    label={"Penal Interest"}
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                </Space>
              </div>
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                name={"ABNSTotal"}
                label={"Total"}
                disable={true}
                    
                placeholder="Total"
                value={ABNSTotal}
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>Amount Paid by the Borrower at the time of Settlement</div>
            <div className={styles.contentbox}>
              <FormattedInputs
                value={
                  state
                    ? state.APBSOutstandingPrincipal
                    : ViewState
                    ? ViewState.apbsOutstandingPrincipal
                    : ""
                }
                name={"APBSOutstandingPrincipal"}
                change={handler}
                label={"Principal"}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                value={
                  state
                    ? state.APBSOutstandingNominal
                    : ViewState
                    ? ViewState.apbsOutstandingNominal
                    : ""
                }
                name={"APBSOutstandingNominal"}
                label={"Nominated (Debited Mark-up)"}
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                value={
                  state
                    ? state.APBSOutstandingNonAccural
                    : ViewState
                    ? ViewState.apbsOutstandingNonAccural
                    : ""
                }
                name={"APBSOutstandingNonAccural"}
                label={"Non-Accrual (Un-Debited Mark-up)"}
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <div style={{
                display: "flex"
              }}>
                <Space>
                  <FormattedInputs
                    value={
                      state
                        ? state.APBSOtherCharges
                        : ViewState
                        ? ViewState.apbsOtherCharges
                        : ""
                    }
                    name={"APBSOtherCharges"}
                    label={"Other Charges"}
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                  <FormattedInputs
                    value={
                      state
                        ? state.APBSPenalInterest
                        : ViewState
                        ? ViewState.apbsPenalInterest
                        : ""
                    }
                    name={"APBSPenalInterest"}
                    label={"Penal Interest"}
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                </Space>
              </div>
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                value={APBSTotal}
                name={"APBSTotal"}
                label={"Total"}
                disable={disable ? true : null}
                    
                placeholder="Total"
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={8} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>Financial Relief Allowed</div>
            <div className={styles.contentbox}>
              <FormattedInputs
                name={"FRAPrincipal"}
                label={"Principal"}
                value={
                  state
                    ? state.FRAPrincipal
                    : ViewState
                    ? ViewState.fraPrincipal
                    : ""
                }
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                name={"FRANominated"}
                label={"Nominated"}
                value={
                  state
                    ? state.FRANominated
                    : ViewState
                    ? ViewState.fraNominated
                    : ""
                }
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                value={
                  state
                    ? state.FRANonAccural
                    : ViewState
                    ? ViewState.fraNonAccural
                    : ""
                }
                name={"FRANonAccural"}
                label={"Non-Accural"}
                change={handler}
                disable={disable ? true : null}
                    
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
                required
              />
              <div style={{ marginTop: 18 }} />
              <div style={{
                display: "flex"
              }}>
                <Space>
                  <FormattedInputs
                    name={"FRAOtherCharges"}
                    label={"Other Charges"}
                    value={
                      state
                        ? state.FRAOtherCharges
                        : ViewState
                        ? ViewState.fraOtherCharges
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                  <div style={{ marginTop: 18 }} />
                  <FormattedInputs
                    name={"FRAPenalInterest"}
                    label={"Penal Interest"}
                    value={
                      state
                        ? state.FRAPenalInterest
                        : ViewState
                        ? ViewState.fraPenalInterest
                        : ""
                    }
                    change={handler}
                    disable={disable ? true : null}
                        
                    fullWidth
                    numLength={15}
                    margin="3px 0px 3px 0px"
                    required
                  />
                </Space>
              </div>
              <div style={{ marginTop: 18 }} />
              <FormattedInputs
                value={FRATotal}
                name={"FRATotal"}
                label={"Total"}
                disable={disable ? true : null}
                    
                placeholder="Total"
                fullWidth
                numLength={15}
                margin="3px 0px 3px 0px"
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ConsolidateBox;

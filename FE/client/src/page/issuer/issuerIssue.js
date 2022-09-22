import { Breadcrumb, Row, Col, message, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style/issuerissue.css";

const { Option } = Select;
const IssuerIssue = ({ user, type }) => {
  const [vcTitle, setVcTitle] = useState("");
  const onchange = (e) => {
    setVcTitle(e);
  };

  const submitVc = () => {
    axios({
      url: "http://localhost:9999/api/v1/credential/verifiable-credential",
      method: "POST",
      data: {
        credentialTitle: vcTitle,
      },
      withCredentials: true,
    })
      .then(() => {
        message.success("인증서 등록 성공!!");
      })
      .catch(() => {
        message.error("인증서 등록 실패!!");
      });
  };

  const vcList = ["졸업증명서", "출입국증명서", "성인인증서", "수료증", "All"];
  useEffect(() => {});
  useEffect(() => {
    axios({
      url: `http://localhost:9999/api/v1/user/issuer/63291d3cf29ec9b4eda306ab`,
      method: "GET",
      withCredentials: true,
    }).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="issuerissue">
      <Breadcrumb className="issuerissue--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issuerissue">인증서 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issuerissue--description">{`Issuer가 발급하는 Verifiable Credential을 등록합니다.`}</div>
      <div className="issuerissue--form">
        <Row className="issuerissue--row">
          <Col span={20} offset={2}>
            <div className="issuerissue--title">
              [ {user.title} ] Verifier Credential 등록
            </div>
            <hr />

            <Row className="issuerissue--row">
              <Col span={6}>
                <div>
                  <span className="issuerissue--sub--title">발행기관</span>
                </div>
              </Col>
              <Col span={16}>
                <span className="issuerissue--issuer">
                  {type === "holder" ? user.username : user.title || ""}
                </span>
              </Col>
              <Col span={2}></Col>
            </Row>

            <Row className="issuerissue--row">
              <Col span={6}>
                <span className="issuerissue--sub--title">인증서 제목</span>
              </Col>
              <Col span={16}>
                <Select
                  style={{ width: "50%", height: "100%" }}
                  placeholder="발급하실 인증서를 선택해주세요."
                  onChange={onchange}
                >
                  {vcList.map((e) => {
                    return <Option key={e}>{e}</Option>;
                  })}
                </Select>
              </Col>
              <Col span={2}></Col>
            </Row>

            <hr />
            <Row className="issuerissue--sumbit--wrapper">
              <Col span={6} offset={9}>
                <button className="issuerissue--submit" onClick={submitVc}>
                  인증서 제출
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IssuerIssue;

import { Breadcrumb, Row, Col, message, Select, Spin, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx"
import "./style/issuerissue.css";

const { Option } = Select;
const IssuerIssue = ({ user, type }) => {
  const [vcInfo, setVcInfo] = useState({});
  const [vcTitle, setVcTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const onchange = (e) => {
    setVcTitle(e);
  };

  const submitVc = () => {
    setIsLoading(true);
    axios({
      url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/verifiable-credential`,
      method: "POST",
      data: {
        credentialTitle: vcTitle,
      },
      withCredentials: true,
    })
      .then(() => {
        message.success("인증서 등록 성공!!");
        navigate(0);
        setIsLoading(false);
      })
      .catch(() => {
        message.error("인증서 등록 실패!!");
        setIsLoading(false);
      });
  };

  const vcList = ["졸업증명서", "출입국증명서", "성인인증서", "수료증", "All"];
  
  // 백엔드와 통신하는 부분
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_ISSUER}/iss/api/v1/verifiable-credential`,
  //     method: "GET",
  //     withCredentials: true,
  //   }).then((result) => {
  //     setVcInfo(result.data);
  //     setIsLoading(false);
  //   });
  // }, []);

  function readExcel(event) {
    try {
      const input = event.target;
      setFileName(event.target.files[0].name)
      const reader = new FileReader();
      reader.onload = function () {
          const data = reader.result;
          let workBook = XLSX.read(data, { type: 'binary' });
          workBook.SheetNames.forEach((sheetName) => {
              console.log('SheetName: ' + sheetName);
              let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
              console.log(JSON.stringify(rows));
          })
      }
      reader.readAsBinaryString(input.files[0]);
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="issuerissue">
      <Breadcrumb className="issuerissue--breadcrumb" separator=">">
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/issuerissue">인증서 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div className="issuerissue--description">{`Issuer가 발급하는 Verifiable Credential을 등록합니다.`}</div>
      <div className="issuerissue--form">
        <Spin tip="로딩중..." size="large" spinning={isLoading}>
          <Row className="issuerissue--row">
            <Col span={20} offset={2}>
              <div className="issuerissue--title">
                [ {user.title} ]
              </div>
              <p className="issuerissue--title">Verifier Credential 등록</p>
              <hr />

              <Row className="issuerissue--row">
                <Col span={6}>
                  <div>
                    <span className="issuerissue--sub--title">발행기관</span>
                  </div>
                </Col>
                <Col span={16}>
                  <span
                    className="issuerissue--issuer"
                    style={{ fontSize: "1.5rem", color: "black" }}
                  >
                    {type === "holder" ? user.username : user.title || ""}
                  </span>
                </Col>
                <Col span={2}></Col>
              </Row>

              {vcInfo.length !== undefined ? (
                <Row className="issuerissue--row">
                  <Col span={6}>
                    <span className="issuerissue--sub--title">종류</span>
                  </Col>
                  <Col span={16}>
                    <span
                      className="issuerissue--issuer"
                      style={{ fontSize: "1.5rem", color: "black" }}
                    >
                      {vcInfo[0]?.credentialTitle}
                    </span>
                  </Col>
                </Row>
              ) : (
                <>
                  <Row className="issuerissue--row">
                    <Col span={6}>
                      <span className="issuerissue--sub--title">
                        인증서 제목
                      </span>
                    </Col>
                    <Col span={16}>
                      <Select
                        style={{ width: "50%", height: "100%"}}
                        placeholder="발급하실 인증서를 선택해주세요."
                        onChange={onchange}
                      >
                        {vcList.map((e) => {
                          return <Option key={e}>{e}</Option>;
                        })}
                      </Select>
                    </Col>
                    <Col span={2} />
                  </Row>
                  <Row className="issuerissue--row">
                    <Col span={6}>
                      <span className="issuerissue--sub--title">
                        Excel 업로드
                      </span>
                    </Col>
                    <Col span={16}>
                      <label 
                      htmlFor="getExcelFile"
                      className="issuerissue--submit--excel">
                        {fileName === "" ? "파일첨부" : fileName}
                      </label>
                      <input 
                      id="getExcelFile"
                      style={{display: "none"}}
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={(e) => {
                        console.log(e)
                        readExcel(e)
                      }}>
                      </input>
                      <button 
                        className="excel--formInfo"
                        onClick={() => setModalOpen(true)}
                      >?</button>
                    </Col> 
                  </Row>                

                  <hr />
                  <Row className="issuerissue--sumbit--wrapper">
                    <Col>
                      <button
                        className="issuerissue--submit"
                        onClick={submitVc}
                      >
                        인증서 등록
                      </button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Spin>
      </div>
      <Modal
        title="Excel파일 양식"
        width={"50%"}
        open={modalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        
      </Modal>
    </div>
  );
};

export default IssuerIssue;

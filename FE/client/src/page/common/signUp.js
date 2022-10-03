import { Row, Col } from "antd";
import "./style/signUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpChoice from "../../component/signupChoice";
import HolderSignUp from "../../component/holderSignUp";
import IssuerSignUp from "../../component/issuerSignUp";
import VerifierSignUp from "../../component/verifierSignUp";

const SignUp = ({ user }) => {
  const [way, setWay] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user.type === undefined) {
      setWay("");
    } else {
      navigate("/");
    }
  }, [user.type, navigate]);
  useEffect(() => {});

  let renderByWay = "";
  if (way === "" || way === "company") {
    renderByWay = <SignUpChoice way={way} setWay={setWay} />;
  } else if (way === "holder") {
    renderByWay = <HolderSignUp />;
  } else if (way === "issuer") {
    renderByWay = <IssuerSignUp />;
  } else if (way === "verifier") {
    renderByWay = <VerifierSignUp />;
  } else {
    <>오류 발생</>;
  }

  return (
    <div className="signup">
      <div className="signup--form">
        <Row style={{ height: "inherit" }}>
          <Col span={16} offset={6}>
            <div className="signup--right">
              <div className="signup--canvas">
                {/* first choice holder or company(issuer or verifier) */}
                {renderByWay}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;

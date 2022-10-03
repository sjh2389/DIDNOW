import logo from "../img/didnow.png";
import icon from "../img/didnow-icon-home.png";
import { Link } from "react-router-dom";
import { Row, Col, Avatar } from "antd";
import {
  BankOutlined,
  SmileFilled,
  UserOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import "./style/nav.css";
import { useEffect } from "react";
import UpMenu from "./upMenu"
import { useMediaQuery } from "react-responsive";

/* 
  현재 에러가 있다고 나옵니다.
  menu.item 컴포넌트가 다음 업데이트에 사라진다는 내용,
  items 배열로 렌더링 하도록 리팩토링 하겠습니다.
*/

const Nav = ({ type, setType, user, setUser, logout }) => {
  useEffect(() => {});

  const handleClick = () => {
    window.location.href = "/signin";
  };
  const isBigScreen = useMediaQuery({minWidth: 1100})

  return (
    <strong>
      <Row style={{justifyContent: "space-between"}} gutter={24}>
      <Col span={4}>
        <Link to="/home">
          {isBigScreen ?
          <img src={logo} alt="" style={{ height: "64px" }} />
          : <img src={icon} alt="" style={{ height: "64px" }} />}
        </Link>
      </Col>
      <Col span={16}>
        <UpMenu type={type} logout={logout}/>
      </Col>
      <Col
        onClick={handleClick}
        span={4}
        style={{ textAlign: "right", cursor: "pointer", fontWeight: 700 }}
      >
        <span className="ant-dropdown-link">
          {type === "" ? (
            <Avatar>
              <UserOutlined />
            </Avatar>
          ) : type === "holder" ? (
            <Avatar style={{ backgroundColor: "green" }}>
              <SmileFilled style={{ fontSize: "20px" }} />
            </Avatar>
          ) : type === "issuer" ? (
            <Avatar style={{ backgroundColor: "black" }}>
              <BankOutlined style={{ fontSize: "18px" }} />
            </Avatar>
          ) : (
            <Avatar style={{ backgroundColor: "rgb(11,91,201)" }}>
              <WindowsFilled style={{ fontSize: "20px" }} />
            </Avatar>
          )}
          <span style={{ margin: "0 0 0 5px" }}>
            {type === ""
              ? null
              : type === "holder"
              ? user?.username
              : user?.title}
          </span>
        </span>
      </Col>
      <hr />
    </Row>
    </strong>
  );
};

export default Nav;

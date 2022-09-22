import logo from "../img/didnow.png";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/nav.css";
import { useEffect } from "react";

/* 
  현재 에러가 있다고 나옵니다.
  menu.item 컴포넌트가 다음 업데이트에 사라진다는 내용,
  items 배열로 렌더링 하도록 리팩토링 하겠습니다.
*/

const Nav = ({ type, setType, user, setUser }) => {
  useEffect(() => {});
  const SubMenu = Menu.SubMenu;
  const navigate = useNavigate();
  const logout = async () => {
    axios({
      url: "http://localhost:9999/api/v1/auth/logout",
      method: "POST",
      withCredentials: true,
    })
      .then((data) => {
        message.info("로그아웃 되었습니다.");
        setType("");
        setUser({});
        navigate("/home");
      })
      .catch(() => {
        message.error("로그아웃 실패");
      });
  };

  let menu = "";

  if (type === "") {
    menu = (
      <Menu>
        <Menu.Item key={1}>
          <Link to="/signin">로그인</Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link to="signup">회원가입</Link>
        </Menu.Item>
      </Menu>
    );
  } else if (type === "holder") {
    menu = (
      <Menu>
        <Menu.Item key={1}>
          <Link to="/mypage">내 정보 수정</Link>
        </Menu.Item>
        <SubMenu key={2} title="내 지갑">
          <Menu.Item key={3}>
            <Link to="/holder/manage">인증서 관리</Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <Link to="/holder/submit">인증서 제출</Link>
          </Menu.Item>
          <Menu.Item key={6}>
            <Link to="/holder/issuerlist">인증서 발급</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item onClick={logout} className="font--red">
          로그아웃
        </Menu.Item>
      </Menu>
    );
  } else if (type === "issuer") {
    menu = (
      <Menu>
        <Menu.Item key={1}>
          <Link to="/mypage">내 정보 수정</Link>
        </Menu.Item>
        <SubMenu key={2} title="인증서">
          <Menu.Item key={3}>
            <Link to="/issuer/issue">인증서 등록</Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <Link to="/issuer/userlist">인증 목록 등록</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item onClick={logout} key={7} className="font--red">
          로그아웃
        </Menu.Item>
      </Menu>
    );
  } else if (type === "verifier") {
    menu = (
      <Menu>
        <Menu.Item key={1}>
          <Link to="/mypage">내 정보 수정</Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link to="/verifier/vplist">인증 요청 목록</Link>
        </Menu.Item>

        <Menu.Item onClick={logout} key={5}>
          로그아웃
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Row>
      <Col span={6}>
        <Link to="/">
          <img src={logo} alt="" style={{ height: "64px" }} />
        </Link>
      </Col>
      <Col span={4} offset={14}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <span className="ant-dropdown-link">
            <Avatar>
              <UserOutlined />
            </Avatar>
            <span style={{ margin: "0 0 0 5px", cursor: "pointer" }}>
              {type === ""
                ? "로그인"
                : type === "holder"
                ? user.username
                : user.title}
            </span>
          </span>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Nav;

import {
  AreaChartOutlined,
  AuditOutlined,
  FileDoneOutlined,
  FolderOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SafetyOutlined,
  SettingOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style/upMenu.css"
import { useMediaQuery } from "react-responsive";

const UpMenu = ({ type, logout }) => {
  //사용자 화면 크기 측정
  const isBigScreen = useMediaQuery({minWidth: 1050})

  //사용자 화면에 따라 텍스트 유무결정, 이후 유저타입에 따라 뜨는 버튼 세분화
  const commonItems = (
    <div>
      {isBigScreen ?
        type === ""
        ? 
        <div className="topbar">
          <Link className="margin" to="/home">
            <HomeOutlined />
            {`\u00A0 메인화면`}
          </Link>
          <Link className="margin" to={"/signin"}>
            <LoginOutlined />
            {`\u00A0 로그인`}
          </Link>
          <Link className="margin" to={"/signup"}>
            <UserAddOutlined />
            {`\u00A0 회원가입`}
          </Link>
        </div>
        : type === "holder" ?
        <div className="topbar">
          <Link className="margin" to="/home">
            <HomeOutlined />
            {`\u00A0 메인화면`}
          </Link>
          <Link className="margin" to="/mypage">
            <SettingOutlined />
            {`\u00A0 정보수정`}
          </Link>  
          <div className="margin" onClick={logout}>
            <LogoutOutlined />
            {`\u00A0 로그아웃`}
          </div>
          <Link className="margin" to="/holder/issuerlist">
            <SafetyOutlined />
            {`\u00A0 인증서발급`}
          </Link>
          <Link className="margin" to="/holder/manage">
            <FolderOutlined />
            {`\u00A0 인증서관리`}
          </Link>
          <Link className="margin" to="/holder/vplist">
            <FileDoneOutlined />
            {`\u00A0 인증서제출`}
          </Link>
        </div>
        : type === "issuer" ?
        <div className="topbar">
          <Link className="margin" to="/home">
            <HomeOutlined />
            {`\u00A0 메인화면`}
          </Link>
          <Link className="margin" to="/mypage">
            <SettingOutlined />
            {`\u00A0 정보수정`}
          </Link>  
          <div className="margin" onClick={logout}>
            <LogoutOutlined />
            {`\u00A0 로그아웃`}
          </div>
          <Link className="margin" to="/issuer/issue">
            <SafetyOutlined />
            {`\u00A0 인증서발급`}
          </Link>
          <Link className="margin" to="/issuer/userlist">
            <UsergroupAddOutlined />
            {`\u00A0 발급인원관리`}
          </Link>
          <Link className="margin" to="/issuer/vplist">
            <AreaChartOutlined />
            {`\u00A0 발급현황`}
          </Link>
        </div>
        : type === "verifier" ?
        <div className="topbar">
          <Link className="margin" to="/home">
            <HomeOutlined />
            {`\u00A0 메인화면`}
          </Link>
          <Link className="margin" to="/mypage">
            <SettingOutlined />
            {`\u00A0 정보수정`}
          </Link>  
          <div className="margin" onClick={logout}>
            <LogoutOutlined />
            {`\u00A0 로그아웃`}
          </div>
          <Link className="margin" to="/verifier/vplist">
            <AuditOutlined />
            {`\u00A0 인증서검증`}
          </Link> 
          <Link className="margin" to="/verifier/status">
            <AreaChartOutlined />
            {`\u00A0 인증현황`}
          </Link> 
        </div>
        : null
      : type === ""
      ? 
      <div className="topbar">
        <Link className="margin" to="/home">
          <HomeOutlined />
        </Link>
        <Link className="margin" to={"/signin"}>
          <LoginOutlined />
        </Link>
        <Link className="margin" to={"/signup"}>
          <UserAddOutlined />
        </Link>
      </div>
      : type === "holder" ?
      <div className="topbar">
        <Link className="margin" to="/home">
          <HomeOutlined />
        </Link>
        <Link className="margin" to="/mypage">
          <SettingOutlined />
        </Link>  
        <div className="margin" onClick={logout}>
          <LogoutOutlined />
        </div>
        <Link className="margin" to="/holder/issuerlist">
          <SafetyOutlined />
        </Link>
        <Link className="margin" to="/holder/manage">
          <FolderOutlined />
        </Link>
        <Link className="margin" to="/holder/vplist">
          <FileDoneOutlined />
        </Link>
      </div>
      : type === "issuer" ?
      <div className="topbar">
        <Link className="margin" to="/home">
          <HomeOutlined />
        </Link>
        <Link className="margin" to="/mypage">
          <SettingOutlined />
        </Link>  
        <div className="margin" onClick={logout}>
          <LogoutOutlined />
        </div>
        <Link className="margin" to="/issuer/issue">
          <SafetyOutlined />
        </Link>
        <Link className="margin" to="/issuer/userlist">
          <UsergroupAddOutlined />
        </Link>
        <Link className="margin" to="/issuer/vplist">
          <AreaChartOutlined />
        </Link>
      </div>
      : type === "verifier" ?
      <div className="topbar">
        <Link className="margin" to="/home">
          <HomeOutlined />
        </Link>
        <Link className="margin" to="/mypage">
          <SettingOutlined />
        </Link>  
        <div className="margin" onClick={logout}>
          <LogoutOutlined />
        </div>
        <Link className="margin" to="/verifier/vplist">
          <AuditOutlined />
        </Link> 
        <Link className="margin" to="/verifier/status">
          <AreaChartOutlined />
        </Link> 
      </div>
      : null} 
    </div> 
  )

  return (
    <div>{commonItems}</div>
  );
};

export default UpMenu;

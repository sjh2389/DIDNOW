import { Modal } from "antd";
import QRCode from "qrcode.react";

const QrCodeModal = ({ modalOpen, setModalOpen, qrvalue, setQrValue }) => {
  const handleCancel = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      style={{ borderRadius: "50px" }}
      title="KLIP 지갑 연동"
      open={modalOpen}
      onCancel={handleCancel}
      width="fit-content"
      footer={[]}
    >
      <div style={{ margin: "10px"}}>
        <div 
          style={{ fontSize: "1.8rem", fontWeight: "700", margin: "0 0 5% 0" }}
        >
          KLIP 지갑 연동
        </div>
        <QRCode style={{ fontSize: "2rem" }} value={qrvalue} size={128} />
        <div>카메라로 QR Code를 인식하여</div>
        <div>지갑 주소를 등록해 보세요.</div>
        <div>
          <span style={{ fontWeight: "700" }}>DIDNOW</span>의 서비스를
          이용하기
          <div>위해서는 KLIP 서비스에 가입</div>
          <div>되어있어야 합니다.</div>
        </div>
        <div style={{ margin: "5% 0 0 0" }}>
          <a
            style={{
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              textDecoration: "underline",
            }}
            href="https://www.kakaocorp.com/page/service/service/Klip"
          >
            {`📎 KLIP 가입하러 가기`}
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default QrCodeModal;

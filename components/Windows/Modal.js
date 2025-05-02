import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 999;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  z-index: 1000;
`;

export default function DecryptedModal({ decrypted, onClose, tag }) {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalBox>
        <h3>Decrypted Note</h3>
        <p><strong>Tag:</strong> {tag}</p>
        <p><strong>Decrypted:</strong> {decrypted}</p>
        <button onClick={onClose}>Close</button>
      </ModalBox>
    </>
  );
}

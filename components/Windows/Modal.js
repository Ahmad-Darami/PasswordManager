import styled from 'styled-components';



export default function DecryptedModal({ decrypted, onClose, tag }) {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalBox>
        <h3>Decryption Window</h3>
        <p><strong>Tag/Note:</strong> {tag}</p>
        <p><strong>Decrypted Hash:</strong> {decrypted}</p>
        <Elementbutton onClick={onClose}>Close</Elementbutton>
      </ModalBox>
    </>
  );
}

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

const Elementbutton = styled.button`
  background-color: ${(props) => (props.primary ? '#ffa500' : 'transparent')};
  color: ${(props) => (props.primary ? '#ffffff' : '#ffa500')};
  padding: 0.2rem 0.5rem;
  border: 1px solid #007bff;
  color:rgb(0, 0, 0); 
  border-radius: 5px;
  margin-top: 3px;
  text-decoration: none;
  font-weight: bold;
  cursor:pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ff8c00' : '#007bff')};
    color: #ffffff;
  }

  &:button:focus {
  outline: none;
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(83, 109, 254, 0.4) 0 2px 4px, rgba(83, 109, 254, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  }
  &:button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
  }

`;

import styled from 'styled-components';
import {Form, Card, Modal, Row, Alert} from 'react-bootstrap';

export const MainContainer = styled.div`
    width: 90vw;
    margin: 50px auto 0;
`;

export const ContactFormContainer = styled.div`
    position: fixed;
    width: 350px;
    right: 60vw;
`;

export const ContactListContainer = styled.div`
    position: absolute;
    width: 350px;
    left: 50vw;
`;

export const ContactFormStyled = styled(Form)`
    margin-top: 30px;
    input {
        margin-bottom: 10px;
    }
`;

export const FormBtnWrapper = styled.div`
    margin-top: 20px;
    width: 40%;
    display: flex;
    justify-content: space-between;
`;

export const ContactCard = styled(Card)`
    width: 345px;
    margin-bottom: 15px;
`;

export const ContactCardBtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const EditDeleteBtnWrapper = styled.div`
    width: 41%;
    display: flex;
    justify-content: space-between;
`;

export const ConfirmationModalContainer = styled(Modal.Dialog)`
    z-index: 1000;
    position: fixed;
    left: 30vw;
    top: 10vh;
`;

export const ConflictBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        margin-left: 20px;
    }
`;

export const InfoRow = styled(Row)`
    margin-top: 10px;
`;

export const SearchInput = styled(Form.Control)`
    width: 345px;
    margin: 30px 0;
`;

export const AlertContainer = styled(Alert)`
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2000;
    .info-alert-text {
        display: inline-block;
        margin-right: 15px;
    }
`;
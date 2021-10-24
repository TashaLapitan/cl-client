import styled from 'styled-components';
import {Form, Card, Modal, Row} from 'react-bootstrap';

export const MainContainer = styled.div`
    width: 900px;
    margin: 50px auto 0;
`;

export const ContactFormContainer = styled.div`
    position: fixed;
    width: 25%;
    left: 15vw;
`;

export const ContactListContainer = styled.div`
    position: absolute;
    width: 30%;
    right: 15vw;
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
    width: 85%;
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

export const DeleteConfirmationModal = styled(Modal.Dialog)`
    z-index: 1000;
    position: fixed;
    width: 40vw;
    left: 30vw;
    top: 10vh;
`;

export const ConflictBtnWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const InfoRow = styled(Row)`
    margin-top: 10px;
`;
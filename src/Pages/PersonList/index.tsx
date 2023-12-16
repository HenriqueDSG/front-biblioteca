import React, { useEffect, useState } from 'react';
import TopMenu from '../../Components/TopMenu';
import BasicTable from '../../Components/Table';
import PersonService from '../../Services/PersonService/PersonService';
import Modal from '../../Components/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertNotification, { AlertColor } from '../../Components/AlertNotification';
import "./index.css";
import RowRadioButtonsGroup from '../../Components/Radio';
import RegistryService from '../../Services/RegistryService/RegistryService';

const PersonList: React.FC = () => {
    const personService = new PersonService();
    const [personList, setPersonList] = useState<any[]>([]);
    const [personLabelList, setPersonLabelList] = useState<any[]>([
        {
            label: "Nome",
            value: "name",
        },
        {
            label: "Email",
            value: "email",
        },
        {
            label: "Telefone",
            value: "phone",
        },
        {
            label: "Tipo pessoa",
            value: "tipoPessoa",
        }
    ]);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [person, setPerson] = useState<any>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [disableSave, setDisableSave] = useState<boolean>(false);
    const [optionsPersonType, setOptionsPersonType] = useState<any[]>([
        { value: 1, label: "Atendente", selected: false },
        { value: 0, label: "Usuário", selected: true }
    ]);

    const [onNotification, setOnNotification] = useState<boolean>(false);
    const [messageNotifications, setMessageNotification] = useState<string>("");
    const [severityMessage, setSeverityMessage] = useState<AlertColor>("success");
    const registryService = new RegistryService();

    useEffect(() => {
        if (!modalVisible) {
            getPerson();
        }
    }, [modalVisible])

    const getPerson = async () => {
        try {
            const userResponse = await personService.getPersons();

            // debugger

            const userList_ = userResponse.data.map((item: any) => {
                return {
                    // id: item.id_user_atendente,
                    id: item.id_pessoa,
                    idAddress: item.id_endereco,
                    name: item.nome,
                    password: item.password,
                    email: item.email,
                    phone: item.telefone,
                    street: item.rua,
                    number: item.numero,
                    cep: item.cep,
                    city: item.cidade,
                    state: item.estado,
                    country: item.pais,
                    complement: item.complemento,
                    tipoPessoa: (item.isAttendant === "1" ? "Atendente" : "Usuário"),
                    isAttendant: item.isAttendant
                }
            })

            setPersonList(userList_);
        }
        catch (error) {
            console.log(error);
        }
    }

    const savePerson = async () => {
        setDisableSave(true);

        try {
            let person_ = personList.filter((item) => item.id === selectedId)[0];

            person_ = {
                ...person_,
                name: person.name,
                email: person.email,
                phone: person.phone,
                street: person.street,
                number: person.number,
                password: person.password,
                cep: person.cep,
                city: person.city,
                state: person.state,
                country: person.country,
                complement: person.complement,
                idPerson: person.id,
                idAddress: person.idAddress,
                isAttendant: optionsPersonType.find((item) => item.selected)?.value
            }

            if (selectedId === 0) {
                await personService.createPerson(person_);
                setNotification("Pessoa salva com sucesso!", "success", true);
                return
            }

            await personService.updatePerson(person_);
            setNotification("Pessoa salva com sucesso!", "success", true);
        }
        catch (error) {
            setNotification("Erro ao salvar", "error", false);
            debugger;
        }
    }

    const deletePerson = async () => {
        setDisableSave(true);

        try {
            const registryResponse = await registryService.getRegistryByPersonId(person.id);

            if (registryResponse.data.length > 0) {
                setNotification("Não é possível apagar uma pessoa que possui registros", "error", false);
                setDisableSave(false);
                return;
            }
        } 
        catch (error) {

        }

        try {
            await personService.deletePerson(selectedId);
            setNotification("Pessoa apagada com sucesso!", "success", true);
        }
        catch (error) {
            setNotification("Erro ao apagar", "error", false);
            debugger;
        }

        setDisableSave(false);
    }

    useEffect(() => {
        if (selectedId !== 0) {
            try {
                const _user = personList.filter((item) => item.id === selectedId)[0];
                setPerson(_user);

                setOptionsPersonType(
                    optionsPersonType.map((item) => ({
                        ...item,
                        selected: item.value.toString() === _user.isAttendant
                    }))
                );

                setModalVisible(true);
            }
            catch (error) {
                debugger;
            }
        }
    }, [selectedId])

    useEffect(() => {
        if (!modalVisible) {
            setSelectedId(0);
            setPerson(undefined);
        }
    }, [modalVisible]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPerson({
            ...person,
            [name]: value
        })
    }

    useEffect(() => {
        setDisableSave(!(person && (person.name && person.email && person.phone)));
    }, [person]);

    const setNotification = (message: string, severity: AlertColor, timed: boolean) => {
        setMessageNotification(message);
        setSeverityMessage(severity);
        setOnNotification(true);

        if (timed) {
            setTimeout(() => setOnNotification(false), 3000);
            setTimeout(() => setModalVisible(false), 1000);
        }
    }

    return (
        <TopMenu title={"Pessoas"}>
            <Button variant="contained" style={{ margin: "0 15px", height: "30px", background: "#f74639" }} onClick={() => setModalVisible(true)}>+</Button>
            <div style={{ margin: "20px 10px", width: "calc(100% - 20px)" }}>
                <BasicTable list={personList} labelList={personLabelList} setSelectedId={setSelectedId} />
            </div>

            <AlertNotification
                open={onNotification}
                severity={severityMessage}
                message={messageNotifications}
                handleClose={() => setOnNotification(false)} />

            <Modal title={`${(person && person.id) ? "Editar" : "Nova"} pessoa`} close={() => setModalVisible(!modalVisible)} visible={modalVisible}>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{
                        margin: '10px 0px 20px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <TextField
                            id={"standard-basic"}
                            label={"Nome"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.name : ""}
                            required
                            error={person?.name === ""}
                            onChange={handleChange}
                            name='name'
                            helperText={person?.name === "" && "Campo obrigatório"}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"E-mail"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.email : ""}
                            required
                            error={person?.email === ""}
                            onChange={handleChange}
                            name={'email'}
                            helperText={person?.email === "" && "Campo obrigatório"}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Telefone"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.phone : ""}
                            error={person?.phone === ""}
                            onChange={handleChange}
                            name={'phone'}
                            required
                            helperText={person?.phone === "" && "Campo obrigatório"}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Senha"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.password : ""}
                            error={person?.password === ""}
                            onChange={handleChange}
                            name={'password'}
                            required
                            helperText={person?.password === "" && "Campo obrigatório"}
                        />

                        <RowRadioButtonsGroup
                            options={optionsPersonType}
                            label={"Tipo de pessoa"}
                            onChange={setOptionsPersonType}
                        />
                    </div>

                    <div style={{
                        margin: '10px 0px 20px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        <TextField
                            id={"standard-basic"}
                            label={"Rua"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.street : ""}
                            onChange={handleChange}
                            name={'street'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Número"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.number : ""}
                            onChange={handleChange}
                            name={'number'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"CEP"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.cep : ""}
                            onChange={handleChange}
                            name={'cep'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Cidade"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.city : ""}
                            onChange={handleChange}
                            name={'city'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Estado"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.state : ""}
                            onChange={handleChange}
                            name={'state'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"País"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.country : ""}
                            onChange={handleChange}
                            name={'country'}
                        />
                        <TextField
                            id={"standard-basic"}
                            label={"Complemento"}
                            variant={"standard"}
                            autoComplete={"off"}
                            className={"text"}
                            value={(person) ? person.complement : ""}
                            onChange={handleChange}
                            name={'complement'}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        variant="contained"
                        onClick={() => savePerson()}
                        disabled={disableSave}
                        style={{ background: (!disableSave) ? "#f74639" : "rgba(0, 0, 0, 0.12)", marginRight: "10px" }}
                    >Salvar</Button>

                    <Button
                        variant="contained"
                        onClick={() => deletePerson()}
                        disabled={disableSave || selectedId === 0}
                    >Apagar</Button>
                </div>
            </Modal>
        </TopMenu>
    );
};

export default PersonList;
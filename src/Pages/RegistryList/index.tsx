import React, { useEffect, useState } from 'react';
import TopMenu from '../../Components/TopMenu';
import BasicTable from '../../Components/Table';
import RegistryService from '../../Services/RegistryService/RegistryService';
import Modal from '../../Components/Modal';
import Button from '@mui/material/Button';
import AlertNotification, { AlertColor } from '../../Components/AlertNotification';
import "./index.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PersonService from '../../Services/PersonService/PersonService';
import BookService from '../../Services/BookService/BookService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import 'moment/locale/pt-br';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const locales = ['pt-br'];
type LocaleKey = (typeof locales)[number];

const RegistryList: React.FC = () => {
    const registryService = new RegistryService();
    const personService = new PersonService();
    const bookService = new BookService();

    const [locale, setLocale] = React.useState<LocaleKey>('pt-br');

    if (moment.locale() !== locale) {
        moment.locale(locale);
    }

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [disableSave, setDisableSave] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [registry, setRegistry] = useState<any>();
    const [registryList, setRegistryList] = useState<any[]>([]);
    const [onNotification, setOnNotification] = useState<boolean>(false);
    const [messageNotifications, setMessageNotification] = useState<string>("");
    const [severityMessage, setSeverityMessage] = useState<AlertColor>("success");
    const [delivered, setDelivered] = useState<boolean>(false);
    const [registryLabelList, setRegistryLabelList] = useState<any[]>([
        {
            label: "Título",
            value: "titleBook",
        },
        {
            label: "Usuário",
            value: "nameUser",
        },
        {
            label: "Atendente",
            value: "nameAttendant",
        },
        {
            label: "Data de entrega",
            value: "deliveryDate",
        },
        {
            label: "Data de entrega esperada",
            value: "expectedDeliveryDate",
        }
    ]);

    useEffect(() => {
        getUsers();
        getAttendants();
        getBooks();
    }, [])

    const [users, setUsers] = useState<any[]>([]);
    const [attendants, setAttendants] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);

    const getUsers = async () => {
        try {
            const usersResponse = await personService.findUsers();
            setUsers(usersResponse.data);
        }
        catch (error) {

        }
    }

    const getAttendants = async () => {
        try {
            const usersResponse = await personService.findAttendants();
            setAttendants(usersResponse.data);
        }
        catch (error) {

        }
    }

    const getBooks = async () => {
        try {
            const booksResponse = await bookService.getBooks();
            const _books = booksResponse.data.map((item: any) => {
                return {
                    ...item,
                    name: item.title
                }
            })
                .sort((a, b) => (a.name > b.name) ? 1 : -1);

            setBooks(_books);
        } 
        catch (error) {

        }
    }

    useEffect(() => {
        if (!modalVisible) {
            getRegistry();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (selectedId !== 0) {
            try {
                const _registry = registryList.filter((item) => item.id === selectedId)[0];
                setDelivered(_registry.deliveryDate);
                setRegistry(_registry);
                setModalVisible(true);
            }
            catch (error) {
                debugger;
            }
        }
    }, [selectedId])

    const getRegistry = async () => {
        try {
            const registryResponse = await registryService.getRegistries();
            const registryList_ = registryResponse.data.map((item: any) => {
                return {
                    ...item,
                }
            });

            setRegistryList(registryList_);
        }
        catch (error) {

        }
    }

    const setNotification = (message: string, severity: AlertColor, timed: boolean) => {
        setMessageNotification(message);
        setSeverityMessage(severity);
        setOnNotification(true);

        if (timed) {
            setTimeout(() => setOnNotification(false), 3000);
            setTimeout(() => setModalVisible(false), 1000);
        }
    }

    const saveRegistry = async () => {
        setDisableSave(true);

        try {
            const _registry = {
                ...registry,
                expectedDeliveryDate: (registry.expectedDeliveryDate) ? moment(registry.expectedDeliveryDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
                deliveryDate: (registry.deliveryDate) ? moment(registry.deliveryDate).format('YYYY-MM-DD HH:mm:ss') : undefined,
            };

            if (_registry.id) {
                await registryService.updateRegistry(_registry);
                setNotification("Registro atualizado com sucesso!", "success", true);
            }
            else {
                await registryService.createRegistry(_registry);
                setNotification("Registro criado com sucesso!", "success", true);
            }
        }
        catch (error) {

        }
    }

    const deleteRegistry = async () => {
        setDisableSave(true);

        try {
            await registryService.deleteRegistry(selectedId);
            setNotification("Registro apagado com sucesso!", "success", true);
        }
        catch (error) {

        }
    }

    useEffect(() => {
        setDisableSave(!(registry && (registry.idBook && registry.idUser && registry.idAttendant)));
    }, [registry]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegistry({
            ...registry,
            [name]: value
        })
    }

    useEffect(() => {
        if (!modalVisible) {
            setSelectedId(0);
            setRegistry(undefined);
        }
    }, [modalVisible]);

    const handleChangeDeliverCheck = (event) => {
        const { checked } = event.target;

        setRegistry({
            ...registry,
            deliveryDate: (checked) ? moment().format('YYYY-MM-DD HH:mm:ss') : null
        });

        setDelivered(checked);
    }

    const handleChangeExpectedDeliverCheck = (value) => {
        setRegistry({
            ...registry,
            expectedDeliveryDate: value.format('YYYY-MM-DD HH:mm:ss')
        });
    }

    return (
        <TopMenu title={"Registros"}>
            <Button variant="contained" style={{ margin: "0 15px", height: "30px", background: "#f74639" }} onClick={() => setModalVisible(true)}>+</Button>
            <div style={{ margin: "20px 10px", width: "calc(100% - 20px)" }}>
                <BasicTable list={registryList} labelList={registryLabelList} setSelectedId={setSelectedId} />
            </div>

            <AlertNotification
                open={onNotification}
                severity={severityMessage}
                message={messageNotifications}
                handleClose={() => setOnNotification(false)} />

            <Modal title={`${(registry && registry.id) ? "Editar" : "Novo"} registro`} close={() => setModalVisible(!modalVisible)} visible={modalVisible}>
                <div className={"modalDiv"}>
                    <FormControl variant="standard" className={"text"}>
                        <InputLabel>Livro</InputLabel>
                        <Select
                            name={"idBook"}
                            value={registry?.idBook}
                            onChange={handleChange}
                        >
                            {
                                books.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                        <DemoItem label="Data de entrega prevista" >
                            <DatePicker
                                value={moment(registry?.expectedDeliveryDate ?? null)}

                                onChange={handleChangeExpectedDeliverCheck}
                                className={"textDate"}
                                views={['day', 'month', 'year']}
                            />
                        </DemoItem>
                    </LocalizationProvider>

                    <FormControl variant="standard" className={"text"}>
                        <InputLabel>Usuário</InputLabel>
                        <Select
                            name={"idUser"}
                            value={registry?.idUser}
                            onChange={handleChange}
                        >
                            {
                                users.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" className={"text"}>
                        <InputLabel>Atendente</InputLabel>
                        <Select
                            value={registry?.idAttendant}
                            name={"idAttendant"}
                            onChange={handleChange}
                        >
                            {
                                attendants.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControlLabel control={
                        <Checkbox
                            checked={delivered}
                            onChange={handleChangeDeliverCheck}
                        />}
                        label="Entregue" />
                </div>

                <div>

                    <Button
                        variant="contained"
                        onClick={() => saveRegistry()}
                        disabled={disableSave}
                        style={{ background: (!disableSave) ? "#f74639" : "rgba(0, 0, 0, 0.12)", marginRight: "10px" }}
                    >Salvar</Button>
                    <Button
                        variant="contained"
                        onClick={() => deleteRegistry()}
                        disabled={disableSave || selectedId === 0}
                    >Apagar</Button>
                </div>
            </Modal>
        </TopMenu>
    );
};

export default RegistryList;
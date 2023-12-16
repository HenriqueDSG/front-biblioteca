import React, { useEffect, useState } from 'react';
import TopMenu from '../../Components/TopMenu';
import BasicTable from '../../Components/Table';
import BookService from '../../Services/BookService/BookService';
import Modal from '../../Components/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertNotification, { AlertColor } from '../../Components/AlertNotification';
import "./index.css";
import RegistryService from '../../Services/RegistryService/RegistryService';

const BookList: React.FC = () => {
    const bookService = new BookService();
    const registryService = new RegistryService();
    const [bookList, setBookList] = useState<any[]>([]);
    const [bookLabelList, setBookLabelList] = useState<any[]>([
        {
            label: "Titulo",
            value: "title",
        },
        {
            label: "Autor",
            value: "author",
        }
    ]);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [book, setBook] = useState<any>();
    const [disableSave, setDisableSave] = useState<boolean>(false);
    const [onNotification, setOnNotification] = useState<boolean>(false);
    const [messageNotifications, setMessageNotification] = useState<string>("");
    const [severityMessage, setSeverityMessage] = useState<AlertColor>("success");

    useEffect(() => {
        if (!modalVisible) {
            getBooks();
        }
    }, [modalVisible])

    const getBooks = async () => {
        try {
            const bookResponse = await bookService.getBooks();
            setBookList(bookResponse.data);
        }
        catch (error) {
            debugger;
        }
    }

    useEffect(() => {
        if (!modalVisible) {
            setSelectedId(0);
            setBook(undefined);
        }
    }, [modalVisible]);

    useEffect(() => {
        if (selectedId !== 0) {
            try {
                const user_ = bookList.filter((item) => item.id === selectedId)[0];
                setBook(user_);
                setModalVisible(true);
            }
            catch (error) {
                debugger;
            }
        }
    }, [selectedId])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBook({
            ...book,
            [name]: value
        });
    }

    useEffect(() => {
        setDisableSave(!(book && (book.title && book.author)));
    }, [book]);

    const setNotification = (message: string, severity: AlertColor, timed: boolean) => {
        setMessageNotification(message);
        setSeverityMessage(severity);
        setOnNotification(true);

        if (timed) {
            setTimeout(() => setOnNotification(false), 3000);
            setTimeout(() => setModalVisible(false), 1000);
        }
    }

    const saveBook = async () => {
        setDisableSave(true);

        try {
            if (book?.id) {
                await bookService.updateBook(book);
                setNotification("Livro atualizado com sucesso!", "success", true);
            }
            else {
                await bookService.createBook(book);
                setNotification("Livro criado com sucesso!", "success", true);
            }
        }
        catch (error) {
            setNotification("Erro ao salvar livro!", "error", false);
        }
    }

    const deleteBook = async () => {
        setDisableSave(true);

        try {
            const registryResponse = await registryService.getRegistryByBookId(book.id);

            if (registryResponse.data.length > 0) {
                setNotification("Livro não pode ser apagado, pois está emprestado!", "error", false);
                setDisableSave(false);
                return;
            }
        }
        catch (error) {

        }

        try {
            await bookService.deleteBook(selectedId);
            setNotification("Livro apagado com sucesso!", "success", true);
        }
        catch (error) {
            setNotification("Erro ao apagar", "error", false);
            debugger;
        }

        setDisableSave(false);
    }

    return (
        <TopMenu title={"Livros"}>
            <Button variant="contained" style={{ margin: "0 15px", height: "30px", background: "#f74639" }} onClick={() => setModalVisible(true)}>+</Button>
            <div style={{ margin: "20px 10px", width: "calc(100% - 20px)" }}>
                <BasicTable list={bookList} labelList={bookLabelList} setSelectedId={setSelectedId} />
            </div>

            <AlertNotification
                open={onNotification}
                severity={severityMessage}
                message={messageNotifications}
                handleClose={() => setOnNotification(false)} />

            <Modal
                title={`${(book && book.id) ? "Editar" : "Novo"} livro`}
                close={() => setModalVisible(!modalVisible)}
                visible={modalVisible}>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div style={{
                        margin: '10px 0px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: "300px"
                    }}>
                        <TextField
                            id={"standard-basic"}
                            label={"Titulo"}
                            name={"title"}
                            variant={"standard"}
                            className={"text"}
                            value={book?.title}
                            required
                            error={book?.title === ""}
                            onChange={handleChange}
                            helperText={book?.title === "" && "Campo obrigatório"}
                        />

                        <TextField
                            id={"standard-basic"}
                            label={"Autor"}
                            name={"author"}
                            variant={"standard"}
                            className={"text"}
                            value={book?.author}
                            required
                            error={book?.author === ""}
                            onChange={handleChange}
                            helperText={book?.author === "" && "Campo obrigatório"}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => saveBook()}
                        disabled={disableSave}
                        style={{ background: (!disableSave) ? "#f74639" : "rgba(0, 0, 0, 0.12)", marginRight: "10px" }}
                    >Salvar</Button>

                    <Button
                        variant={"contained"}
                        onClick={() => deleteBook()}
                        disabled={disableSave || selectedId === 0}
                    >Apagar</Button>
                </div>
            </Modal>
        </TopMenu>
    );
};

export default BookList;
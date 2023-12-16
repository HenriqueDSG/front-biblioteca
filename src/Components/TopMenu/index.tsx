import React from 'react';
import './index.css';
import history from '../../history';
import Button from '@mui/material/Button';

interface Props {
    title: string;
    children?: React.ReactNode;
}

const TopMenu: React.FC<Props> = (props) => {
    const handleClick = (route: any) => {
        history.push(`${route}`)
    }

    return (
        <div className={"topMenuDiv"}>
            <span className={"topMenuTitle"}>{props.title}</span>

            <div className={"topMenuDiv_inside"}>
                {
                    window.location.pathname !== "/Books" &&
                    <Button variant="contained" className={"topMenuButton"} onClick={() => handleClick("/Books")}>Livros</Button>
                }
                {
                    window.location.pathname !== "/Persons" &&
                    <Button variant="contained" className={"topMenuButton"} onClick={() => handleClick("/Persons")}>Pessoas</Button>
                }
                {
                    window.location.pathname !== "/Registry" &&
                    <Button variant="contained" className={"topMenuButton"} onClick={() => handleClick("/Registry")}>Registros</Button>
                }
                {
                    window.location.pathname !== "/" &&
                    <Button variant="contained" className={"topMenuButton"} onClick={() => handleClick("/")}>Ir para a home</Button>
                }
            </div>

            {props.children}
        </div>
    );
};

export default TopMenu;
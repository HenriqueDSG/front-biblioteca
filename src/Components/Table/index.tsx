import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./index.css";
import moment from 'moment';

interface Props {
    list?: any[];
    labelList?: any[];
    setSelectedId?: Function;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1f2736",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const convertDate = (key: string, value: string) => {
    if (key.toLowerCase().includes("date")) {
        return (value) ? moment(value).format('DD/MM/YYYY') : "";
    }

    return value;
}

const BasicTable: React.FC<Props> = (props) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            props.labelList &&
                            props.labelList.map((item) => (<StyledTableCell>{item.label}</StyledTableCell>))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.list &&
                        props.list.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                className={"table-row"}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (props.setSelectedId) {
                                        props.setSelectedId(row.id)
                                    }
                                }}
                            >
                                {
                                    Object.entries(row).map(([key, value]) => {
                                        if (props.labelList?.find((item) => item.value === key)) {
                                            return <StyledTableCell align="left">{convertDate(key, value as string) }</StyledTableCell>
                                        }
                                    })
                                }

                            </StyledTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;
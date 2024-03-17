import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { apiServices } from '~/api/APIservices';
import FormDialog from './dialog';

export default function MeetingsTable({ tableData }: { tableData: Array<any> }) {
    function createData(companyName: string, companyId: string, location: string, date: string, summary: string) {


        return { companyName, companyId, location, date, summary };
    }
    const initialRows = [
        createData('Frozen yoghurt', 'Frozen yoghurt', "aaa", "bbb", "ccc"),
        createData('Ice cream sandwich', 'Ice cream sandwich', "aaa", "bbb", "ccc"),
        createData('Eclair', 'Eclair', "aaa", "bbb", "ccc"),
        createData('Cupcake', 'Cupcake', "aaa", "bbb", "ccc"),
        createData('Gingerbread', 'Gingerbread', "aaa", "bbb", "asdfasdf"),
    ];

    const [rows, setRows] = React.useState(initialRows)


    const getCompanies = async () => {
        const companies = await apiServices.companies.getAll();
        console.log(companies);

        //setRows(companies)
    }
    React.useEffect(() => {
        const loadCompanies = async () => {
            await getCompanies()
        }
        loadCompanies()
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell align="left">Location</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.companyId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.companyName}
                            </TableCell>
                            <TableCell align="left" >
                                {row.location}
                            </TableCell>
                            <TableCell align="left">
                                {row.date}
                            </TableCell>
                            <TableCell align="left">
                                {row.summary}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

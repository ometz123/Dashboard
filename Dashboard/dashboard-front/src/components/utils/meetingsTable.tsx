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

export default function MeetingsTable({ meetings }: { meetings: Meeting[] }) {

    const [rows, setRows] = React.useState<Meeting[]>(meetings)

    const getCompanies = async () => {
        let meetings = (await apiServices.meetings.getAll())
        console.log(meetings);

        if (meetings.length > 1) {
            meetings = meetings.sort((a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime());
        }
        setRows(meetings)
    }

    React.useEffect(() => {
        getCompanies()
    }, [meetings])

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
                    {rows?.map((row) => (
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
                                {new Date(row.meetingDate).toDateString()}
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

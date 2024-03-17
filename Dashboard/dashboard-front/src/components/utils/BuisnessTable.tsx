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

export default function BasicTable() {
    
    function createData(companyName: string, companyId: string) {

        const editCompany = async (
            {
                newCompanyName,
                companyId
            }: {
                newCompanyName: string,
                companyId: string
            }) => {
            console.log('edit company', newCompanyName, companyId);
            await apiServices.companies.editCompany({ newCompanyName, companyId })
            //getCompanies
        }

        const deleteCompany = async (id: string) => {
            console.log('delete company', companyName);
            await apiServices.companies.deleteCompany(id)
            //getCompanies
        }

        return { companyName, companyId, editCompany, deleteCompany };
    }
    const initialRows = [
        createData('Frozen yoghurt', 'Frozen yoghurt'),
        createData('Ice cream sandwich', 'Ice cream sandwich'),
        createData('Eclair', 'Eclair'),
        createData('Cupcake', 'Cupcake'),
        createData('Gingerbread', 'Gingerbread'),
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
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        {/* <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell> */}
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
                            <TableCell align="right" >
                                <FormDialog companyName={row.companyName} editFunction={row.editCompany} companyId={row.companyId} />
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" onClick={() => row.deleteCompany(row.companyId)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

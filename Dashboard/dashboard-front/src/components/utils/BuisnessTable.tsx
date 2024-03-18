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
import { Company } from '~/interfaces/companies';




export default function BasicTable({ companies }: { companies: Company[] | null }) {
    const createData = ({ companyName, companyId }: Company) => {

        const editCompany = async ({ companyName, companyId }: Company) => {
            await apiServices.companies.editCompany({ companyName, companyId })
            await getCompanies()
        }

        const deleteCompany = async (companyId: string) => {
            await apiServices.companies.deleteCompany(companyId)
            await getCompanies()
        }

        return { companyName, companyId, editCompany, deleteCompany };
    }

    const comps = companies?.map((c: Company) => createData(c));
    const [rows, setRows] = React.useState(comps)

    const getCompanies = async () => {
        const companies = await apiServices.companies.getAll();
        refreshRows(companies)
    }

    const refreshRows = (companies: Company[] | null) => {
        const comps = companies?.map((c: Company) => createData(c));
        setRows(comps)
    }

    React.useEffect(() => {
        const loadCompanies = async () => {
            await getCompanies()
        }
        loadCompanies()
    }, [])

    React.useEffect(() => {
        refreshRows(companies)
    }, [companies])

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
                    {rows?.map((row) => (
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

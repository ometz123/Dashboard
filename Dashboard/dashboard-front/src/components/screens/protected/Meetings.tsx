import { Box, FilledInput, TextField, Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useApi } from '~/api/APIHook';
import { apiServices } from '~/api/APIservices';
import Head from '~/components/shared/Head';
import BasicTable from '~/components/utils/BuisnessTable';
import MeetingsTable from '~/components/utils/meetingsTable';

export default function Meetings() {
  const [tableData, setTableData] = useState([])
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const companyName = formData.get('companyName') as string;
    const location = formData.get('location') as string;
    const date = formData.get('date') as string;
    const summary = formData.get('summary') as string;
    console.log(companyName, location, date, summary);
    //add to list
  }
  const checkCompanyExisted = async (companyName: string) => {
    const companyFromDB = await apiServices.companies.getCompanyByName(companyName);
    return companyFromDB
  }

  return (
    <>
      <Head title="Meetings" />
      <div className="hero flex-grow">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold">Companies</h1>
            <form onSubmit={handleSubmit}>

              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Meeting</span>
                  </label>
                  <input type="text" required name="companyName" placeholder="New Company's Name" className="input input-bordered" />
                  <input type="text" required name="location" placeholder="Location" className="input input-bordered" />
                  <input type="Date" required name="date" placeholder="Date" className="input input-bordered" />
                  <textarea required name="summary" rows={4} placeholder="Summay" className="input input-bordered line-clamp-3" />

                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <MeetingsTable tableData={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}

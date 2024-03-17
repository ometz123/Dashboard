import { Box, FilledInput, TextField, Button } from '@mui/material';
import { FormEvent } from 'react';
import { useApi } from '~/api/APIHook';
import { apiServices } from '~/api/APIservices';
import Head from '~/components/shared/Head';
import BasicTable from '~/components/utils/BuisnessTable';

export default function Buisness() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newCompany = formData.get('newCompany') as string;
    console.log(newCompany);
    await apiServices.companies.postNewCompany(newCompany)
    //add to list
  }
  return (
    <>
      <Head title="Buisness" />
      <div className="hero flex-grow">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold">Companies</h1>
            <form onSubmit={handleSubmit}>

              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Company</span>
                  </label>
                  <input type="text" name="newCompany" placeholder="New Company's Name" className="input input-bordered" />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <BasicTable />
          </div>
        </div>
      </div>
    </>
  );
}

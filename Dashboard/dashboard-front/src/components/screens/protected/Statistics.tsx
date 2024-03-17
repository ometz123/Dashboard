import Head from '~/components/shared/Head';

export default function Statistics() {
  return (
    <>
      <Head title="Statistics" />
      <div className="hero flex-grow">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://api.lorem.space/image/movie?w=260&h=400" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Statistics</h1>
            <p className="pt-6">Graphs showing:</p>
            <p className="py-2">Number of meetings per day.</p>
            <p className="pb-10">Number of meetings for the existing month.</p>
            <p className="pb-10">Percentage of the number of meetings per day.</p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

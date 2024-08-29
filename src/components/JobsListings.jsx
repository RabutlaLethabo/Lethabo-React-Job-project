import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';

const Spinner = ({ loading }) => {
    return <div>Loading...</div>; // You can customize this as needed
};

const JobsListing = ({ isHome }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiURL = isHome ? '/api/jobs?_limit=3' : 'http://localhost:3000/api/jobs';
            try {
                const res = await fetch(apiURL);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.log("Error fetching data: " + error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [isHome]);

    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {jobs.map((job) => (
                            <JobListing key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobsListing;
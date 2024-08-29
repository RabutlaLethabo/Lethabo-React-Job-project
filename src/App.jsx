import React from 'react'
import { 
  Route,
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider 
} from 'react-router-dom';
import Jobspage from './pages/Jobspage';
import Homepage from './pages/Homepage';
import MainLayout from './Layouts/MainLayout';
import NotFoundPage from './pages/NotFoundpage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditPage from './pages/EditPage';

const App = () => {
  //Adding a Job
const addJob = async (newJob) => {
  const res = await fetch('/api/jobs',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(newJob),
  });
  return;
};

//Deleting a job
const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`,{
    method:'DELETE',
  });
  return;
};
//Update A Job
const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`,{
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(job),
  });
  return;
};
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage/>} />
        <Route path='/jobs' element={<Jobspage/>} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={ jobLoader } />
        <Route path='/edit-job/:id' element={<EditPage updateJobSubmit={updateJob}/>} loader={ jobLoader } />
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
    
  )
);

  return <RouterProvider router={router} />;
};

export default App;

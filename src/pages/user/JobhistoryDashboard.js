import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardElement from '../../component/CardElement'
import { userProfileAction } from '../../redux/actions/RecruiterAction'

const UserJobsHistory = () => {
  
    const { jobs } = useSelector((state) => state.job);
    const { profile } = useSelector((state) => state.profiles)
    console.log(profile)
    console.log(jobs)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfileAction());
    }, []);



    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Jobs History</Typography>
                { <Box>
                    {
                        jobs && jobs.map((job, i) => (
                                            <CardElement
                                            key={i}
                                            id={job.id}
                                            jobTitle={job.title}
                                            description={job.job_description}
                                            tag={job.tags}
                                            company={job.company}
                                location={job.location}
                                />
                        ))
                    }
                </Box> 
                }
            </Box>
        </>
    )
}

export default UserJobsHistory
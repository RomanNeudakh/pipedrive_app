import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './form.css';
import API_PATHS from '../constants/apiPath.js';

function JobForm() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false); 
  const [jobCreated, setJobCreated] = useState(false);
  const currentUrl = window.location.href;
  const queryParams = new URLSearchParams(currentUrl.split('?')[1]);
  const queryObject = {};
  queryParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const fullData = {
      ...data,
      queryObject
    };
    try {
      const response = await fetch(API_PATHS.authService, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });
      const result = await response.json();
      console.log(result);
      setJobCreated(true); 
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-message">
          <p>Loading... Please wait.</p> 
        </div>
      ) : jobCreated ? (
        <div className="success-message">
          <p>Job is created successfully!</p> 
        </div>
      ) : (
        <form className="job-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Client Details */}
          <div className="form-section">
            <h3>Client details</h3>
            <div className="input-group">
              <input
                placeholder="First name"
                defaultValue="John"
                {...register('Client first name', { required: true })}
              />
              <input
                placeholder="Last name"
                defaultValue="Doe"
                {...register('Client last name', { required: true })}
              />
            </div>
            <input
              placeholder="Phone"
              type="tel"
              defaultValue="1234567890"
              {...register('Phone', { required: true, pattern: /^[0-9]+$/ })}
            />
            <input
              placeholder="Email (optional)"
              type="email"
              defaultValue="john.doe@example.com"
              {...register('Email')}
            />
          </div>

          {/* Job Details */}
          <div className="form-section">
            <h3>Job details</h3>
            <div className="input-group">
              <select defaultValue="plumbing" {...register('Job type', { required: true })}>
                <option value="">Job type</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
              </select>
              <select defaultValue="referral" {...register('Job Source')}>
                <option value="referral">Referral</option>
                <option value="advertisement">Advertisement</option>
              </select>
            </div>
            <textarea
              placeholder="Job description (optional)"
              defaultValue="This is a test job description."
              {...register('Job description')}
            />
          </div>

          {/* Service Location */}
          <div className="form-section">
            <h3>Service location</h3>
            <input
              placeholder="Address"
              defaultValue="123 Test Street"
              {...register('Address', { required: true })}
            />
            <div className="input-group">
              <input placeholder="City" defaultValue="Testville" {...register('City', { required: true })} />
              <input placeholder="State" defaultValue="TX" {...register('State', { required: true })} />
            </div>
            <div className="input-group">
              <input
                placeholder="Zip code"
                defaultValue="12345"
                {...register('Zip Code', { required: true, pattern: /^[0-9]+$/ })}
              />
              <select defaultValue="urban" {...register('Area')}>
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
              </select>
            </div>
          </div>

          {/* Scheduled */}
          <div className="form-section">
            <h3>Scheduled</h3>
            <input type="date" defaultValue="2023-01-01" {...register('Start Date', { required: true })} />
            <div className="input-group">
              <input type="time" defaultValue="08:00" {...register('Start Time', { required: true })} />
              <input type="time" defaultValue="10:00" {...register('End Time', { required: true })} />
            </div>
            <select defaultValue="test1" {...register('Selected Technician')}>
              <option value="test1">Jhon Don</option>
              <option value="test2">Roger Dowson</option>
            </select>
          </div>

          <div className="button-wrapper">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
}

export default JobForm;

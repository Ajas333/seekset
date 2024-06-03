import React from 'react'
import { FaFilter } from "react-icons/fa";
function Filter(props) {
    
    const experianceValues=["Internship","Entry Leve","Associate","Mid Level","Senior Level"]
    const handleChange = (event) => {
        props.setDateRange(event.target.value);
      };
      const handleSalaryChange = (event) => {
       props.setSalaryRange(event.target.value);
      };
      const handleTypeChange = (event) => {
        props.setJobType(event.target.value);
       };
      const handleExperienceChange = (event) => {
        props.setExperienceType(event.target.value);
      };
    
  return (
    <div>
      <div className='w-1/5 p-3 h-full fixed'>
          <div className='bg-blue-50 p-3'>
              <div className='flex items-center'>
                  <FaFilter  className='text-gray-500'/>
                  <span className='font-bold text-xl ml-3 text-gray-700'>Filter</span>
              </div>
              <div className='mt-2 pb-4'>
                <span className='font-semibold text-gray-700 '>Date Posted</span>
                <div className="flex flex-col ">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="date-range"
                      value="last-24-hours"
                      checked={props.dateRange === 'last-24-hours'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Last 24 Hours</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="date-range"
                      value="last-7-days"
                      checked={props.dateRange === 'last-7-days'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Last 7 Days</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="date-range"
                      value="last-30-days"
                      checked={props.dateRange === 'last-30-days'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Last 30 Days</span>
                  </label>
                </div>
              </div>
              <div>
                <hr className='border-solid border-gray-500 border-b-2'/>
              </div>
              <div className='mt-2 pb-4'>
                  <span className='font-semibold text-gray-700 '>Salary Range from</span>
                  <input
                      id="salary-range"
                      type="range"
                      min="10000"
                      max="200000"
                      step="1000"
                      value={props.salaryRange}
                      onChange={handleSalaryChange}
                      className="w-full h-2 bg-gray-200 rounded-lg  cursor-pointer  focus:outline-none  focus:bg-blue-500 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>10,000</span>
                      <span>200,000</span>
                    </div>
              </div>
              <div>
                <hr className='border-solid border-gray-500 border-b-2'/>
              </div>
              <div className='mt-2 pb-4'>
                <span className='font-semibold text-gray-700 '>Job Type</span>
                <div className="flex flex-col ">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="date-range"
                      value="full time"
                      checked={props.jobType === 'full time'}
                      onChange={handleTypeChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Full time</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="date-range"
                      value="part time"
                      checked={props.jobType === 'part time'}
                      onChange={handleTypeChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Part time</span>
                  </label>
                </div>
              </div>
              <div>
                <hr className='border-solid border-gray-500 border-b-2'/>
              </div>
              <div className='mt-2 pb-4'>
                <span className='font-semibold text-gray-700'>Experience Level</span>
                    <div className="flex flex-col">
                    {experianceValues.map((experience) => (
                        <label key={experience} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="experience"
                            value={experience}
                            checked={props.experienceType === experience}
                            onChange={handleExperienceChange}
                            className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700">{experience}</span>
                        </label>
                    ))}
                    </div>
              </div>
              <div className='flex justify-center'>
              <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    Filter
                  </button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Filter

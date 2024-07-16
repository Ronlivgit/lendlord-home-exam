import React from 'react'
import { camelLetters, removeUser } from '../utils/utils'

const UsersTable = ({tableData , toggleModal}) => {
    console.log("tableData in UsersTable: " , tableData)

    const removeItemFromTable = async (userId) => {
        console.log("userId : " , userId)
        await removeUser(userId)
    }

  return (
    <div className="w-4/5 overflow-x-auto bg-white shadow-md rounded-3xl ml-4">
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-xl font-semibold">Employees</h2>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center" onClick={toggleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add
      </button>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Started</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 font-semibold">
        {tableData?.map((employee, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{camelLetters(employee.firstName)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{camelLetters(employee.lastName)}</td>
            <td className="px-6 py-4 whitespace-nowrap font-normal">{camelLetters(employee.email)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.dateStarted).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{camelLetters(employee.userRole)}</td>
            <td className="px-6 py-4 whitespace-nowrap">£{employee.salary}</td>
            <td className="px-6 py-4 whitespace-nowrap font-normal">{employee.responsibleManager ? <>{camelLetters(employee.responsibleManager.firstName)}</> : <></>}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-indigo-600 hover:text-indigo-900 mr-2 bg-neutral-100 rounded-full relative -left-[65%]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button className="text-red-600 hover:text-red-900 bg-neutral-100 rounded-full relative -left-[65%]" onClick={()=>removeItemFromTable(employee._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default UsersTable
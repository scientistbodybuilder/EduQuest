import React, { useState, useEffect, useMemo } from 'react'
import Header from '../Header'
import Footer from '../Footer';
import { UserAuth } from '../../AuthContext'
import { DataGrid } from '@mui/x-data-grid';
import { getResults } from '../../services/accountServices';

const Account = () => {
    const { session } = UserAuth()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])

    const userId = session.user?.id
    const fullName = session.user?.user_metadata.full_name
    const email = session.user?.email

    const c = useMemo(()=>[
                {
                    field:'id',
                    headerName: 'ID', 
                    flex: 1, 
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,
                    hide: true
                },
                {
                    field:'quiz_name',
                    headerName: 'Quiz', 
                    flex: 1, 
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,
                },
                {
                    field: 'score', 
                    headerName: 'Score', 
                    flex: 1, 
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,

                },
                {
                    field: 'won', 
                    headerName: 'Victory', 
                    filterable: false, 
                    sortable: false,
                    flex: 1, 
                    headerClassName: 'font-semibold text-base',
                    disableClickEventBubbling: true,
                },
                {
                    field: 'date',
                    headerName: 'Date',
                    flex: 1,
                    filterable: false,
                    sortable: false,
                    headerClassName: 'font-semibold text-base', 
                    disableClickEventBubbling: true,
                },
                // {
                //     field: 'status', 
                //     headerName: 'Status', 
                //     flex: 1, 
                //     filterable: true, 
                //     sortable: false,
                //     headerClassName: 'font-semibold text-base', 
                //     disableClickEventBubbling: true, 
                //     renderCell: (params) => {
                //         const getStatusStyle = (status) => {
                //             switch (status) {
                //             case 'Complete': return { backgroundColor: '#e8f5e8', color: '#2e7d2e', border: '1px solid #4caf50' };
                //             case 'Cancelled': return { backgroundColor: '#ffeaea', color: '#c62828', border: '1px solid #f44336' };
                //             case 'Pending': return { backgroundColor: '#fff3e0', color: '#ef6c00', border: '1px solid #ff9800' };
                //             default: return { backgroundColor: '#f5f5f5', color: '#666', border: '1px solid #ccc' };
                //             }
                //         }
                //         return (
                //             <span style={{
                //             ...getStatusStyle(params.value)
                //             }} className="rounded-xl px-2 py-1 text-base">
                //             {params.value}
                //             </span>
                //         );},
                // },
            ])

    const fetchResults = async (id) => {
        setLoading(true)
        const results = await getResults(id)
        if (results) {
            setResults(results)
            setRows(results)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!userId) return
        fetchResults(userId)
    },[userId])

    return(
        <div className='w-full h-full flex flex-col items-center justify-start bg-[#bcc8f1] pb-10'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Welcome {fullName}</h3>
                    <p className='text-gray-600 text-base lg:text-lg'>Manage your account</p>
                </div>


                <div className='w-full h-auto flex flex-col items-center justify-center rounded-lg px-4 pt-2 pb-6 shadow-xl bg-white mt-24'>
                    <div className='w-full mt-4 mb-10'>
                        <h3 className='text-lg md:text-xl lg:text-2xl'><span className='font-medium'>Email:</span> {email}</h3>
                    </div>
                    {loading ? (<img className='h-32 w-32 mt-12' src='/spinner_dark.svg' />) :
                    (
                        <DataGrid rows={rows} columns={c} getRowId={row => row.id} pageSize={10} pageSizeOptions={[10]} className="w-full rounded-sm shadow-sm"
                        sx={{
                            // border: '1px solid #0d5d73'
                        }}/>
                    )}

                </div>


            </div>
            
        </div>
    )
}

const AccountExport = () => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-start overflow-x-hidden'>
            <Header />
            <Account />
            <Footer />
        </div>
    )
}

export default AccountExport
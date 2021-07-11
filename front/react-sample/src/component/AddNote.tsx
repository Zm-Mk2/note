import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'

type Props = {
    changeCurrentNote: Function
}

function AddNote(props: Props) {

    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-with': 'XMLHttpRequest'
        },
        ResponseType: 'json'
    })

    const PostNote = () => {
        const data: string = ""
        
        axios.post('/notes', data)
        .then((resp: AxiosResponse) => {
            props.changeCurrentNote(resp.data)
        })
        .catch((e: AxiosError) => {
            console.log(e)
        })
    }

    return (
        <>
          {PostNote}
        </>
    )
}

export default AddNote

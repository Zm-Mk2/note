import React, { useState, useEffect, useRef } from 'react'
import { Note } from '../Types'
import styled from 'styled-components'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { getNodeText } from '@testing-library/react'
import { Button } from '@material-ui/core'


const Subbutton = styled(Button)`
`

const InitialNote: Note = {
    id: "",
    content: ""
}

function EditNote(props: Note) {
    const [currentNote, setCurrentNote] = useState<Note>(InitialNote)
    const textAreaRef = useRef<HTMLTextAreaElement>(null!)
    const documentClickHandler = useRef<EventListener>(null!)


    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-with': 'XMLHttpRequest'
        },
        ResponseType: 'json'
    })

    const getNote = (id: string) => {
        console.log(`id(getNote):${id}`)
        axios.get(`/notes/${id}`)
        .then((resp: AxiosResponse) => {
            setCurrentNote(resp.data)
        })
        .catch((e: AxiosError) => {
        })
    }

    useEffect(() => {
        documentClickHandler.current = (e: any) => {
            console.log('documentClickHandler')
            if (textAreaRef.current.contains(e.target)) return

            console.log(`e:${e}`)
            removeDocumentClickHandler()
            const test: Note = {
                id: props.id,
                content: props.content + "test"
            }
            console.log('update-start')
            /*updateNote(currentNote)*/
            console.log('update-end')
        }
        console.log('getNote-start')
        getNote(props.id)
        console.log('getNote-end')
    }, [props.id])

    const removeDocumentClickHandler = () => {
        console.log('removeDocumentClickHandler')

        document.removeEventListener('click', documentClickHandler.current)
    }

    const handleTextAreaClick = () => {
        console.log('handleTextAreaClick')
        
        document.addEventListener('click', documentClickHandler.current)
      }

    const updateNote = (data: Note) => {
        axios.patch(`/notes/${data.id}`, data)
        .then((resp: AxiosResponse) => {
            console.log(resp)
            setCurrentNote(resp.data)
        })
        .catch((e: AxiosError) => {
            console.log(`AxiosError(updateNote):${e}`)
        })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        var data: Note = {
            id: props.id,
            content: event.target.value
        }
        setCurrentNote(data)
        console.log('handleInputChange-done')
    }

    return (
        <>
            <form>
                <textarea
                    value={currentNote.content}
                    onChange={handleInputChange}
                    ref={textAreaRef}
                    onClick={handleTextAreaClick}
                />
                {props.content}
            </form>
            <Button variant="contained" onClick={() => updateNote(currentNote)}>
                update
            </Button>
        </>
    )
}

export default EditNote

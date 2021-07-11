import React, { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import styled from 'styled-components'
import { Note } from '../Types'

const Detailtext = styled.textarea`
  position: absolute;
  padding-top: 2%;
  left: 25%;
  height: 95%;
  width: 74%;
  font-family: inherit;
  font-size: inherit;
  border: none;
  resize: none;
  &:focus {
      outline: none;
  }
`
type Props = {
    changeCurrentNote: Function
    changeUpdated: Function
    currentNote: Note
    updated: Boolean
}

const InitialContent: string = "New Note..."

function EditNote(props: Props) {

    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-with': 'XMLHttpRequest'
        },
        ResponseType: 'json'
    })

    const handleTextAreaClick = () => {
        if (props.currentNote.content === InitialContent) {
            var data: Note = {
                id: props.currentNote.id,
                content: ""
            }
            props.changeCurrentNote(data)
        }
        props.changeUpdated()
      }

    const updateNote = (data: Note) => {
        axios.patch(`/notes/${data.id}`, data)
        .then((resp: AxiosResponse) => {
            console.log(resp)
            props.changeCurrentNote(resp.data)
            props.changeUpdated(props.updated)
        })
        .catch((e: AxiosError) => {
            console.log(`AxiosError(updateNote):${e}`)
        })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        var data: Note = {
            id: props.currentNote.id,
            content: event.target.value
        }
        props.changeCurrentNote(data)
    }

    const onBlur = () => {
        if (!props.currentNote.content) {
            var data: Note = {
                id: props.currentNote.id,
                content: InitialContent
            }
            updateNote(data)
        } else {
            updateNote(props.currentNote)
        }
    }

    return (
        <>
            <Detailtext
                value={props.currentNote.content}
                onChange={handleInputChange}
                onClick={handleTextAreaClick}
                onBlur={onBlur}
            />
        </>
    )
}

export default EditNote

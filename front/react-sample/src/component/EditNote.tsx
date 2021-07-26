import React, { useState, useEffect, useRef } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import styled from 'styled-components'
import { Note, Coord, Window } from '../Types'
import { Scrollbars } from 'react-custom-scrollbars'

const Detail = styled.div`
  left: 25%;
`

const Detailtext = styled.textarea<{ taSize: TextareaSize}>`
  position: absolute;
  left: 25%;
  width: ${({ taSize }) => taSize.width - 10}px;
  height: ${({ taSize }) => taSize.height - 50}px;
  padding-top: 50px;
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
    window: Window
}

type TextareaSize = {
    width: number
    height: number
}

const InitialContent: string = "New Note..."

const InitialCoord: Coord = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
}

const InitialTaSize: TextareaSize = {
    width: 0,
    height: 0
}

function EditNote(props: Props) {

    const [detailCoordRect, setDetailCoordRect] = useState(InitialCoord)
    const detailCoordRef = useRef<HTMLTextAreaElement>(null)
    const [taSize, setTaSize] = useState(InitialTaSize)

    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-with': 'XMLHttpRequest'
        },
        ResponseType: 'json'
    })

    useEffect(() => {
        if (detailCoordRef && detailCoordRef.current) {
            const nowCoord: Coord = detailCoordRef.current.getBoundingClientRect()
            setDetailCoordRect(nowCoord)
            var widthData: number = props.window.width - nowCoord.left
            var heightData: number = props.window.height - nowCoord.top
            var data: TextareaSize = {
                width: widthData,
                height: heightData
            }
            setTaSize(data)
            console.log("************描画-EditNote*************")
        }
      },[props.window.width, props.window.height])

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
            <Detailtext taSize={taSize} ref={detailCoordRef}
                value={props.currentNote.content}
                onChange={handleInputChange}
                onClick={handleTextAreaClick}
                onBlur={onBlur}
            />
        </>
    )
}

export default EditNote

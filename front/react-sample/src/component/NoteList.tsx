import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Note } from '../Types'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import { Button } from '@material-ui/core'


const ListRow = styled.nav`
  width:20%;
  border-right: solid;
  border-width: thin;
  border-color: #bec8d1;
`

const Searchrow = styled.div`
  padding: 5px 5px 5px 5px;
`
const Searchborder = styled.div`
  border: thin solid;
  border-radius: 999px;
  border-color: #bec8d1;
  background-color: #f0f2f5;
  display: flex;
  padding: 2px 0 2px 2px;
`

const Sarchicon = styled(SearchOutlinedIcon)`
  font-size: 25px;
`

const Searchform = styled.input`
  border: none;
  width: 90%;
  background-color: #f0f2f5;
  &:focus {
      outline: none;
  }
`

const Row = styled.div`
  border-bottom: thin solid;
  border-color: #bec8d1;
  padding: 5px 15px 0px 15px;
  cursor: pointer;
  position: relative;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const Detailtext = styled.textarea`
  position: absolute;
  left: 25%;
  width: 74%;
  height: 95%;
  font-family: inherit;
  font-size: inherit;
  border: none;
  &:focus {
      outline: none;
  }
`

const InitialNote: Note = {
    id: "",
    content: ""
}

function NoteList() {
    const [notes, setNotes] = useState<Note[]>([])
    const [searchName, setSearchName] = useState<string>('')
    const [currentNote, setCurrentNote] = useState<Note>(InitialNote)

    const [updated, setUpdated] = useState<Boolean>(false)


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
        axios.get('/notes')
        .then((resp: AxiosResponse) => {
            console.log(resp.data)
            setNotes(resp.data)
        })
        .catch((e: AxiosError) => {
            console.log(e)
        })
        console.log("****************描画*******************")
    }, [updated])

    const handleTextAreaClick = () => {
        setUpdated(false)
      }

    const updateNote = (data: Note) => {
        axios.patch(`/notes/${data.id}`, data)
        .then((resp: AxiosResponse) => {
            console.log(resp)
            setCurrentNote(resp.data)
            setUpdated(true)
        })
        .catch((e: AxiosError) => {
            console.log(`AxiosError(updateNote):${e}`)
        })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        var data: Note = {
            id: currentNote.id,
            content: event.target.value
        }
        setCurrentNote(data)
    }

    const onBlur = () => {
        updateNote(currentNote)
    }

    return (
        <>
            <ListRow>
            <Searchrow>
                <Searchborder>
                <Sarchicon />
                <Searchform
                    type="text"
                    placeholder="Search all notes..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchName(event.target.value)
                    }}
                />
                </Searchborder>
            </Searchrow>
            </ListRow>
            <Detailtext
                value={currentNote.content}
                onChange={handleInputChange}
                onClick={handleTextAreaClick}
                onBlur={onBlur}
            />
            <ListRow>
            <div>
                {notes.filter((val: Note) => {
                    if(searchName === "") {
                        return val
                    } else if (val.content.toLowerCase().includes(searchName.toLowerCase())) {
                        return val
                    }
                }).map((val: Note, key: number) => {
                    return (
                        <Row key={key} onClick={() => {setCurrentNote(val)}}>
                            {val.content}
                        </Row>
                    )
                })}
            </div>
            </ListRow>
        </>
    )
}

export default NoteList

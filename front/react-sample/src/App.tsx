import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { BiAddToQueue, BiInfoCircle } from 'react-icons/bi'
import { HiViewList } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import NoteList from './component/NoteList'
import EditNote from './component/EditNote'
import AddNote from './component/AddNote'
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined'
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { Note } from './Types'
import axios, { AxiosError, AxiosResponse } from 'axios'

const Nabvar = styled.nav`
  background: #ffffff;
  min-height: 5vh;
  display: flex;
  border: solid;
  border-width: thin;
  border-color: #bec8d1;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
`
const Listvar = styled.nav`
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Detailvar = styled.nav`
  width: 80%;
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 5vh;
  border-left: solid;
  border-width: thin;
  border-color: #bec8d1;
`

const Itembutton = styled.button`
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 25px;
  font-color: #bec8d1;
  padding: 5px;
`

const InitialNote: Note = {
  id: "",
  content: ""
}

const InitialContent: string = "New Note..."

function App() {

  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>(InitialNote)
  const [updated, setUpdated] = useState<Boolean>(false)

  useEffect(() => {
    console.log("********App-描画*******************")
  }, [updated])


  const changeNotes = (notes: Note[]) => {
    setNotes(notes)
  }

  const changeCurrentNote = (note: Note) => {
   setCurrentNote(note)
  }

  const changeUpdated = (isUpdated: boolean) => {
    setUpdated(!isUpdated)
  }

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
    var data = {
      content: InitialContent
    }
        
    axios.post('/notes', data)
    .then((resp: AxiosResponse) => {
        changeCurrentNote(resp.data)
        const newNotes: Note[] = [...notes]
        newNotes.unshift(resp.data)
        changeNotes(newNotes)
        setUpdated(updated)
    })
    .catch((e: AxiosError) => {
        console.log(e)
    })
  }

  const DeleteNote = (id: string) => {
    if (currentNote.id) {
      axios.delete(`/notes/${id}`)
      .then((resp: AxiosResponse) => {
        const targetIndex: number = notes.findIndex(note => {
          return note.id === resp.data.id
        })
        const newNotes: Note[] = [...notes]
        newNotes.splice(targetIndex, 1)
        setNotes(newNotes)
        setUpdated(updated)
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
    }
  }

  return (
    <>
      <Nabvar>
        <Listvar>
          <Itembutton>
            <ReorderOutlinedIcon />
          </Itembutton>
          Notes
          <Itembutton>
            <PostAddOutlinedIcon onClick={() => {PostNote()}} />
          </Itembutton>
        </Listvar>
        <Detailvar>
          <Itembutton>
            <InfoOutlinedIcon />
          </Itembutton>
          <Itembutton >
            <DeleteOutlineIcon onClick={() => {DeleteNote(currentNote.id)}}/>
          </Itembutton>
        </Detailvar>
      </Nabvar>
      <EditNote
        changeCurrentNote={changeCurrentNote}
        changeUpdated={changeUpdated}
        currentNote={currentNote}
        updated={updated}
      />
      <NoteList
        changeNotes={changeNotes}
        notes={notes}
        changeCurrentNote={changeCurrentNote}
        currentNote={currentNote}
        updated={updated}
      />
    </>
  )
}

export default App

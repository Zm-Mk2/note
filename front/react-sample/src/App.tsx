import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { BiAddToQueue, BiInfoCircle } from 'react-icons/bi'
import { HiViewList } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import NoteList from './component/NoteList'
import AddNote from './component/AddNote'
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined'
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const Nabvar = styled.nav`
  background: #ffffff;
  min-height: 5vh;
  display: flex;
  border: solid;
  border-width: thin;
  border-color: #bec8d1;
  justify-content: space-around;
  align-items: center;
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


const Deleteclick = () => {
  console.log('delete')
}

function App() {
  return (
    <>
      <Nabvar>
        <Listvar>
          <Itembutton>
            <ReorderOutlinedIcon />
          </Itembutton>
          Notes
          <Itembutton>
            <PostAddOutlinedIcon onClick={AddNote} />
          </Itembutton>
        </Listvar>
        <Detailvar>
          <Itembutton>
            <InfoOutlinedIcon />
          </Itembutton>
          <Itembutton onClick={Deleteclick} >
            <DeleteOutlineIcon />
          </Itembutton>
        </Detailvar>
      </Nabvar>
      <NoteList />
    </>
  )
}

export default App

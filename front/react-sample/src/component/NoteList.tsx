import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Note, Coord, Window } from '../Types'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import { Button } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'
import { useWindowSize } from 'react-use'
import { number } from 'yargs'


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
  width: 80%;
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

type Props = {
    changeNotes: Function
    notes: Note[]
    changeCurrentNote: Function
    currentNote: Note
    updated: Boolean
    window: Window
}

const InitialCoord: Coord = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
}

function NoteList(props: Props) {
    
    const [searchName, setSearchName] = useState<string>('')
    const [listCoordRect, setListCoordRect] = useState(InitialCoord)
    const listCoordRef = useRef<HTMLDivElement>(null)

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
            props.changeNotes(resp.data)
        })
        .catch((e: AxiosError) => {
            console.log(e)
        })
        console.log("****************描画*******************")
    }, [props.updated])

    useEffect(() => {
        if (listCoordRef && listCoordRef.current) {
            const nowCoord: Coord = listCoordRef.current.getBoundingClientRect()
            setListCoordRect(nowCoord)
        }
        console.log("****************描画2******************")
    },[props.window.width, props.window.height])

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
                <div ref={listCoordRef}>
                    {//left: {listCoordRect.left}, top: {listCoordRect.top}, right: {listCoordRect.right}, bottom: {listCoordRect.bottom}
                    }
                    <Scrollbars autoHide autoHeight autoHeightMin={200} autoHeightMax={props.window.height - listCoordRect.top}>
                        {props.notes.filter((val: Note) => {
                            if(searchName === "") {
                                return val
                            } else if (val.content.toLowerCase().includes(searchName.toLowerCase())) {
                                return val
                            }
                        }).map((val: Note, key: number) => {
                            return (
                                <Row key={key} onClick={() => {props.changeCurrentNote(val)}}>
                                    {val.content}
                                </Row>
                            )
                        })}
                    </Scrollbars>
                </div>
            </ListRow>
        </>
    )
}

export default NoteList

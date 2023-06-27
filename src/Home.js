import React from 'react'
import Dialog from './Dialog'
import './Home.css'
import { Alert } from '@mui/material'
import logo from './logo.png'

export default function Home() {
  return (
    <div className='Home'>
      <img alt='logo' src={logo}/>
      <Dialog />
      <p>This application uses a <strong>fine-tuned GPT-3</strong>  model trained on a dataset of <strong>over 1000 films</strong> of all genres and years, enabling it to predict probable spoilers for a given film.</p>
      <p>Developped by <strong>Jacob Elbaz</strong> and <strong>Elie Bracha</strong></p>
    </div>
  )
}

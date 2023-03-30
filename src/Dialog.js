import React from 'react'
import Button from '@mui/material/Button';
import { CircularProgress, TextField } from '@mui/material';
import './Dialog.css'
import { Configuration, OpenAIApi } from 'openai';

export default function Dialog() {
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    const [output, setOutput] = React.useState('')
    const [prompt, setPrompt] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const handlePrompt = (e) => {
        setPrompt(e.target.value)
    }
    const handleSend = async () => {
        setLoading(true)
        try{
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature:  0.5,
                max_tokens: 100,
            })
            setOutput(response.data.choices[0].text)
        } catch(err) {
            console.log(err)
            setOutput('Error')
        }
        setLoading(false);
    }
    return (
        <div className='Dialog'>
            <div className='dialog-input'>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    rows={12}
                    sx={{
                        "& .MuiInputBase-root": {
                            color: 'white'
                        }
                    }}
                    placeholder={'Enter a synopsis...'}
                    multiline
                    onChange={handlePrompt} />
            </div>
            <div className='dialog-output'>
                {loading ? <CircularProgress /> : output}
            </div>
            <div className='dialog-button'>
                <Button variant="contained" onClick={handleSend}>Spoil me</Button>
            </div>
        </div>
    )
}

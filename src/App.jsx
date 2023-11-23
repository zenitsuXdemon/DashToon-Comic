import React, { useEffect, useRef, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Header from './components/Header';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';

import { Button as Lutton } from "rsuite"; 
// Default CSS 
import "rsuite/dist/rsuite.min.css";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const App = () => {
  
  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: { 
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  

    async function callReq(){
      if(text==""){
        alert('Please write some Description');
        return;
      }
      console.log('request started');
      setLoading(true);
      
      for(let i=0;i<10;i++){
        const imageBlob = await query({ "inputs": text });
        const url = URL.createObjectURL(imageBlob);
        setImages(prev=>[url,...prev]);
      }
      setLoading(false);
    }

    const deleteItem = (id) => { 
      const list = [...images]; 

      // Filter values and leave value which we need to delete 
      const updateList = list.filter((item) => item !== id); 

      // Update list in state 
      setImages(updateList); 
     } 

  const [text,setText] = useState("");
  const [images,setImages] = useState([]);

  const dummy_images = ["/img/image1.png","/img/image2.png","/img/image3.jpeg"]
  
  const [loading,setLoading] = useState(false);
  const ButtonStyle = { margin: "0px 50px" }; 

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const handleListing = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    
    const str = transcript;
    console.log(str);
    setText(str);

    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

return (

  <div>
    <Header/>

      <div style={{
        'display':'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:"25px",
        gap:"8px"
      }}>
      
      <Card  sx={{minWidth: "40%",height:"50%",padding:3}} style={{display:"flex",flexDirection:"column"}}>
        <TextareaAutosize style={{padding:'5px',fontWeight:"400",fontSize:'22px'}} id="outlined-basic" label="Enter Text" variant="outlined"  minRows={8} placeholder='Imagination to Image'  onChange={(e) => {setText(e.target.value);}} value={text}/>
        
        <div style={{marginTop:"18px",display:"flex",justifyContent:'center',gap:'10px'}}>
          {
            loading ? <LoadingButton loading variant="outlined">Submit </LoadingButton> :
            <Button variant="outlined" onClick={callReq}>Get Image</Button>
          }
          <Button variant="outlined" size='large' onClick={()=>{setText("")}}>Reset Text</Button>
          
          {
            !isListening ? <Button><MicOffIcon onClick={()=>{handleListing()}}/></Button>
            : <Button><MicIcon onClick={()=>{stopHandle();handleReset();}}/></Button>
          }
          <div>

          </div>
          
        </div>
      </Card>
      

      </div>
      
      {images ?<Box sx={{display:'flex',flexWrap:'wrap',justifyContent:"center",gap:2}}>
        
        {images.map((res)=>{
        return (<Card sx={{minWidth:'275'}} variant='outlined'>
            <a href={res} download> <DownloadIcon style={{position:'absolute',backgroundColor:'white',margin:'2px',color:'black'}}/> </a>
            <div onClick={()=>deleteItem(res)}> <ClearIcon style={{position:'absolute',backgroundColor:'white',marginLeft:'30px',marginTop:'2px',color:'black'}}/> </div>
            <img src={res} alt="" style={{height:"250px",backgroundSize:'cover'}} download={res}/>
        </Card>);
        })
        } 
      
      </Box>
      : <div>Enter Description to display Images</div>      
    }
    <br />
    {images ?<Box sx={{display:'flex',flexWrap:'wrap',justifyContent:"center",gap:2}}>
        
        {dummy_images.map((res)=>{
        return (<Card sx={{minWidth:'275'}} variant='outlined'>
            <a href={res} download> <DownloadIcon style={{position:'absolute',backgroundColor:'white',margin:'2px',color:'black'}}/> </a>
            <div onClick={()=>deleteItem(res)}> <ClearIcon style={{position:'absolute',backgroundColor:'white',marginLeft:'30px',marginTop:'2px',color:'black'}}/> </div>
            <img src={res} alt="" style={{height:"250px",backgroundSize:'cover'}} download={res}/>
        </Card>);
        })
        } 
      
      </Box>
      : <div>Enter Description to display Images</div>      
    }
  </div>
  )
}

export default App
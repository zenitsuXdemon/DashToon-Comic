import React from 'react'

const Header = () => {
  return (
    <div style={
      {
        width:"100vw",
        backgroundColor:'black',
        color:"white",
        height:'70px',
        display:'flex',
        alignItems:'center',
        paddingLeft:'25px',
        marginBottom:"20px",
        position:'sticky',
        top:'0',
        zIndex:'3'
      }
    }>
        <h1>COMIC UI</h1>
    </div>
  )
}

export default Header
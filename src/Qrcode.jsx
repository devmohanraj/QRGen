import { useState } from 'react'

const Qrcode = () => {
  const [img, setImg]=useState("");
  const [loading, setLoading]=useState(false);
  const [qrData, setQrData]=useState("https://www.google.com/");
  const [qrSize, setQrSize]=useState("150");

  async function generateQR() {
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }catch(error){
      console.error("Error generating QR code", error);
    }
    finally{setLoading(false)};
  }
  
  function downloadQR() {
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
      console.error("Error downloading QR code", error);
    });
  }

  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className='qrcode-image'></img>}

      <div>
        <label htmlFor='dataInput' className='input-label'>
          Data for QR Code:
        </label>
        <input type='text' value={qrData} id="dataInput" placeholder='Enter data for QR Code' 
        onChange={(e)=>setQrData(e.target.value)}/>

        <label htmlFor='sizeInput' className='input-label'>
          Image Size (e.g., 150):
        </label>
        <input type='text' value={qrSize} id="sizeInput" placeholder='Enter image size'
        onChange={(e)=>setQrSize(e.target.value)} />
        <div className='button-group'>
        <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className='download-button' onClick={downloadQR}>Download QR Code</button>
        </div>
      </div>
    </div>
  )
}

export default Qrcode

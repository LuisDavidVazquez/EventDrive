import './App.css'
import axios from 'axios'
import { useEffect } from 'react';
import { Socket, io } from "socket.io-client";

function App() {
  let socket: Socket;
  const host = import.meta.env.VITE_HOST_URL;
  const hostSocket = import.meta.env.VITE_HOST_SOCKET;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const data = {
        name: formData.get("name"),
        amount: formData.get("amount"),
        concept: formData.get("concept"),
      };
      const res = await axios.post(`${host}/payments`, data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!socket) {
      socket = io(hostSocket);
      socket.on("payment-processed", (payment) => {
        console.log(payment);
        alert("Payment succefully")
      });
    }
  }, []);

  return (
    <>
      <div className='main'>
        <h1>Pago</h1><br />
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="nombre">
            <p>Nombre:</p>
            <input id='nombre' type="text" name='name' />
          </label><br /><br />
          <label htmlFor="monto" >
            <p>Monto:</p>
            <input id='monto' type="number" name='amount' />
          </label><br /><br />
          <label htmlFor="concepto">
            <p>Concepto:</p>
            <input id='concepto' type="text" name='concept' />
          </label><br /><br />
          <button>PAGAR</button>
        </form>
      </div>

    </>
  )
}

export default App

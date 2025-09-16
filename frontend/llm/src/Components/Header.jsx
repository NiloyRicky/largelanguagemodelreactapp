import React, { useState } from 'react'
import "./index.css"
import Modal from './Modal'
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [stacks, setStacks] = useState([])

const navigate=useNavigate()
 const handleCreate = (data) => {
    //console.log("Created Stack:", data);
    const newStack={
      id:Date.now(),
      ...data
    }
    console.log(newStack)
    setStacks((prev)=>[...prev,newStack])
    setIsModalOpen(false);
  }






  return (
    <div className='header'>
<div className='header-content'>
    
<h2>My Stack</h2>
<button onClick={()=>setIsModalOpen(true)}>+New Stack</button>
</div>






   {/* Display all created stacks */}
      <div className="stack-list" style={{ marginTop: "10px" }}>
        {stacks.length === 0 ? (
          <div className="new-stack-box">
<h2>Create New Stack</h2>
<p>Start buioding uout own gen AI apps with our essebtial tools and frameworks</p>
<button onClick={()=>setIsModalOpen(true)}>+New Stack</button>

</div>
        ) : (
          stacks.map((stack, index) => (
            <div
              key={index}
              className='stack-list-box'
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0" }}>{stack.name}</h3>
              <p style={{ margin: 0 }}>{stack.description}</p>
              <button onClick={() => navigate(`/stack/${index}`)}>Edit</button>
            </div>
          ))
        )}
      </div>


<Modal
isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
/>
    </div>
  )
}

export default Header
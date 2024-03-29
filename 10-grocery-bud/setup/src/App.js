import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  // for the form?
  const [name,setName] = useState('')
  //a list for local storage
  const [list,setList] = useState(getLocalStorage())
  //flag to indicate whether editing is being done
  const [isEditing,setIsEditing] = useState(false)
  //to reflect which item is being edited
  const [editID,setEditID] = useState(null)
  //
  const [alert,setAlert] = useState({show:false, msg:'', type:''})
  const handleSubmit = (e) => {
    e.preventDefault()
    //if the name value is empty
    if (!name) {
      showAlert(true,'danger','please enter value')
    //if the name value is not empty and editing is being done
    } else if (name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item,title:name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','value changed')
    //if name value is not empty and editing is not being done
    } else {
      showAlert(true,'success','item added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name} //typical way of generating id
      setList([...list, newItem])
      setName('')
    }
  
  }

  const showAlert = (show=false,type='',msg='') => {
    setAlert({show:show,type,msg})
  }
  const clearList = () => {
    showAlert(true,'danger','empty list')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true,'danger','item removed')
    setList(list.filter((item)=> item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type='text' className='grocery' placeholder='eg. eggs' value={name} onChange={(e) => setName(e.target.value)}/>
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit':'submit'}
            </button>
        </div>
      </form>
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>clear items</button>
      </div>
    </section>
  )
}
  

export default App

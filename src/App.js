import {React,  useState} from 'react';
import { Field } from './components/Field/index';
import { Formik, Form } from 'formik';
import api from './services/api';

export const App = () => {
  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [editPeople, setEditPeople] = useState();

  const deletar = async (pessoa) => {
      await api.delete(`/pessoas/${pessoa.id}`)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleEdit = (index) => {
   const array = list[index]
   setEditPeople({value:array, index})
  

   const newList = [...list]
   newList[editPeople.index] = editPeople.value
   setEditPeople(null)
   setList(newList)
    

  }

  return (
    <div>
      <Formik
       initialValues={{
         email: '',
         firstName: '',
         lastName: '',
       }}
       onSubmit={(values) => {
        api.post('/pessoas', values).then((response)=>(
          setList(response)
        ))
       }}
     >
       {() => (
         <Form>
           <Field name="firstName" type="text" label="First Name" />
           <Field name="lastName" type="text" label="Last Name" />
           <Field name="email" type="text" label="Email" />
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
     <div>
       {list.map((pessoa, index)=>{
         return(
           <div>
            <h1>{pessoa.firstName}</h1>
            <h1>{pessoa.lastName}</h1>
            <h1>{pessoa.email}</h1>
            <h1>{pessoa.id}</h1>
            <button onClick={() => deletar(pessoa)}>Delete</button>
            <button onClick={()=> setIsEdit(true)}>Edit</button>
            {isEdit ? (<div> <input onChange={handleChange} value={inputValue}/> <button onClick={() => handleEdit(index)}>Salvar</button> </div>):'' }
           </div>
         )
       })}
      
     </div>
      
    </div>
  );
}



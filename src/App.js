import { Field } from './components/Field/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from './services/api';

export const App = () => {

   function onSubmit(values, actions) {
     api.post('/pessoas', values)
         .then((response) => {
            console.log("chegou aqui!")
         })
 }

  const schema = Yup.object().shape({
    nome: Yup.string().required(),
    sobrenome: Yup.string().required(),
    endereco: Yup.string().required(),
    complemento: Yup.string().required(),
    telefone: Yup.string().required(),
})
  return (
    <div>
      

      <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
          nome: '',
          sobrenome: '',
          endereco: '',
          no: '',
          complemento: ''
          
        }}
        render={({ values, isValid, setFieldValue, handleSubmit }) => (

          <form onSubmit={handleSubmit}>
            
            <Field name="nome" type="text" label="Nome"/>
            <Field name="sobrenome" type= "text" label="Sobrenome"/>
            <Field name="endereco" label="Endereço" type="text" />
            <Field name="no" label="Número" type="text" />
            <Field name="complemento" label="Complemento" type="text" />


            <div>


              <button>Voltar</button>

              <button type="submit">Enviar</button>
            </div>
          </form>
        )}
      />

    </div>
  );
}



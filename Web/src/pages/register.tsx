import React from 'react'
import { Form, Formik } from  'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button, propNames } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUT = `mutation Register($username: String!, $password:String!) {
    register(options: {
      username: $username, password: $password
    }) 
        {
          errors {
            field
            message
            }
        user {
          id
          username
        }
    }
  }`
  

export const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useMutation(REGISTER_MUT);
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: ""}}
                onSubmit={(values) => {
                    console.log(values);
                    return register(values);
                }}
            >
                {(props) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Box>
                            <Button 
                                mt={4} 
                                type='submit' 
                                isLoading={props.isSubmitting}
                                colorScheme="teal"
                            >
                                register
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;
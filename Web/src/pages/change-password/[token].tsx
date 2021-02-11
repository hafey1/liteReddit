import React, { useState } from 'react';
import { NextPage } from "next";
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';


export const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [,changePassword] = useChangePasswordMutation();  
    const [tokenError, setTokenError] = useState('');  
    return (
            <Wrapper variant="small">
            <Formik 
                initialValues={{ newPassword: '' }}
                onSubmit={ async (values, {setErrors}) => 
                    {
                        const response = await changePassword({
                            newPassword: values. newPassword, 
                            token
                        });
                       if(response.data?.changePassword.errors){
                        const errorMap = toErrorMap(response.data.changePassword.errors);
                        if ('token' in errorMap){
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);
                       } else if (response.data?.changePassword.user){
                           router.push("/")
                       }
                    }
                }
            >
                {(props) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError ? <Box color="red">{tokenError}</Box>: null}
                        <Box>
                            <Button 
                                mt={4} 
                                type='submit' 
                                isLoading={props.isSubmitting}
                                colorScheme="teal"
                            >
                                change password
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);
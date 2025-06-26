import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router';

import * as AuthenticationService from 'services/authentication';

export const SignUp = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	// Handle sign up
	const handleSignUp = () => {
		AuthenticationService.signUp(email, password)
			.then(() => {
				console.log('Signed in');
			})
			.catch((error) => {
				console.error('Not signed in', error);
			});
	};

	const boxStyle = {
		px: 2,
		position: 'absolute',
		top: '50%',
		left: 0,
		width: '100%',
		transform: 'translateY(-50%)'
	};

	return (
		<Box sx={boxStyle}>
			<Stack spacing={3}>
				<TextField
					id="username"
					label="Nom d'utilisateur"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<TextField
					id="username"
					label="Mot de passe"
					value={password}
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<Button variant="contained" onClick={handleSignUp}>
					S&apos;inscrire
				</Button>

				<Typography
					component={Link}
					to="/"
					variant="caption"
					sx={{ textAlign: 'center' }}
				>
					Se connecter
				</Typography>
			</Stack>
		</Box>
	);
};

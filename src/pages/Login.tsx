import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
	IconEye,
	IconEyeOff,
	IconLock,
	IconUserCircle
} from '@tabler/icons-react';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
	Typography
} from '@mui/material';

import * as AuthenticationService from 'services/authentication';
import { useAlert } from 'hooks';
import { AlertMessage } from 'components';

export const Login = () => {
	const navigate = useNavigate();
	const { setAlert } = useAlert();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseUpDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleLogin = () => {
		AuthenticationService.login(email, password)
			.then(() => {
				navigate(0);
			})
			.catch((error) => {
				setAlert({ open: true, type: 'error', code: error.code });
				console.error(error.code);
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
				<AlertMessage />
				<TextField
					id="username"
					label="Nom d'utilisateur"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<IconUserCircle />
								</InputAdornment>
							)
						}
					}}
				/>
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="password">Mot de passe</InputLabel>
					<OutlinedInput
						id="password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						startAdornment={
							<InputAdornment position="start">
								<IconLock />
							</InputAdornment>
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseUpDownPassword}
									onMouseUp={handleMouseUpDownPassword}
									edge="end"
								>
									{showPassword ? <IconEyeOff /> : <IconEye />}
								</IconButton>
							</InputAdornment>
						}
						label="Mot de passe"
					/>
				</FormControl>
				<Button variant="contained" onClick={handleLogin}>
					Connexion
				</Button>

				<Typography
					component={Link}
					to="signup"
					variant="caption"
					sx={{ textAlign: 'center' }}
				>
					S&apos;inscrire
				</Typography>
			</Stack>
		</Box>
	);
};

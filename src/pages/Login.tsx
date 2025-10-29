import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	Input,
	Stack,
	TextField,
	useTheme
} from '@mui/material';

import * as AuthenticationService from 'services/authentication';
import { useAlert } from 'hooks';
import { AlertMessage, Logo } from 'components';

export const Login = () => {
	const navigate = useNavigate();
	const theme = useTheme();
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

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly'
			}}
		>
			<Logo size={128} color={theme.palette.primary.main} />
			<Stack spacing={2}>
				<AlertMessage />
				<TextField
					id="username"
					label="Email"
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					variant="standard"
				/>
				<FormControl fullWidth variant="standard">
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
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
					/>
				</FormControl>
				<Button variant="contained" onClick={handleLogin}>
					Log in
				</Button>

				<Button
					component={Link}
					to="signup"
					variant="outlined"
					onClick={handleLogin}
				>
					Sign in
				</Button>
			</Stack>
		</Box>
	);
};

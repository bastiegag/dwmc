import { useRouteError, useNavigate } from 'react-router';
import { Box, styled, Typography } from '@mui/material';
import { IconChevronLeft } from '@tabler/icons-react';

import 'assets/scss/_document.scss';

export const Error = () => {
	const navigate = useNavigate();
	const error = useRouteError();

	const Page = styled(Box)({
		backgroundColor: '#fbfbfb',
		minHeight: '100vh',
		paddingBottom: '144px'
	});

	console.error(error);

	return (
		<main>
			<Box>
				<Page>
					<Typography
						onClick={() => {
							navigate(-1);
						}}
						sx={{ display: 'inline-flex', alignItems: 'center' }}
					>
						<IconChevronLeft size={16} />
						Retour
					</Typography>
				</Page>
			</Box>
		</main>
	);
};

import { useRouteError, useNavigate } from 'react-router';
import { Box, styled, Typography } from '@mui/material';
import { IconChevronLeft } from '@tabler/icons-react';

import 'assets/scss/_document.scss';

const Page = styled(Box)({
	backgroundColor: '#fbfbfb',
	minHeight: '100vh',
	paddingBottom: '144px'
});

const Error = () => {
	const navigate = useNavigate();
	const error = useRouteError();

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
						Back
					</Typography>
				</Page>
			</Box>
		</main>
	);
};

export default Error;

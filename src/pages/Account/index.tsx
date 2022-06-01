import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useWallet from 'hooks/useWallet';
import useTooltip from 'hooks/useTooltip';
import React, {ChangeEvent, useRef, useState} from 'react';
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip';

const AccountWrapper = styled.div`
	width: 40%;
	margin: 0 auto;
	h1 {
		font-size: 35px;
		font-weight: bold;
		margin-top: 20px;
	}
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;

	label {
		font-weight: bold;
		font-size: 16px;
	}
`;
const SubmitBtn = styled.button`
	background-color: ${({theme}) => theme.colors.pink};
	width: 80px;
	height: 50px;
	border-radius: 15px;
	color: white;
	font-weight: bold;
	font-size: 18px;
`;
const Input = styled.input`
	width: 100%;
	height: 45px;
	margin: 15px 0;
	padding: 5px;
	border: 1px solid ${({theme}) => theme.colors.dark_grey};
	border-radius: 5px;
	outline: none;
`;
const InputDiv = styled.div`
	position: relative;

	button {
		position: absolute;
		top: 23px;
		right: 10px;
		background-color: transparent;
	}
`;
const StyledAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		filter: brightness(50%);
	}
`;
const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} classes={{popper: className}} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		width: 80,
		height: 30,
		fontSize: 15,
		textAlign: 'center',
		backgroundColor: '#c7498c',
	},
});

function Account() {
	const {copyText, account} = useWallet();
	const {handleOpen, tooltipOpen} = useTooltip();
	const [img, setImg] = useState<File | string | ArrayBuffer | null>(
		'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	);
	const fileInput = useRef<HTMLInputElement>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const file = (target.files as FileList)[0];
		if (file) {
			setImg(file);
		} else {
			// 업로드 취소 시
			setImg(
				'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
			);
		}
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImg(reader.result);
			}
		};
		reader.readAsDataURL(file);
	};
	return (
		<AccountWrapper>
			<h1>Profile Settings</h1>
			<StyledForm>
				<label htmlFor='image'>Profile Image</label>
				<Stack direction='row' spacing={2}>
					<StyledAvatar
						alt='avatar'
						src={img}
						onClick={() => fileInput?.current?.click()}
						sx={{width: 100, height: 100}}
					/>
					<input
						style={{display: 'none'}}
						type='file'
						accept='image/jpg, image/png, image/jpeg'
						name='profile_img'
						onChange={(e) => onChange(e)}
						ref={fileInput}
					/>
				</Stack>
				<label htmlFor='username'>Username</label>
				<Input placeholder='Enter username' type='text' />
				<label htmlFor='username'>Email Address</label>
				<Input placeholder='Enter email' type='email' />
				<label htmlFor='username'>Wallet Address</label>
				<InputDiv>
					<Input value={String(account)} disabled type='text' />
					<CustomTooltip
						title='copied!'
						disableHoverListener
						open={tooltipOpen}
						onOpen={handleOpen}
					>
						<button type='button'>
							<ContentCopyIcon onClick={copyText} />
						</button>
					</CustomTooltip>
				</InputDiv>
				<SubmitBtn type='submit'>save</SubmitBtn>
			</StyledForm>
		</AccountWrapper>
	);
}

export default Account;

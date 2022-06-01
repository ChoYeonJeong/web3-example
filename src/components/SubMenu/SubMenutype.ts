interface IMenu {
	title: string;
	path?: string;
	component: any;
}

export interface SubMenuProps {
	handleClose: () => void;
	anchorEl: HTMLElement | null;
	open: boolean;
	MENU_LIST: IMenu[];
}

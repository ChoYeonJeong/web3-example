export interface IItem {
	title: string;
	uriPath: string;
	tokenPrice: {_hex: string; _isBigNumber: boolean};
}

export interface CardItemProps {
	item: IItem;
}

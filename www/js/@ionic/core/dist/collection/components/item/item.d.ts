export declare class Item {
    private ids;
    private id;
    private inputs;
    private itemStyles;
    private label;
    private el;
    mode: string;
    color: string;
    href: string;
    itemStyle(ev: UIEvent): boolean;
    getLabelText(): string;
    ionViewWillLoad(): void;
    ionViewDidLoad(): void;
    /**
     * @hidden
     */
    registerInput(type: string): string;
    render(): JSX.Element;
}
